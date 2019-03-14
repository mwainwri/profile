var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('previewDist', function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "docs"
        },
    });
})

gulp.task('deleteDocsFolder', function() {
    return del('./docs');
})

gulp.task('copyGeneralFiles', function(){
    var pathsToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**',
        '!./app/plugins',
        '!./app/plugins/**',
    ]
    return gulp.src(pathsToCopy)
    .pipe(gulp.dest("./docs"));
})

gulp.task('optimizeImages', function() {

    var filesToOptimize = [
        './app/assets/images/**/*',
        '!./app/assets/images/icons',
        '!./app/assets/images/icons/**/*',
        '!./app/assets/images/designs',
        '!./app/assets/images/designs/**/*'
    ]
    return gulp.src(filesToOptimize)
    .pipe(imagemin({
        progressive: true,
        interlaced: true,
        multipass: true
    }))
    .pipe(gulp.dest("./docs/assets/images"));
})

gulp.task('usemin', function(){
    return gulp.src('./app/index.html')
    .pipe(usemin({
        css: [function() {return rev()}, function() {return cssnano()}],
        js: [function() {return rev()}, function(){return uglify()}]
    }))
    .pipe(gulp.dest("./docs"));
})

gulp.task('build', gulp.series(['icons','deleteDocsFolder','copyGeneralFiles','optimizeImages', 'styles','optimizeScripts','usemin']));