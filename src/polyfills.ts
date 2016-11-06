import 'core-js';
require('zone.js/dist/zone');

if ('production' === ENV) {
} else {
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
