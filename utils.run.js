const utilsRun = {
  /**
   * find closest energy-source and harvest or move towards it
   * @param {Creep} creep
   * @param {Object} moveOptions
   */
  goHarvestEnergy: (creep, moveOptions = {}) => {
    heritageEnergy = creep.room.find(
      FIND_TOMBSTONES,
      {filter: (tomb) => tomb.store.getUsedCapacity('energy') > 0}
    );
    if (heritageEnergy.length > 0) {
      const closest = creep.pos.findClosestByPath(heritageEnergy);
      if(creep.withdraw(closest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(closest, moveOptions);
      }
    } else {
      const target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
      if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target, moveOptions);
      }
    }
  },

  /**
   * move to or when in range upgrade controller
   * @param {Creep} creep
   * @param {Object} moveOptions
   */
  goUpgradeController: (creep, moveOptions = {}) => {
    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, moveOptions);
    }
  },

  /**
   * find closest construction site
   * no construction site found - return false
   * construction site found - build or move towards it
   * @param {Creep} creep
   * @param {Object} moveOptions
   * @returns {Boolean}
   */
  goBuild: (creep, moveOptions = {}) => {
    const target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    if(target) {
      if (creep.build(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, moveOptions);
      }
      return true;
    }
    // no construction sites to build
    return false;
  },

  /**
   * find closest damaged wall or constructed-wall
   * if none found: return false
   * repair wall or move closer when out of range
   * all walls should have at least 300 hit points before remaining damaged is repaired!
   * @param {Creep | Structure} element
   * @param {Object} moveOptions
   * @returns {Boolean}
   */
  repairWalls: (element, movable = false, moveOptions = {}) => {
    let closestDamagedWall = element.pos.findClosestByRange(
      FIND_STRUCTURES,
      {filter: (structure) =>
        (structure.structureType == 'constructedWall' ||
        structure.structureType == 'wall') &&
        structure.hits < 300
      }
    );
    if (closestDamagedWall) {
      repairThisWall(closestDamagedWall, movable, element, moveOptions);
      return true;
    } else {
      closestDamagedWall = element.pos.findClosestByRange(
        FIND_STRUCTURES,
        {filter: (structure) =>
          (structure.structureType == 'constructedWall' ||
          structure.structureType == 'wall') &&
          structure.hits < structure.hitsMax
        }
      );
      repairThisWall(closestDamagedWall, movable, element, moveOptions);
    }
    return false;
  },

  /**
   * find closest damaged tower
   * if none found: return false
   * if one found: repair tower or move closer, return true
   * @param {Creep} creep
   * @param {Object} moveOptions
   * @returns {Boolean} was a damaged tower found
   */
  repairClosestDamagedTower: (creep, moveOptions) => {
    const closestDamagedTower = creep.pos.findClosestByRange(
      FIND_STRUCTURES,
      {filter: (structure) =>
        structure.structureType == 'tower' &&
        structure.hits < structure.hitsMax
      }
    );
    if (closestDamagedTower) {
      if (creep.repair(closestDamagedTower) == ERR_NOT_IN_RANGE) {
        creep.moveTo(closestDamagedTower, moveOptions);
      }
      return true;
    }
    return false;
  },

  /**
   * find closest spawn or extension that's not fully energized
   * none found - return false
   * spawn found - transfer energy or move closer, return true
   * @param {Creep} creep
   * @param {Object} moveOptions
   * @returns {Boolean}
   */
  goEnergizeClosestSpawnOrExtension: (creep, moveOptions = {}) => {
    const targets = creep.room.find(
      FIND_STRUCTURES,
      { filter: (structure) => {
        return (structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
      }
    });
    const closestTarget = creep.pos.findClosestByPath(targets);
    if(closestTarget) {
      if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(closestTarget, moveOptions);
      }
      return true;
    }
    return false;
  },

  /**
   * find closest tower that's not fully energized
   * none found - return false
   * tower found - transfer energy to it or move closer, return true
   * @param {Creep} creep
   * @param {Object} moveOptions
   * @returns {Boolean}
   */
  goEnergizeClosestTower: (creep, moveOptions = {}) => {
    const targets = creep.room.find(
      FIND_STRUCTURES,
      {filter: (structure) =>
        structure.structureType == STRUCTURE_TOWER &&
        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
      }
    );
    const closestTarget = creep.pos.findClosestByPath(targets);
    if(closestTarget) {
      if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(closestTarget, moveOptions);
      }
      return true;
    }
    return false;
  },

  /**
   * Go to the room with the attack-flag
   * if there, (range) attack the closest enemy-structure or move closer to it
   * @param {Creep} creep
   * @param {Flag} flag
   * @param {Boolean} isMelee
   */
  goAttackAtFlag: (creep, flag, isMelee) => {
    if (flag && (flag.room == undefined || creep.room.name != flag.room.name)) {
      creep.moveTo(flag);
    } else {
      const target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
      if (isMelee && creep.attack(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
      if (!isMelee && creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
    }
  }
}

function repairThisWall(wall, movable, element, moveOptions) {
  if (movable) {
    if (element.repair(wall) == ERR_NOT_IN_RANGE) {
      element.moveTo(wall, moveOptions);
    }
  } else {
    element.repair(wall);
  }
}

module.exports = utilsRun;