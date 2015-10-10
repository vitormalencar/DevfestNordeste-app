'use strict';

// Necessary Plugins
var gulp = require('gulp'),
  paths = require('../paths'),
  plugins = require('gulp-load-plugins')();

module.exports = gulp.task('fonts', function() {
  return gulp.src(paths.source.fonts)
  .pipe(gulp.dest(paths.build.fonts))
});
