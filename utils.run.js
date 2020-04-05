const utilsRun = {
  /**
   * find closest energy-source and harvest or move towards it
   * @param {Creep} creep
   * @param {Object} moveOptions
   */
  goHarvestEnergy: (creep, moveOptions = {}) => {
    const target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, moveOptions);
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
   * @param {Creep | Structure} element
   * @param {Object} moveOptions
   * @returns {Boolean}
   */
  repairWalls: (element, movable = false, moveOptions = {}) => {
    const closestDamagedWall = element.pos.findClosestByRange(
      FIND_STRUCTURES,
      {filter: (structure) =>
        (structure.structureType == 'constructedWall' ||
        structure.structureType == 'wall') &&
        structure.hits < structure.hitsMax
      }
    );
    if (closestDamagedWall) {
      if (movable) {
        if (element.repair(closestDamagedWall) == ERR_NOT_IN_RANGE) {
          element.moveTo(closestDamagedWall, moveOptions);
        }
      } else {
        element.repair(closestDamagedWall);
      }
      return true;
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
  }

}

module.exports = utilsRun;