const utilsRun = require('utils.run');

const moveOptions = {
  visualizePathStyle: {stroke: '#5cf005'}
};
const roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if(creep.memory.energize && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.energize = false;
		}
		if(!creep.memory.energize && creep.store.getFreeCapacity() == 0) {
			creep.memory.energize = true;
    }

    if (creep.memory.energize) {
      if (utilsRun.goEnergizeClosestSpawnOrExtension(creep, moveOptions) == false) {
        if(utilsRun.goEnergizeClosestTower(creep, moveOptions) == false) {
          // wait at spawn
          creep.moveTo(creep.room.find(FIND_MY_SPAWNS)[0]);
        }
      }
    } else {
      utilsRun.goHarvestEnergy(creep, moveOptions);
    }
  }

};

module.exports = roleHarvester;