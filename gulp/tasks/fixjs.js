'use strict';

// Necessary Plugins
var gulp = require('gulp'),
  paths = require('../paths'),
  plugins = require('gulp-load-plugins')();

  module.exports = gulp.task('fixjs', function() {
    return gulp.src(paths.source.js)
      .pipe(plugins.fixmyjs())
      .pipe(gulp.dest('./src'));
  });
