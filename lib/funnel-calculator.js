'use strict';

var _ = require('lodash');
var getFunnelSteps = require('./funnel-steps');
var getAllStep = require('./all-step');

function getFunnelDetails(options, funnelDescription) {
  funnelDescription = funnelDescription || [];
  var steps = getFunnelSteps(funnelDescription);
  return _.extend(
    {steps: steps},
    getAllStep(steps)
  );
}

module.exports = getFunnelDetails;

