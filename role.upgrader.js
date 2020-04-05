const moveOptions = {
  visualizePathStyle: {stroke: '#30b4d1'}
};
const roleUpgrader = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.upgrading = false;
    }
    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
      creep.memory.upgrading = true;
    }

    if(creep.memory.upgrading) {
      if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, moveOptions);
      }
    } else {
      const target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
      if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, moveOptions);
      }
    }
  }

};

module.exports = roleUpgrader;