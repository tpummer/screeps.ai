var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleBuilder = require('role.repairer');

var harvesterCount = 2;
var upgraderCount = 10;
var builderCount = 5;
var repairerCount = 2;

module.exports.loop = function () {

    // init round in log
	console.log('### Round ' + Game.time + ' ###');

	// statusinfo
	for(var name in Game.rooms) {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }

    // clear memory
    if(Game.time % 100){
    	for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }

	// autospawn harvester

	var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < harvesterCount && Game.spawns['Spawn1'].energy > 200) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
    }

	// autospawn upgrader

	var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);

	    if(harvesters.length == harvesterCount && upgraders.length < upgraderCount) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'upgrader', upgrading: 'false'}});
    }

	// autospawn builder

	var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);

	    if(harvesters.length == harvesterCount && builders.length < builderCount) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'builder'}});
    }

		// autospawn repairer

		var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
			console.log('Repairers: ' + repairers.length);

				if(harvesters.length == harvesterCount && repairers.length < repairerCount) {
					var newName = 'Repairer' + Game.time;
					console.log('Spawning new repairer: ' + newName);
					Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
							{memory: {role: 'repairer'}});
			}

	if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }


	 // defense

      var tower = Game.getObjectById('5894689a9895c35adef5ac6f');
      if(tower) {
		 console.log(tower);
         var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
              filter: (structure) => structure.hits < structure.hitsMax
          });
          if(closestDamagedStructure) {
              tower.repair(closestDamagedStructure);
          }

          var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
          if(closestHostile) {
              tower.attack(closestHostile);
          }
      }



	// make the creeps move

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
