'use strict';

var _ = require('lodash');

function getFunnelSteps(options, funnelDescription) {
  return funnelDescription.
    reduce(getMinTimes(options), []).
    map(getCountAndPercent);
}

function getPercent(steps) {
  if (steps.last === undefined) {
    return 100;
  }
  return Object.keys(steps.current.minTimes).length /
    Object.keys(steps.last.minTimes).length * 100;
}

function getMinTimes(options) {
  return function(steps, step) {
    var lastStep = _.last(steps);
    steps.push({
      name: step.name,
      minTimes: step.events.reduce(reduceMinTime(_.extend({
        lastMinTimes: lastStep && lastStep.minTimes
      }, options)), {})
    });
    return steps;
  };
}

function getCountAndPercent(step, index, steps) {
  return {
    name: step.name,
    count: Object.keys(step.minTimes).length,
    percent: getPercent({
      last: steps[index - 1],
    current: step
    })
  };
}

function reduceMinTime(options) {
  function reducer(acc, event) {
    event = {
      id: event[options.distinctId],
      time: event[options.time]
    };
    if (isFirstStep() || isEventTimeLaterThanLastStep(event)) {
      acc[event.id] = Math.min(event.time, getOldTimeOrInfinity(acc[event.id]));
    }
    return acc;
  }

  function isFirstStep() {
    return options.lastMinTimes === undefined;
  }

  function isEventTimeLaterThanLastStep(event) {
    return event.time >= options.lastMinTimes[event.id];
  }

  return reducer;
}

function getOldTimeOrInfinity(oldEventTime) {
  return  oldEventTime !== undefined ? oldEventTime : Infinity;
}

module.exports = getFunnelSteps;

