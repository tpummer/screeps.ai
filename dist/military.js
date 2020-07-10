module.exports = {
  defend: function(){
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
  },
}
