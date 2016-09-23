var babel = require('gulp-babel');
var concat = require('gulp-concat');
var gulp = require('gulp');

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