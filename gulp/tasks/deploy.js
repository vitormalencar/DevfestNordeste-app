'use strict';
// Necessary Plugins
var gulp = require('gulp'),
    git = require('gulp-git'),
    paths = require('../paths'),
    plugins = require('gulp-load-plugins')();

//  Deploy to Github account
module.exports = gulp.task('deploy', function() {
    return gulp.src('./www/*')
       .pipe(git.add())
       .pipe(git.commit('initial commit', {disableAppendPaths: true}))
});
