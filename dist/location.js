module.exports = {
  find: function(creep, wantedStructure, flag_has_nrg) {
    if (flag_has_nrg) {
      return creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == wantedStructure && structure.energy > 0);
        },
      });
    } else {
      return creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == wantedStructure && structure.energy == 0);
        },
      });
    }
  },
}
