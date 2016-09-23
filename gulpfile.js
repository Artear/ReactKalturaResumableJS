var babel = require('gulp-babel');
var concat = require('gulp-concat');
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');

gulp.task('source-js', () => {
    return gulp.src('./src/ReactKalturaResumableJs.js')
        .pipe(concat('react-kaltura-resumablejs.js'))
        .pipe(babel({
            plugins: ['transform-object-assign'],
            presets: ['es2015', 'react', 'stage-0']
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('sass', function () {
    gulp.src('./example/styles/scss/styles.scss')
        .pipe(sass())
        .pipe(rename('styles.css'))
        .pipe(gulp.dest('./example/styles/css/'))
        .pipe(livereload());
});

gulp.task('build', ['source-js', 'sass']);