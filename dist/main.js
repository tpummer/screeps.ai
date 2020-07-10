const constants = require('constants');
const configuration = require('configuration');

const service = require('service');

const spawner = require('spawner');
const military = require('military');
const creeper = require('creeper');

module.exports.loop = function() {
  service.roundInfo();
  service.roomInfo();
  service.clearMemory();

  spawner.spawn();
  military.defend();

  creeper.move();
};
