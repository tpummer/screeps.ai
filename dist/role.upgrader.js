const c = require('constants');

// role.upgrader

const roleUpgrader = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if (creep.carry.energy == 0 && creep.memory.upgrading) {
      creep.memory.upgrading = false;
      creep.say('harvest');
    }

	  if (creep.carry.energy == creep.carryCapacity && !creep.memory.upgrading) {
	    creep.memory.upgrading = true;
	    creep.say('upgarding');
	  }

    if (!creep.memory.upgrading) {
      const sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      }
    } else {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }
  },
};

module.exports = roleUpgrader;
