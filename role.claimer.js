const utilsRun = require('utils.run');

const roleClaimer = {
  /**
   * @param {Creep} creep
   */
  run: (creep) => {
    const flags =  _.filter(Game.flags, (flag) => flag.name == 'claim');
    const targetRoom = flags[0] ? flags[0].room : null;
    if (targetRoom == undefined || creep.room.name != targetRoom.name) {
      creep.moveTo(flags[0]);
    } else {
      // already in room to claim/reserve
        // claim
        const claim = creep.claimController(creep.room.controller);
        if (claim == ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller);
        } else if (claim == ERR_GCL_NOT_ENOUGH) {
          if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
          }
        } else if (claim == 0) {
          targetRoom.createFlag(flags[0].pos, 'spawner', COLOR_GREY);
          flags[0].remove();
          Game.notify('claimed room' + targetRoom.name);
          targetRoom.memory.parentSpawn = creep.memory.spawnedBy;
        }
    }
  },

};
module.exports = roleClaimer;