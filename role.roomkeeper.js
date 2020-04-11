const utilsRun = require('utils.run');

const moveOptions = {
  visualizePathStyle: {stroke: '#db6ce0'}
};

const roleRoomKeeper = {
    /** @param {Creep} creep **/
    run: (creep) => {
      if (creep.room.name == creep.memory.target.roomName) {
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
          creep.memory.upgrading = false;
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
          creep.memory.upgrading = true;
        }
        if(creep.memory.upgrading) {
          utilsRun.goUpgradeController(creep, moveOptions);
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

module.exports = roleRoomKeeper;