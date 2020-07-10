const constants = require('constants');
const conf = require('configuration');

module.exports = {
  spawn: function(){
    // autospawn harvester
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    if (harvesters.length < conf.COUNT_HARVESTER && Game.spawns[constants.SPAWN1].energy >= 200) {
      var newName = 'Harvester' + Game.time;
      console.log('Spawning new harvester: ' + newName);
      Game.spawns[constants.SPAWN1].spawnCreep([WORK, CARRY, MOVE], newName,
          {memory: {role: 'harvester'}});
    }

    // autospawn upgrader

    const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);

        if (harvesters.length == conf.COUNT_HARVESTER && upgraders.length < conf.COUNT_UPGRADER) {
      var newName = 'Upgrader' + Game.time;
      console.log('Spawning new upgrader: ' + newName);
      Game.spawns[constants.SPAWN1].spawnCreep([WORK, CARRY, MOVE], newName,
          {memory: {role: 'upgrader', upgrading: 'false'}});
    }

    // autospawn builder

    const builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);

        if (harvesters.length == conf.COUNT_HARVESTER && builders.length < conf.COUNT_BUILDER) {
      var newName = 'Builder' + Game.time;
      console.log('Spawning new builder: ' + newName);
      Game.spawns[constants.SPAWN1].spawnCreep([WORK, CARRY, MOVE], newName,
          {memory: {role: 'builder'}});
    }

    // autospawn repairer

    const repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    console.log('Repairers: ' + repairers.length);

    if (harvesters.length == conf.COUNT_HARVESTER && repairers.length < conf.COUNT_REPARIER) {
      var newName = 'Repairer' + Game.time;
      console.log('Spawning new repairer: ' + newName);
      Game.spawns[constants.SPAWN1].spawnCreep([WORK, CARRY, MOVE], newName,
          {memory: {role: 'repairer'}});
    }

    if (Game.spawns[constants.SPAWN1].spawning) {
      const spawningCreep = Game.creeps[Game.spawns[constants.SPAWN1].spawning.name];
      Game.spawns[constants.SPAWN1].room.visual.text(
          '🛠️' + spawningCreep.memory.role,
          Game.spawns[constants.SPAWN1].pos.x + 1,
          Game.spawns[constants.SPAWN1].pos.y,
          {align: 'left', opacity: 0.8});
    }
  },
}
