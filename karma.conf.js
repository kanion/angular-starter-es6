// Karma configuration
// Generated on Fri Jul 22 2016 16:49:03 GMT+0200 (CEST)

var devFiles = require("./config/devFiles.json");
var libs = require("./config/libs.json");
var all = libs.concat(devFiles);

all.push("app/**/*Spec.js");

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify','jasmine'],


    // list of files / patterns to load in the browser
    files: all,


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "app/*.js": ["browserify"],
      "app/**/*.js": ["browserify"],
      "app/**/*.html": ["ng-html2js"],
    },
    ngHtml2JsPreprocessor: {
      moduleName: 'company.templates',
      stripPrefix: "app"
    },

    browserify: {
      transform: [["babelify", {presets: "es2015"}]]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
