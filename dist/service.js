module.exports = {
    method: function() {},
    otherMethod: function() {},
};

module.exports = {
  roundInfo: function() {
    console.log('### Round ' + Game.time + ' ###');
  },

  roomInfo: function() {
    for (var name in Game.rooms) {
      console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }
  },

  clearMemory: function() {
    if (Game.time % 100) {
      for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
          delete Memory.creeps[name];
          console.log('Clearing non-existing creep memory:', name);
        }
      }
    }
  },
}
