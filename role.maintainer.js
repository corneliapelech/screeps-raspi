const utilsRun = require('utils.run');

const moveOptions = {
  visualizePathStyle: {stroke: '#bf289f'}
};
const roleMaintainer = {
  /**
   * @param {Creep} creep
   */
  run: (creep) => {
    if(creep.memory.maintaining && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.maintaining = false;
		}
		if(!creep.memory.maintaining && creep.store.getFreeCapacity() == 0) {
			creep.memory.maintaining = true;
    }

    if(creep.memory.maintaining) {
      // go maintain
      if (utilsRun.repairClosestDamagedTower(creep, moveOptions) == false) {
        utilsRun.repairWalls(creep, true, moveOptions);
      }
    } else {
      // go gather resources
      utilsRun.goHarvestEnergy(creep, moveOptions);
    }
  }
};

module.exports = roleMaintainer;