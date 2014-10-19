'use strict';

var test = require('tape');
var getAllStep = require('../lib/all-step');

test('all-step', function(t) {
  t.deepEqual(getAllStep([]), {
    all: {
      percent: 0
    }
  });

  t.deepEqual(getAllStep([{percent: 50}]), {
    all: {
      percent: 50
    }
  });

  t.deepEqual(getAllStep([{percent: 50}, {percent: 10}]), {
    all: {
      percent: 5
    }
  });

  t.end();
});
