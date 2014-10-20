'use strict';

var _ = require('lodash');
var funnelCalculator = require('./funnel-calculator');

function createFunnelCalculator(options) {
  validateOptions(options);

  return _.partial(funnelCalculator, options);
}

function validateOptions(options) {
  if (options === undefined) {
    throw new Error('No options are provided!');
  }
  ['time', 'distinctId'].forEach(validateProperty(options));
}

function validateProperty(options) {
  return function(property) {
    if (options[property] === undefined) {
      throw Error('No ' + property + ' is provided!');
    } 
  };
}

module.exports = createFunnelCalculator;

