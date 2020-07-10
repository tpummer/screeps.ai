const c = require('constants');

module.exports = {
  hasTargetId: function(creep) {
    return typeof creep.memory.targetId !== 'undefined' && creep.memory.targetId !== null;
  },
  getTargetId: function(creep) {
    return creep.memory.targetId;
  },
  setTargetId: function(creep, target) {
    creep.memory.targetId = target;
  },
  move: function(creep) {
    const resultOfMoving = creep.moveTo(Game.getObjectById(creep.memory.targetId), {visualizePathStyle: {stroke: c.COLOR_ORANGE}});
    if(creep.memory.debug === 1) {
      console.log(creep.name + ' moves ' + resultOfMoving);
    }
  }
}
