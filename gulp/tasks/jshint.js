'use strict';

// Necessary Plugins
var gulp = require('gulp'),
  paths = require('../paths'),
  plugins = require('gulp-load-plugins')();


module.exports = gulp.task('lint', function() {
  return gulp.src(paths.source.js)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});
