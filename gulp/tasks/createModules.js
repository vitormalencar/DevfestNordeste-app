'use strict';

// Necessary Plugins
var gulp = require('gulp'),
  paths = require('../paths'),
  plugins = require('gulp-load-plugins')();
var minimist = require('minimist');

var knownOptions = {
  n: 'n',
  default: {
    n: process.env.NODE_ENV || 'noname'
  }
};

var options = minimist(process.argv.slice(2), knownOptions);


module.exports = gulp.task('shorthand', plugins.shell.task([
  'cd src/components && ' +
  'mkdir '+options.n+' && ' +
  'cd '+options.n+' && ' +
  'touch '+options.n+'.controller.js && ' +
  'touch '+options.n+'.routes.js &&  ' +
  'touch '+options.n+'.factory.js && ' +
  'touch '+options.n+'.view.jade &&  ' +
  'touch '+options.n+'.style.scss'
]))
