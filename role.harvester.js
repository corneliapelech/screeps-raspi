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
          creep.moveTo(Game.spawns['Spawn1']);
        }
      }
    }
  }

};

module.exports = roleHarvester;