const handleCreepCount = function () {
  for (roomName in Game.rooms) {

    const room = Game.rooms[roomName];
    // const roomControllerLevel = room.controller.level;

    // creeps
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == roomName);
    const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == roomName);
    const builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room.name == roomName);
    const maintainers = _.filter(Game.creeps, (creep) => creep.memory.role == 'maintainer' && creep.room.name == roomName);
    // locations
    const constructionSites = _.filter(Game.constructionSites, (conSite) => conSite.room.name == roomName);

    // ensure creeps
    // harvesters
    if (harvesters.length < 5) {
      Game.spawns['Spawn1'].spawnCreep(
        getBodyParts(room.energyCapacityAvailable),
        'Harvester' + Game.time,
        {memory: {role: 'harvester'}}
      );
    // upgraders
    } else if (upgraders.length < 2) {
      Game.spawns['Spawn1'].spawnCreep(
        getBodyParts(room.energyCapacityAvailable),
        'Upgrader' + Game.time,
        {memory: {role: 'upgrader'}}
      );
    } else if (maintainers.length < 2) {
      Game.spawns['Spawn1'].spawnCreep(
        getBodyParts(room.energyCapacityAvailable),
        'Maintainer' + Game.time,
        {memory: {role: 'maintainer'}}
      );
      // builders depending on existence of construction sites
    } else if (constructionSites.length > 0) {
      if (builders.length < 4) {
        Game.spawns['Spawn1'].spawnCreep(
          getBodyParts(room.energyCapacityAvailable),
          'Builder' + Game.time,
          {memory: {role: 'builder'}}
        );
      }
    }
  }
}

function getBodyParts(maxEnergy) {
  if (maxEnergy >= 700) {
    // costs: 650
    return [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
  } else if (maxEnergy >= 550) {
    // costs: 350
    return [WORK, WORK, CARRY, MOVE, MOVE];
  } else if (maxEnergy >= 400) {
    // costs: 250
    return [WORK, CARRY, MOVE, MOVE];
  } else {
    // costs: 200
    return [WORK, CARRY, MOVE];
  }
}

module.exports = handleCreepCount;