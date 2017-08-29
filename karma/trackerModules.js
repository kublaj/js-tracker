var configFactory = require('./configFactory')

module.exports = configFactory(function (defaultConfig) {
  var customConfig = Object.assign({}, defaultConfig, {
    // list of files / patterns to load in the browser
    // all modules including in tests should be included here
    files: [
      /* targets */

      // public
      { pattern: 'src/tracker/public/ActionStore.ts' },

      // private
      { pattern: 'src/tracker/private/ActionMap.ts' },

      /* dependencies */
      { pattern: 'src/tracker/public/*[!(.d)].ts' },
      { pattern: 'src/tracker/private/*[!(.d)].ts' },

      { pattern: 'test/test-script-actions.ts' },

      /* static */
      { pattern: 'test/test-script.js', served: true, included: false },

      /* tests */
      { pattern: 'test/tracker/public/*.ts' },
      { pattern: 'test/tracker/private/*.ts' }
    ],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      /* targets */

      // publics
      'src/tracker/public/ActionStore.ts': ['karma-typescript', 'coverage'],

      // privates
      'src/tracker/private/ActionMap.ts': ['karma-typescript', 'coverage'],

      /* dependencies */
      'src/tracker/public/*[!(.d)].ts': ['karma-typescript'],
      'src/tracker/private/*[!(.d)].ts': ['karma-typescript'],

      'test/test-script-actions.ts': ['karma-typescript'],

      /* tests */
      'test/tracker/public/*.ts': ['karma-typescript'],
      'test/tracker/private/*.ts': ['karma-typescript']
    }
  })
  customConfig.karmaTypescriptConfig.reports.html = 'coverage/trackerModules'

  return customConfig
})