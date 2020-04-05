const utilsRun = require('utils.run');

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
      utilsRun.goUpgradeController(creep, moveOptions);
    } else {
      utilsRun.goHarvestEnergy(creep, moveOptions);
    }
  }

};

module.exports = roleUpgrader;