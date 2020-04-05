// roles
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
// structures
const structureTower = require('structure.tower');
// utils
const handleCreepCount = require('utils.handleCreepCount');

module.exports.loop = function () {
  /* handle memory */
  // clear dead memories
  for (const creep in Memory.creeps) {
    if (!Game.creeps[creep]) {
      delete Memory.creeps[creep];
    }
  }

  /* ensure creep amounts */
  handleCreepCount();

  /* run structures */
  for (const structureName in Game.structures) {
    const structure = Game.structures[structureName];
    if (structure.structureType == 'tower') {
      structureTower.run(structure);
    }
  }

  /* run creeps */
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    switch (creep.memory.role) {
      case 'harvester':
        roleHarvester.run(creep);
        break;
      case 'upgrader':
        roleUpgrader.run(creep);
        break;
      case 'builder':
        roleBuilder.run(creep);
    }
  }

  /* visualize spawning */
  if(Game.spawns['Spawn1'].spawning) {
    const spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    Game.spawns['Spawn1'].room.visual.text(
      '🛠️' + spawningCreep.memory.role,
      Game.spawns['Spawn1'].pos.x + 1,
      Game.spawns['Spawn1'].pos.y,
      {align: 'left', opacity: 0.8}
    );
  }
}