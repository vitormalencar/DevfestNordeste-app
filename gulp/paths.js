'use strict';

module.exports = {

  source: {
    js: './src/**/*.js',
    sass: './src/**/*.scss',
    jade: './src/**/*.jade',
    fonts: './src/assets/fonts/**/*',
    img: './src/assets/img/**/**/*.{jpg,png,gif}'
  },

  browserSync: {
    js: 'www/js/**/*.js',
    img: 'www/img/**/*',
    html: 'www/**/*.html',
    css: 'www/css/**/*.css'
  },

  build: {
    html: 'www/',
    js: 'www/js',
    css: 'www/css/',
    img: 'www/img',
    fonts: 'www/fonts/'
  }

};
