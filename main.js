// roles
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleMaintainer = require('role.maintainer');
const roleMelee = require('role.melee');
const roleRanger = require('role.ranger');
const roleClaimer = require('role.claimer');
const roleLinker = require('role.linker');
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
  // handle links in room 'W5N8'
  const from = Game.rooms['W5N8'].lookForAt('structure', 13, 47)[0];
  const to = Game.rooms['W5N8'].lookForAt('structure', 37, 33)[0];
  from.transferEnergy(to);

  // const melees = _.filter(Game.creeps, (creep) => creep.memory.role == 'melee');
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
        break;
      case 'maintainer':
        roleMaintainer.run(creep);
        break;
      case 'melee': {
        /*if (melees.length < 5) {
          roleMelee.prep(creep);
        } else {
        }*/
        roleMelee.fight(creep);
        break;
      }
      case 'ranger': {
        roleRanger.fight(creep);
        break;
      }
      case 'claimer':
        roleClaimer.run(creep);
        break;
      case 'linker':
        roleLinker.run(creep);
        break;
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