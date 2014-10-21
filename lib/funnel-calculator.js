'use strict';

var _ = require('lodash');
var getFunnelSteps = require('./funnel-steps');
var getAllPercent = require('./all-percent');

function getFunnelDetails(options, funnelDescription) {
  funnelDescription = funnelDescription || [];
  var steps = getFunnelSteps(options, funnelDescription);
  return _.extend(
    {steps: steps},
    getAllPercent(steps)
  );
}

module.exports = getFunnelDetails;

