'use strict';

var gulp = require('gulp'),
	paths = require('../paths'),
	gulpif = require('gulp-if'),
	plugins = require('gulp-load-plugins')(),
	env = require('minimist')(process.argv.slice(2));

module.exports = gulp.task('csso', function () {
	return gulp.src('www/css/ionic.app.css')
		.pipe(plugins.plumber())
		.pipe(gulpif(env.p, plugins.csso()))
		.pipe(gulp.dest(paths.build.css));
});
