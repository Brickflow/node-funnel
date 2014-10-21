'use strict';

function getAllPercent(steps) { 
  return {
    all: { 
      percent: steps.reduce(reducePercent, 100)
    }
  };
}

function reducePercent(acc, current) {
  return acc * current.percent / 100;
}

module.exports = getAllPercent;

