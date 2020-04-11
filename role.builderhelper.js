const utilsRun = require('utils.run');

const moveOptions = {
  visualizePathStyle: {stroke: '#db6ce0'}
};

const roleBuilderHelper = {
  /** @param {Creep} creep **/
  run: (creep) => {
    if (creep.room.name == creep.memory.target.roomName) {
      if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.building = false;
      }
      if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
        creep.memory.building = true;
      }
      if(creep.memory.building) {
        utilsRun.goBuild(creep, moveOptions);
      } else {
        utilsRun.goHarvestEnergy(creep, moveOptions);
      }
    } else {
      creep.moveTo(new RoomPosition(
        creep.memory.target.x,
        creep.memory.target.y,
        creep.memory.target.roomName
      ));
    }
  }
};

module.exports = roleBuilderHelper;