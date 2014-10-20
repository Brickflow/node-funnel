'use strict';

var test = require('tape');
var createFunnelCalculator = require('../lib/create-funnel-calculator');

test('createFunnelCalculator', function(t) {
  /* jshint maxstatements: 100 */
  t.equal(typeof createFunnelCalculator, 'function', 'it should exists');

  t.throws(function() {
    createFunnelCalculator(); 
  } , /No options/, 'should fail if no distinctId is provided!');

  t.throws(function() {
    createFunnelCalculator({time: 't'}); 
  } , /No distinctId/, 'should fail if no distinctId is provided!');

  t.throws(function() {
    createFunnelCalculator({distinctId: 'id'}); 
  } , /No time/, 'should fail if no distinctId is provided!');

  t.equal(typeof createFunnelCalculator({
    distinctId: 'id',
    time: 't'
  }),'function', 'it should create the calculator');

  t.end();
});

