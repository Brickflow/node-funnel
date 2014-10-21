'use strict';

var _ = require('lodash');
var test = require('tape');
var funnelCalculator = require('../lib/funnel-calculator');

test('calculate funnel empty imputs', function(t) {
  /* jshint maxstatements: 100 */
  var calcFunnel = _.partial(funnelCalculator, {distinctId: 'id'});
  var emptyDeatils = {
    steps: [],
    all: {percent: 100}
  };

  t.deepEqual(calcFunnel(), emptyDeatils);

  t.deepEqual(calcFunnel([]), emptyDeatils);

  t.end();
});

