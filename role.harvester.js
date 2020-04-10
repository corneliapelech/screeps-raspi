const utilsRun = require('utils.run');

const moveOptions = {
  visualizePathStyle: {stroke: '#5cf005'}
};
const roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if(creep.store.getFreeCapacity() > 0) {
      utilsRun.goHarvestEnergy(creep, moveOptions);
    } else {
      if (utilsRun.goEnergizeClosestSpawnOrExtension(creep, moveOptions) == false) {
        if(utilsRun.goEnergizeClosestTower(creep, moveOptions) == false) {
          // wait at spawn
          creep.moveTo(creep.room.find(FIND_MY_SPAWNS)[0]);
        }
      }
    }
  }

};

module.exports = roleHarvester;