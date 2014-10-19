'use strict';

var _ = require('lodash');

function createFunnelCalculator(options) {
  options = options || {};
  validateOptions(options);

  return function(funnelDescription) {
    funnelDescription = funnelDescription || [];
    var steps = getFunnelSteps(funnelDescription);
    return _.extend(
      {steps: steps},
      getAllStep(steps)
    );
  };
}

function getAllStep(steps) { 
  function getAllPercent() {
    if (steps.length === 0) {
      return 0;
    }
    return steps.reduce(function(acc, current) {
      return acc * current.percent / 100;
    }, 100);
  }

  return {
    all: { 
      percent: getAllPercent()
    }
  };
}

function getFunnelSteps(funnelDescription) {
  var minTimes = [];

  function getPercent(index) {
    if (index === 0) {
      return 100;
    }
    return Object.keys(minTimes[index]).length /
      Object.keys(minTimes[index - 1]).length * 100;
  }

  function reduceMinTime(stepIndex) {
    function isFirstStep() {
      return stepIndex === 0;
    }

    function isEventTimeLaterThanLastStep(event) {
      return event.time >= minTimes[stepIndex - 1][event.id];
    } 

    return function(acc, event) {
      if (isFirstStep() || isEventTimeLaterThanLastStep(event)) {
        var oldTime = acc[event.id] !== undefined ? acc[event.id] : Infinity;
        acc[event.id] = Math.min(event.time, oldTime);
      }
      return acc;
    };
  }

  return funnelDescription.map(function(step, index) {
    minTimes.push(step.events.reduce(reduceMinTime(index), {}));
    return {
      name: step.name,
      count: Object.keys(minTimes[index]).length,
      percent: getPercent(index)
    };
  });
}

function validateOptions(options) {  
  if (options.distinctId === undefined) {
    throw new Error('No distinctId is provided!');  
  }
}

module.exports = createFunnelCalculator;

