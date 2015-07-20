var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    jade        = require('gulp-jade'),
    concat      = require('gulp-concat'),
    plumber     = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    useref      = require('gulp-useref'),
    gulpif      = require('gulp-if'),
    uglify      = require('gulp-uglify'),
    minifyCss   = require('gulp-minify-css'),
    wiredep     = require('wiredep').stream,
    reload      = browserSync.reload;

gulp.task('server', ['sass','jade'], function() {
   browserSync({
       server: { baseDir: "./_src/"}
   });

    gulp.watch("_src/scss/**/*.sass",['sass']);
    gulp.watch("_src/jade/**/*.jade",['jade']);
    gulp.watch("_src/js/modules/*.js",['js']);
});

gulp.task('sass',function (){
    gulp.src('./_src/scss/*.sass')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('./_src/css'))
        .pipe(reload({stream: true})
    );
});

gulp.task('jade',function (){
    gulp.src('./_src/jade/pages/*.jade')
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./_src/'))
        .pipe(reload({stream: true})
    );
});

gulp.task('js',function (){
    gulp.src('./_src/js/modules/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./_src/js/'))
        .pipe(reload({stream: true})
    );
});

gulp.task('wiredep', function () {
    gulp.src('./_src/jade/*.jade')
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest('./_src/jade/'));
});

/*WRITE BUILDING TASK FOR END PROJECT*/

gulp.task('default',['server']);