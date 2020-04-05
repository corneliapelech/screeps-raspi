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
			const target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
			if(target && creep.build(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target, moveOptions);
      // no construction sites to build
			} else {
        closestDamagedWall = creep.pos.findClosestByRange(
          FIND_STRUCTURES,
          {filter: (structure) =>
            (structure.structureType == 'constructedWall' ||
            structure.structureType == 'wall') &&
            structure.hits < structure.hitsMax
          }
        );
        if (closestDamagedWall) {
          if (creep.repair(closestDamagedWall) == ERR_NOT_IN_RANGE) {
            creep.moveTo(closestDamagedWall, moveOptions);
          }
        }
      }
		} else {
			const target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
			if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target, moveOptions);
			}
		}
	}

};

module.exports = roleBuilder;