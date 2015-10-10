'use strict';

// Necessary Plugins
var gulp = require('gulp'),
	paths = require('../paths'),
	purify = require('gulp-purifycss'),
	gulpif = require('gulp-if'),
	browserSync = require('browser-sync'),
	plugins = require('gulp-load-plugins')(),
	env = require('minimist')(process.argv.slice(2));

module.exports = gulp.task('sass', function () {
	gulp.src('src/assets/styles/main.scss')
		.pipe(plugins.plumber())
		.pipe(plugins.sass({errLogToConsole: true}))
		.pipe(plugins.size())
		.pipe(purify(['www/**/*.js', 'www/**/*.html','www/components/**/*.html']))
		.pipe(plugins.size())
		.pipe(gulpif(env.p, plugins.minifyCss()))
		.pipe(gulp.dest(paths.build.css))
		.pipe(browserSync.stream());
})
