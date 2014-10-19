'use strict';

var test = require('tape');
var funnel = require('../');


test('acceptance', function(t) {
  var funnelCalculator = funnel({
    time: 'time',
    distinctId: 'id'
  });

  var funnelDetails = funnelCalculator([{
    name: 'first-event',
    events: [
      {time: 1, id: 1},
      {time: 1, id: 2},
      {time: 1, id: 3},
      {time: 1, id: 4}
    ]
  }, {
    name: 'second-event',
    events: [
      {time: 2, id: 1},
      {time: 2, id: 2}
    ]
  }, {
    name: 'third-event',
    events: [
      {time: 3, id: 1}
    ]
  }]);

  t.deepEqual(funnelDetails, {
    all: {
      percent: 25,
    },
    steps: [{
      name: 'first-event',
      percent: 100,
      count: 4
    }, {
      name: 'second-event',
      percent: 50,
      count: 2
    }, {
      name: 'third-event',
      percent: 50,
      count: 1
    }]
  }); 

  t.end();
});

