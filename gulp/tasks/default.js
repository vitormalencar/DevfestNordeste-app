'use strict';

var gulp = require('gulp');

// Default task
module.exports = gulp.task('default', ['imagemin', 'sass', 'jade', 'scripts', 'fonts', 'browser-sync', 'watch']);
