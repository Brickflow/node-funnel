[![Build Status](https://travis-ci.org/Brickflow/node-funnel.svg)](https://travis-ci.org/Brickflow/node-funnel)
node-funnel
===========

Simple lib to calculate funnels on series of events.


Install
-------
`npm install funnel-metrics`

Usage
-----

```js
var funnelMetrics = require('funnel-metrics');

var funnelCalculator = funnelMetrics({
  time: 't',
  distinctId: 'i'
});

var funnelDetails = funnelCalculator([{
  name: 'first-event',
  events: [
    {t: 1, i: 1},
    {t: 1, i: 2},
    {t: 1, i: 3},
    {t: 1, i: 4}
  ]
}, {
  name: 'second-event',
  events: [
    {t: 2, i: 1},
    {t: 2, i: 2}
  ]
}, {
  name: 'third-event',
  events: [
    {t: 3, i: 1}
  ]
}]);

console.log(funnelDetails);
//{
//  {
//    all: {
//    percent: 25,
//  },
//  steps: [
//    {
//      name: 'first-event',
//      percent: 100,
//      count: 4
//    }, {
//      name: 'second-event',
//      percent: 50,
//      count: 2
//    }, {
//      name: 'third-event',
//      percent: 50,
//      count: 1
//    }
//  ]
//} 
```

License
-------

MIT
