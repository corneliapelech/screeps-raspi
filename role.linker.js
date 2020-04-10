const utilsRun = require('utils.run');

const moveOptions = {
  visualizePathStyle: {stroke: '#db6ce0'}
};
const roleLinker = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if (creep.room.name == creep.memory.target.roomName) {
      if (creep.store.getFreeCapacity() > 0) {
        // go harvest
        utilsRun.goHarvestEnergy(creep, moveOptions);
      } else {
        // go to orig room
        creep.moveTo(new RoomPosition(
          creep.memory.orig.x,
          creep.memory.orig.y,
          creep.memory.orig.roomName
        ));
      }
    } else {
      if (creep.store[RESOURCE_ENERGY] == 0) {
        // got to other room
        creep.moveTo(new RoomPosition(
          creep.memory.target.x,
          creep.memory.target.y,
          creep.memory.target.roomName
        ));
      } else {
        // put energy in link or move to link
        const closestTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}});
        if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(closestTarget, moveOptions);
        }
      }
    }
  }

};

module.exports = roleLinker;