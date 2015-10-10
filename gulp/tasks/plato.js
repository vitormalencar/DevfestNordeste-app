'use strict';

// Necessary Plugins
var gulp = require('gulp'),
  paths = require('../paths'),
  plugins = require('gulp-load-plugins')();

//  Create A grafic
module.exports = gulp.task('plato', function() {
  return gulp.src(paths.source.js)
    .pipe(plugins.plato('report', {
      jshint: {
        options: {
          strict: true
        }
      },
      complexity: {
        trycatch: true
      }
    }));
});
