const handleCreepCount = function () {
  for (roomName in Game.rooms) {

    const room = Game.rooms[roomName];
    // const roomControllerLevel = room.controller.level;

    // creeps
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == roomName);
    const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == roomName);
    const builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room.name == roomName);
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
    // builders depending on existence of construction sites
    } else {
      if (constructionSites.length > 0) {
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
}

function getBodyParts(maxEnergy) {
  if (maxEnergy >= 700) {
    return [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];  // costs: 600
  } else if (maxEnergy >= 550) {
    return [WORK, WORK, CARRY, MOVE, MOVE];    // costs: 350
  } else if (maxEnergy >= 400) {
    return [WORK, CARRY, MOVE, MOVE];  // costs: 250
  } else {
    return [WORK, CARRY, MOVE];    // costs: 200
  }
}

module.exports = handleCreepCount;