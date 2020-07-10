const names = require('constants_names');

const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleRepairer = require('role.repairer');

const harvesterCount = 2;
const upgraderCount = 5;
const builderCount = 2;
const repairerCount = 2;

module.exports.loop = function() {
  // init round in log
  console.log('### Round ' + Game.time + ' ###');

  // statusinfo
  for (var name in Game.rooms) {
    console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
  }

  // clear memory
  if (Game.time % 100) {
    	for (var name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
      }
    }
  }

  // autospawn harvester

  const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  console.log('Harvesters: ' + harvesters.length);

  if (harvesters.length < harvesterCount && Game.spawns[names.SPAWN1].energy >= 200) {
    var newName = 'Harvester' + Game.time;
    console.log('Spawning new harvester: ' + newName);
    Game.spawns[names.SPAWN1].spawnCreep([WORK, CARRY, MOVE], newName,
        {memory: {role: 'harvester'}});
  }

  // autospawn upgrader

  const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  console.log('Upgraders: ' + upgraders.length);

	    if (harvesters.length == harvesterCount && upgraders.length < upgraderCount) {
    var newName = 'Upgrader' + Game.time;
    console.log('Spawning new upgrader: ' + newName);
    Game.spawns[names.SPAWN1].spawnCreep([WORK, CARRY, MOVE], newName,
        {memory: {role: 'upgrader', upgrading: 'false'}});
  }

  // autospawn builder

  const builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  console.log('Builders: ' + builders.length);

	    if (harvesters.length == harvesterCount && builders.length < builderCount) {
    var newName = 'Builder' + Game.time;
    console.log('Spawning new builder: ' + newName);
    Game.spawns[names.SPAWN1].spawnCreep([WORK, CARRY, MOVE], newName,
        {memory: {role: 'builder'}});
  }

  // autospawn repairer

  const repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
  console.log('Repairers: ' + repairers.length);

  if (harvesters.length == harvesterCount && repairers.length < repairerCount) {
    var newName = 'Repairer' + Game.time;
    console.log('Spawning new repairer: ' + newName);
    Game.spawns[names.SPAWN1].spawnCreep([WORK, CARRY, MOVE], newName,
        {memory: {role: 'repairer'}});
  }

  if (Game.spawns[names.SPAWN1].spawning) {
    const spawningCreep = Game.creeps[Game.spawns[names.SPAWN1].spawning.name];
    Game.spawns[names.SPAWN1].room.visual.text(
        '🛠️' + spawningCreep.memory.role,
        Game.spawns[names.SPAWN1].pos.x + 1,
        Game.spawns[names.SPAWN1].pos.y,
        {align: 'left', opacity: 0.8});
  }


	 // defense

  const tower = Game.getObjectById('5894689a9895c35adef5ac6f');
  if (tower) {
		 console.log(tower);
    const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (structure) => structure.hits < structure.hitsMax,
    });
    if (closestDamagedStructure) {
      tower.repair(closestDamagedStructure);
    }

    const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      tower.attack(closestHostile);
    }
  }


  // make the creeps move

  for (var name in Game.creeps) {
    const creep = Game.creeps[name];
    if (creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    }
    if (creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }
    if (creep.memory.role == 'repairer') {
      roleRepairer.run(creep);
    }
  }
};
