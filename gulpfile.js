var babel = require('gulp-babel');
var concat = require('gulp-concat');
var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

gulp.task('source-js', () => {
    return gulp.src('./src/ReactKalturaResumableJs.js')
        .pipe(concat('react-kaltura-resumablejs.js'))
        .pipe(babel({
            plugins: ['transform-object-assign'],
            presets: ['es2015', 'react', 'stage-0']
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('build', ['source-js']);