// TODO(awong): Convert to ES6

import Timeouts from './timeouts';

// Returns an object suitable for a nightwatch test case.
//
// Provides test framework maintainers a single entry point for annotating all tests with things
// like uniform reporters.
//
// @param {beginApplication} Callable taking one argument, client, that runs the e2e test.
function createE2eTest(beginApplication) {
  return { 'Begin application': beginApplication };
}

// Expects navigation lands at a path with the given `urlSubstring`.
function expectNavigateAwayFrom(client, urlSubstring) {
  client.expect.element('.js-test-location').attribute('data-location')
    .to.not.contain(urlSubstring).before(Timeouts.normal);
}

module.exports = {
  baseUrl: 'http://localhost:3000',
  apiUrl: 'http://localhost:4000',
  createE2eTest,
  expectNavigateAwayFrom,
};