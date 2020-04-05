const utilsRun = require('utils.run');

const moveOptions = {
  visualizePathStyle: {stroke: '#ffaa00'}
};
const roleBuilder = {

  /**
   * send creep building or not.
   * non-building creeps harvest energy,
   * building creeps build construction site or if none repair damaged walls
   * @param {Creep} creep
   */
	run: function(creep) {
		if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.building = false;
		}
		if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
			creep.memory.building = true;
		}

		if(creep.memory.building) {
      // go and build, if no construction site was found ...
      if (utilsRun.goBuild(creep, moveOptions) == false) {
        // go repair damaged walls
        utilsRun.repairWalls(creep, true, moveOptions);
      }
		} else {
			utilsRun.goHarvestEnergy(creep, moveOptions);
		}
	}

};

module.exports = roleBuilder;