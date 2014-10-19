'use strict';

var test = require('tape');
var funnel = require('../');

test('funnel', function(t) {
  t.equal(typeof funnel, 'function', 'it should exists');

  t.throws(function() {
    funnel(); 
  } , /No distinctId/, 'should fail if no distinctId is provided!');

  t.equal(typeof funnel({distinctId: 'id'}), 'function',
    'it should create the calculator');

  t.end();
});

function calcFunnel(funnelDescription) {
  return funnel({distinctId: 'id'})(funnelDescription);
}

test('calculate funnel empty imputs', function(t) {
  var emptyDeatils = {
    steps: [],
    all: {percent: 0}
  };

  t.deepEqual(calcFunnel(), emptyDeatils);

  t.deepEqual(calcFunnel([]), emptyDeatils);

  t.end();
});

function genFunnelDetails(dummy) {
  return {
    steps: dummy.steps.map(function(event, index) {
      return {
        name: 'event-' + (index + 1),
        count: event.c,
        percent: event.p
      };
    }),
    all: {
      percent: dummy.all
    }
  };
}



test('calculate funnel', function(t) {
  function assertFunnel(funnelDetails, description) {
    t.deepEqual(funnelDetails, genFunnelDetails(description));
  }

  function genEvents(eventDetails) {
    return eventDetails.map(function(event, index) {
      return {
        name: 'event-' + (index + 1),
        events: event
      };
    });
  }
  
  (function() {
    var events = genEvents([
      [{id: 1, time: 1}]
    ]);
    assertFunnel(calcFunnel(events), {
      steps: [{c: 1, p: 100}],
      all: 100
    });
  }());

  (function() {
    var events = genEvents([
      [{id: 1, time: 1}],
      [{id: 1, time: 1}]
    ]);
    assertFunnel(calcFunnel(events), {
      steps: [{c: 1, p: 100}, {c:1, p: 100}],
      all: 100
    });
  }());

  (function() {
    var events = genEvents([
      [{id: 1, time: 1}, {id: 2, time: 1}],
      [{id: 1, time: 1}]
    ]);
    assertFunnel(calcFunnel(events), {
      steps: [{c: 2, p: 100}, {c: 1, p: 50}],
      all: 50
    });
  }());

  (function() {
    var events = genEvents([
      [{id: 1, time: 2}],
      [{id: 1, time: 1}]
    ]);
    assertFunnel(calcFunnel(events), {
      steps: [{c: 1, p: 100}, {c: 0, p: 0}],
      all: 0
    });
  }());

  (function() {
    var events = genEvents([
      [{id: 1, time: 2}, {id: 1, time: 1}],
      [{id: 1, time: 1}]
    ]);
    assertFunnel(calcFunnel(events), {
      steps: [{c: 1, p: 100}, {c: 1, p: 100}],
      all: 100
    });
  }());

  t.end();
});
