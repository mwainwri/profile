var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', function() {

    browserSync.init({
        notify: false,
        server: {
            baseDir: "app"
        },
    });

    watch('./app/index.html', function() {
        browserSync.reload();
    });

    watch('./app/assets/**/*.css', function() {
       // gulp.start('cssInject');
        gulp.task('cssInject')();
    });

    watch('./app/assets/scripts/**/*.js', function() {
       // gulp.start('scriptsRefresh');
        gulp.task('scriptsRefresh')();
    });
});
gulp.task('cssRefresh', function() {
    browserSync.reload();
});

gulp.task('cssInject', gulp.parallel( ['styles'],['cssRefresh']), function() {
    return gulp.src('./app/temp/styles/styles.css')
    //.pipe(browserSync.stream());
   
});

gulp.task('scriptsRefresh',  gulp.parallel(['scripts']), function() {
    browserSync.reload();
});

