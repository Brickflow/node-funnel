'use strict';

var test = require('tape');
var getAllPercent = require('../lib/all-percent');

test('all-step', function(t) {
  t.deepEqual(getAllPercent([]), {
    all: {
      percent: 100
    }
  });

  t.deepEqual(getAllPercent([{percent: 50}]), {
    all: {
      percent: 50
    }
  });

  t.deepEqual(getAllPercent([{percent: 50}, {percent: 10}]), {
    all: {
      percent: 5
    }
  });

  t.end();
});
