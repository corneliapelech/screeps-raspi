const handleCreepCount = function () {
  for (roomName in Game.rooms) {

    const room = Game.rooms[roomName];
    // const roomControllerLevel = room.controller.level;
    let bodyParts = [];
    if (room.energyCapacityAvailable >= 550) {
      bodyParts = [WORK, WORK, CARRY, MOVE, MOVE];    // costs: 350
    } else if (room.energyAvailable >= 400) {
      bodyParts = [WORK, CARRY, MOVE, MOVE];  // costs: 250
    } else {
      bodyParts = [WORK, CARRY, MOVE];    // costs: 200
    }

    // creeps
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == roomName);
    const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == roomName);
    const builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room.name == roomName);
    // locations
    const constructionSites = _.filter(Game.constructionSites, (conSite) => conSite.room.name == roomName);

    if (harvesters.length < 4) {
      Game.spawns['Spawn1'].spawnCreep(bodyParts, 'Harvester' + Game.time, {memory: {role: 'harvester'}});
    } else {
      if (constructionSites.length > 0) {
        if (upgraders.length < 4) {
          Game.spawns['Spawn1'].spawnCreep(bodyParts, 'Upgrader' + Game.time, {memory: {role: 'upgrader'}});
        }
        if (builders.length < 4) {
          Game.spawns['Spawn1'].spawnCreep(bodyParts, 'Builder' + Game.time, {memory: {role: 'builder'}});
        }
      } else {
        if (upgraders.length < 6) {
          Game.spawns['Spawn1'].spawnCreep(bodyParts, 'Upgrader' + Game.time, {memory: {role: 'upgrader'}});
        }
        if (builders.length > 0) {
          for (builder of builders) {
            builder.suicide();
          }
        }
      }
    }
  }
}
module.exports = handleCreepCount;