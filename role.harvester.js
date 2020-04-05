const roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if(creep.store.getFreeCapacity() > 0) {
      const target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
      if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target, {visualizePathStyle: {stroke: '#5cf005'}});
      }
    } else {
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
          creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#5cf005'}});
        }
      } else {
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
            creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#5cf005'}});
          }
        } else {
          creep.moveTo(Game.spawns['Spawn1']);
        }
      }
    }
  }

};

module.exports = roleHarvester;