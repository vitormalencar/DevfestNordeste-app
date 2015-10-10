'use strict';

// Necessary Plugins
var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  paths = require('../paths'),
  runSequence = require('run-sequence'),
  git = require('gulp-git');
var minimist = require('minimist');

var date = new Date();

var knownOptions = {
  b: 'b',
  m: 'm',
  default: {
    b: process.env.NODE_ENV || '2.0.0',
    m: process.env.NODE_ENV || 'Update ' + date
  }
};

var options = minimist(process.argv.slice(2), knownOptions);

module.exports = gulp.task('deploy', function(callback) {
  runSequence('add', 'commit', 'push');
});

// ['./gulp', './www', './src']
module.exports = gulp.task('add', function() {
  return gulp.src('./')
    .pipe(git.add({
      args: '-A .',
      quiet: true
    }));
});

module.exports = gulp.task('commit', function() {
  return gulp.src('./')
    .pipe(git.commit(options.m));
});



module.exports = gulp.task('push', function() {
  git.push('origin', options.b, function(err) {
    if (err) throw err;
  });
});
