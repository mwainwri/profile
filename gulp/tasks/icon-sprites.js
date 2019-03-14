var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del'),
svg2png = require('gulp-svg2png');

var config = {
  shape: {
    spacing: {
      padding: 1
    }
  },
  mode: {
    css: {
      variables: {
        replaceSvgWithPng: function(){
          return function(sprite, render) {
            return render(sprite).split('.svg').join('.png');
          }
        }
      },
      sprite: 'icon-sprite.svg',
      render: {
        css: {
          template: './gulp/templates/icon-sprite.css'
        }
      }
    }
  }
}

gulp.task('beginCleanIcons', function() {
  return del(['./app/temp/icons/sprite', './app/assets/images/sprites/icons']);
});

gulp.task('createSVGIconSprite', function() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/icons/sprite/'));
});

gulp.task('createPngIconsprite', function(){
  return gulp.src('./app/temp/icons/sprite/css/*.svg')
  .pipe(svg2png())
  .pipe(gulp.dest('./app/temp/icons/sprite/css'));
});

gulp.task('copyIconSprites', function() {
  return gulp.src('./app/temp/icons/sprite/css/**/*.{svg,png}')
    .pipe(gulp.dest('./app/assets/images/sprites/icons'));
});

gulp.task('copyIconspriteCSS', function() {
  return gulp.src('./app/temp/icons/sprite/css/*.css')
    .pipe(rename('_icon-sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endCleanIcon', function() {
  return del('./app/temp/icon/sprite');
});

gulp.task('createIcons', gulp.series(['createSVGIconSprite', 'createPngIconsprite']));
gulp.task('copyIcons', gulp.parallel(['copyIconSprites', 'copyIconspriteCSS']));

gulp.task('icons', gulp.series(['beginCleanIcons', 'createIcons', 'copyIcons', 'endCleanIcon']));