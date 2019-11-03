'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const pug = require('gulp-pug');
const copy = require('gulp-copy');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const connect = require('gulp-connect');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src('./index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({
            rebaseTo: '../../',
            compatibility: 'ie8'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

gulp.task('views', function buildHTML() {
    return gulp.src('views/*.pug')
        .pipe(pug({
            // Your options in here.
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

gulp.task('scripts', function() {
    return gulp.src('./index.js')
        .pipe(webpackStream({
            mode: 'development',
            devtool: 'source-map',
            output: {
                filename: 'bundle.js'
            },
            plugins: [
                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery',
                    'window.jQuery': 'jquery'
                }),
            ]
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

gulp.task('copy', function() {
    return gulp.src(['fonts/**/*', 'images/**/*'])
        .pipe(copy('dist'));
});

gulp.task('sass:watch', function () {
    gulp.watch(['common.blocks/**/*.scss', 'index.scss'], gulp.series('sass'));
});

gulp.task('views:watch', function () {
    gulp.watch(['views/*.pug', 'common.blocks/**/*.pug'], gulp.series('views'));
});

gulp.task('scripts:watch', function () {
    gulp.watch(['common.blocks/**/*.js', 'index.js'], gulp.series('scripts'));
});

gulp.task('copy:watch', function () {
    gulp.watch(['fonts/**/*', 'images/**/*'], gulp.series('copy'));
});

gulp.task('watch', gulp.parallel([
    'sass:watch',
    'scripts:watch',
    'views:watch',
    'copy:watch'
]));

gulp.task('build', gulp.series([
    'sass',
    'scripts',
    'views',
    'copy'
]));

gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        port: 3000,
        livereload: true
    });
});

gulp.task('dev', gulp.parallel([
    'build',
    'watch',
    'connect'
]));