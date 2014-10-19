'use strict';

var test = require('tape');
var createFunnelCalculator = require('../lib/create-funnel-calculator');

test('createFunnelCalculator', function(t) {
  t.equal(typeof createFunnelCalculator, 'function', 'it should exists');

  t.throws(function() {
    createFunnelCalculator(); 
  } , /No distinctId/, 'should fail if no distinctId is provided!');

  t.equal(typeof createFunnelCalculator({distinctId: 'id'}), 'function',
    'it should create the calculator');

  t.end();
});

