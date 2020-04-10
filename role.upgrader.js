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
      if (creep.room.name === 'W5N8') {
        // get energy from link
        const link = Game.rooms['W5N8'].lookForAt('structure', 37, 33)[0];
        if (link.store.getUsedCapacity('energy') > 0) {
          const target = utilsRun.getClosestEnergySource(creep);
          if (creep.pos.getRangeTo(link) < target.range) {
            const getEnergy = creep.withdraw(link, RESOURCE_ENERGY);
            if(getEnergy == ERR_NOT_IN_RANGE) {
              creep.moveTo(link, moveOptions);
            } else if (getEnergy == 0) {
              creep.memory.upgrading = true;
            }
          } else {
            utilsRun.moveToOrGetEnergy(target, creep, moveOptions);
          }
        } else {
          utilsRun.goHarvestEnergy(creep, moveOptions);
        }
      } else {
        utilsRun.goHarvestEnergy(creep, moveOptions);
      }
    }
  }

};

module.exports = roleUpgrader;