const roleBuilder = {

	/** @param {Creep} creep **/
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
					creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
			}
		} else {
			const target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
			if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
			}
		}
	}

};

module.exports = roleBuilder;