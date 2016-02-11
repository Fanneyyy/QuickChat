var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint');

gulp.task('default', function () {
    return gulp.src('client/*.js')
        .pipe(jshint({ 
            curly:  true,
            immed:  true,
            newcap: true,
            noarg:  true,
            sub:    true,
            boss:   true,
            eqnull: true,
            node:   true,
            undef:  true,
            eqeqeq: true,
            predef: [
                'angular',
                'io'
            ],
            globals: [
                '_',
                'jQuery',
                'moment',
                'angular',
                'console',
                '$',
                'io'
            ]
        }))
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('build'));
});