'use strict';

var test = require('tape');
var getFunnelSteps = require('../lib/funnel-steps');

test('funnel-steps', function(t) {
  t.equal(typeof getFunnelSteps, 'function', 'it should exists');

  t.end();
});

test('calculate simple steps', function(t) {
  /* jshint maxstatements: 100 */
  var assertFunnel = getAssertFunnel(t);

  (function() {
    assertFunnel(getFunnelSteps([]), []);
  }());
  
  (function() {
    var events = genEvents([
      [{id: 1, time: 1}]
    ]);
    assertFunnel(getFunnelSteps(events), [
      {c: 1, p: 100}
    ]);
  }());

  (function() {
    var events = genEvents([
      [{id: 1, time: 1}],
      [{id: 1, time: 1}]
    ]);
    assertFunnel(getFunnelSteps(events), [
      {c: 1, p: 100}, {c:1, p: 100}
    ]);
  }());

  (function() {
    var events = genEvents([
      [{id: 1, time: 1}, {id: 2, time: 1}],
      [{id: 1, time: 1}]
    ]);
    assertFunnel(getFunnelSteps(events), [
      {c: 2, p: 100}, {c: 1, p: 50}
    ]);
  }());

  (function() {
    var events = genEvents([
      [{id: 1, time: 2}],
      [{id: 1, time: 1}]
    ]);
    assertFunnel(getFunnelSteps(events), [
      {c: 1, p: 100}, {c: 0, p: 0}
    ]);
  }());

  (function() {
    var events = genEvents([
      [{id: 1, time: 2}, {id: 1, time: 1}],
      [{id: 1, time: 1}]
    ]);
    assertFunnel(getFunnelSteps(events), [
      {c: 1, p: 100}, {c: 1, p: 100}
    ]);
  }());

  t.end();
});

function getAssertFunnel(t) {
  return function(funnelDetails, description) {
    t.deepEqual(funnelDetails, genFunnelDetails(description));
  };
}

function genFunnelDetails(dummy) {
  return dummy.map(function(event, index) {
    return {
      name: 'event-' + (index + 1),
      count: event.c,
      percent: event.p
    };
  });
}

function genEvents(eventDetails) {
  return eventDetails.map(function(event, index) {
    return {
      name: 'event-' + (index + 1),
      events: event
    };
  });
}

