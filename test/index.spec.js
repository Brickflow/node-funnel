'use strict';

var test = require('tape');
var funnel = require('../');

test('funnel-metrics', function(t) {
  t.equal(typeof funnel, 'function', 'it should exists');
  t.end();
});
