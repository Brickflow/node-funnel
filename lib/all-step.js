'use strict';

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

module.exports = getAllStep;

