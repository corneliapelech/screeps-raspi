const handleCreepCount = function () {
  for (roomName in Game.rooms) {

    const room = Game.rooms[roomName];
    const spawn = room.find(FIND_MY_SPAWNS)[0];
    // const roomControllerLevel = room.controller.level;

    if (spawn) {
      // creeps
      const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && spawn.room.name == roomName);
      const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == roomName);
      const builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room.name == roomName);
      const maintainers = _.filter(Game.creeps, (creep) => creep.memory.role == 'maintainer' && creep.room.name == roomName);
      const melees = _.filter(Game.creeps, (creep) => creep.memory.role == 'melee');
      const rangers = _.filter(Game.creeps, (creep) => creep.memory.role == 'ranger');
      const claimers = _.filter(Game.creeps, creep => creep.memory.role == 'claimer');
      // locations
      const constructionSites = _.filter(Game.constructionSites, (conSite) => conSite.room.name == roomName);

      // ensure creeps
      const isWar = Game.flags['attack'] != undefined;
      const isClaim = Game.flags['claim'] != undefined;
      // harvesters
      if (harvesters.length < 5) {
        spawn.spawnCreep(
          getBodyParts(room.energyCapacityAvailable),
          'Harvester' + Game.time,
          {memory: {role: 'harvester'}}
        );
      // upgraders
      } else if (upgraders.length < 2) {
        spawn.spawnCreep(
          getBodyParts(room.energyCapacityAvailable),
          'Upgrader' + Game.time,
          {memory: {role: 'upgrader'}}
        );
      // claimers
      } else if (isClaim && room.energyCapacityAvailable >= 1300 && (claimers.length < 1 || (claimers[0] && claimers[0].ticksToLive < 60))) {
        spawn.spawnCreep(
          getBodyParts(room.energyCapacityAvailable, 'claimer'),
          'Claimer' + Game.time,
          {memory: {role: 'claimer'}}
        );
      // maintainers
      } else if (maintainers.length < 0) {
        spawn.spawnCreep(
          getBodyParts(room.energyCapacityAvailable),
          'Maintainer' + Game.time,
          {memory: {role: 'maintainer'}}
        );
      // war force
      } else if (isWar == true) {
        if (melees.length < 2) {
          spawn.spawnCreep(
            getBodyParts(room.energyCapacityAvailable, 'melee'),
            'Melee' + Game.time,
            {memory: {role: 'melee'}}
          );
        } else if (rangers.length < 2) {
          spawn.spawnCreep(
            getBodyParts(room.energyCapacityAvailable, 'ranger'),
            'Ranger' + Game.time,
            {memory: {role: 'ranger'}}
          );
        }
      // builders depending on existence of construction sites
      } else if (constructionSites.length > 0) {
        if (builders.length < 4) {
          spawn.spawnCreep(
            getBodyParts(room.energyCapacityAvailable),
            'Builder' + Game.time,
            {memory: {role: 'builder'}}
          );
        }
      }
    }
  }
}

function getBodyParts(maxEnergy, role = null) {
  if (maxEnergy >= 1300 && role == 'claimer') {
    // costs 1300
    return [
      CLAIM, CLAIM,
      MOVE, MOVE
    ];
  }
  if (maxEnergy >= 1100) {
    if (role == 'melee') {
      // costs 650
      return [
        ATTACK, ATTACK, ATTACK,
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
        TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH
      ];
    } else if(role == 'ranger') {
      // costs 650
      return [
        RANGED_ATTACK, RANGED_ATTACK,
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
      ];
    } else {
      // 650
      return [
        WORK, WORK, WORK,
        CARRY, CARRY,
        MOVE, MOVE, MOVE, MOVE, MOVE
      ];
    }
  } else if (maxEnergy >= 700) {
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