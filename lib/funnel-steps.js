'use strict';

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

module.exports = getFunnelSteps;

