var assert = require('assert');

module.exports = test;

function test(desc, func) {
  var failed = false;

  try {
    func();
  } catch (e) {
    failed = true;
    console.log();
    console.log('FAILURE: ' + desc);
    if (e instanceof assert.AssertionError) {
      console.log(e.message);
    } else {
      console.log(e.stack);
    }
    console.log();
  } finally {
    if (failed === false) {
      console.log('SUCCESS: ' + desc);
    }
  }
}
