const utilsRun = require('utils.run');

const structureTower = {
  /** @param {Structure} tower **/
  run: function(tower) {
    /* handle enemies */
    const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(closestHostile) {
      tower.attack(closestHostile);
    } else {
      /* handle heals but save 200 energy for attackers */
      if (tower.store.getCapacity('energy') - tower.store.getFreeCapacity('energy') > 200) {
        closestWounded = tower.pos.findClosestByRange(
          FIND_MY_CREEPS,
          {filter: (creep) => creep.hits < creep.hitsMax}
        );
        tower.heal(closestWounded);
      }
      /* handle repairs, but save 300 energy for attackers or heals */
      if (tower.store.getCapacity('energy') - tower.store.getFreeCapacity('energy') > 300) {
        utilsRun.repairWalls(tower, false);
      }
    }
  }
};

module.exports = structureTower;