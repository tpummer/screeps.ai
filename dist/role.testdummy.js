const c = require('constants');
const core = require('creep.core');
const movement = require('creep.movement');
const location = require('location');

// role.testdummy

const roleTestdummy = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if(!core.hasTask(creep, c.TASK_LOAD_NRG) && core.isEmpty(creep)){
      core.setTask(creep, c.TASK_LOAD_NRG);
      creep.say('Loading');
    }
    if(core.hasTask(creep, c.TASK_LOAD_NRG) && !core.isNotFull(creep)){
      core.setTask(creep, c.TASK_BUILD);
      creep.say('Building');
    }

    if(core.hasTask(creep, c.TASK_LOAD_NRG) && core.isNotFull(creep)){
      if(movement.hasTargetId(creep)){
        if(creep.memory.debug === 1) {
          console.log(creep.name + ' has targetId ' + movement.getTargetId(creep));
        }
      } else {
        movement.setTargetId(creep, location.find(creep, STRUCTURE_SPAWN, c.HAS_NRG)[0].id);
      }
      if(creep.withdraw(Game.getObjectById(movement.getTargetId(creep)), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        movement.move(creep);
      }
    }
    if(core.hasTask(creep, c.TASK_BUILD) && !core.isEmpty(creep)){
      let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {visualizePathStyle: {stroke: c.COLOR_WHITE}});
        }
      }
    }
    if(creep.memory.debug === 1) {
      console.log(creep.name + ' has nrg: ' + creep.carry.energy);
    }
  },
};

module.exports = roleTestdummy;
