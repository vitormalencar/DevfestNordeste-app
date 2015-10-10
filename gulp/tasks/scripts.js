'use strict';

// Necessary Plugins
var gulp = require('gulp'),
  paths = require('../paths'),
  gulpif = require('gulp-if'),
  plugins = require('gulp-load-plugins')(),
  env = require('minimist')(process.argv.slice(2));

module.exports = gulp.task('scripts', function() {
  gulp.src(paths.source.js)
    .pipe(plugins.plumber())
    .pipe(plugins.concat('app.js'))
    .pipe(plugins.ngAnnotate({
      add: true,
      single_quotes: true
    }))
    .pipe(gulpif(env.p, plugins.uglify()))
    .pipe(gulp.dest(paths.build.js))
});
