var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    jade        = require('gulp-jade'),
    plumber     = require('gulp-plumber'),
    concat      = require('gulp-concat'),
    browserSync = require('browser-sync'),
    useref      = require('gulp-useref'),
    gulpif      = require('gulp-if'),
    uglify      = require('gulp-uglify'),
    minifyCss   = require('gulp-minify-css'),
    wiredep     = require('wiredep').stream,
    reload      = browserSync.reload;


gulp.task('serve', ['sass', 'jade'], function() {

    browserSync({

        server: { baseDir: "./_src/" }

    });

    /* для простых приложений без jade sass и прочего */
    // gulp.watch("app/*.html").on('change', reload);
    // gulp.watch("app/css/*.css").on('change', reload);
    // gulp.watch("app/js/*.js").on('change', reload);

    gulp.watch("_src/scss/**/*.scss", ['sass']);
    gulp.watch("_src/jade/**/*.jade", ['jade']);
    gulp.watch("_src/js/modules/*.js",['js']);

});

/* DEV TASKS */

gulp.task('sass', function () {

    gulp.src('./_src/scss/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('./_src/css'))
        .pipe(reload({stream: true})
    );
});

gulp.task('jade', function () {
    gulp.src('./_src/jade/pages/*.jade')
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./_src/'))
        .pipe(reload({stream: true}));
});

gulp.task('js', function () {
    gulp.src('./_src/js/modules/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./_src/js/'))
        .pipe(reload({stream: true}));
});

gulp.task('wiredep', function () {
    gulp.src('./_src/jade/*.jade')
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest('./_src/jade/'));
});

/* END OF DEV TASKS */

/* BUILD TASKS */

gulp.task('build', function () {
    var assets = useref.assets();
    gulp.src('./_src/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('./_build/'));
});

/* END OF BUILD TASKS */

gulp.task('default', ['serve']);
