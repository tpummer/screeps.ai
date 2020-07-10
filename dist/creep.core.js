module.exports = {
  isEmpty: function(creep) {
    return creep.carry.energy === 0;
  },
  isNotFull: function(creep) {
    return creep.carry.energy < creep.carryCapacity;
  },
  hasTask: function(creep, task) {
    return creep.memory.task === task;
  },
  setTask: function(creep, task) {
    creep.memory.task = task;
  }
}
