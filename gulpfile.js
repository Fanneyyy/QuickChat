var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    shell = require('gulp-shell'),
    browserSync = require('browser-sync');

gulp.task('build', function () {
    return gulp.src('client/**/*.js')
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

gulp.task('watch', function () {
    var files = [
        'client/*',
        '*.html'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './'
        }
    });
});

gulp.task('default', ['build'], shell.task([
  'node chatserver.js'
]))
