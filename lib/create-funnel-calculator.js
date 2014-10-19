'use strict';

var _ = require('lodash');
var funnelCalculator = require('./funnel-calculator');

function createFunnelCalculator(options) {
  options = options || {};
  validateOptions(options);

  return _.partial(funnelCalculator, options);
}

function validateOptions(options) {  
  if (options.distinctId === undefined) {
    throw new Error('No distinctId is provided!');  
  }
}

module.exports = createFunnelCalculator;

