const utilsRun = require('utils.run');

const roleRanger = {
  /**
   * @param {Creep} creep
   */
  prep: (creep) => {
    const flags = creep.room.find(FIND_FLAGS, {filter: (flag) => flag.name == 'ranged'});
    creep.moveTo(flags[0]);
  },

  /**
   * @param {Creep} creep
   */
  fight: (creep) => {
    const flag = Game.flags['attack'];
    utilsRun.goAttackAtFlag(creep, flag, false);
  }

};
module.exports = roleRanger;