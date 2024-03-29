var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    shell = require('gulp-shell'),
    beautify = require('gulp-beautify');

gulp.task('beautify', function() {
  gulp.src('./client/**/*.js')
    .pipe(beautify({indentSize: 4}))
    .pipe(gulp.dest('./client/'))
});

gulp.task('build', function () {
    return gulp.src(['client/**/*.js'])
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
                'io',
                '$',
                'alertify'
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

gulp.task('default', ['beautify','build'], shell.task([
  'node chatserver.js'
]));
