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
      sprite: 'design-sprite.svg',
      render: {
        css: {
          template: './gulp/templates/design-sprite.css'
        }
      }
    }
  }
}

gulp.task('beginCleanDesigns', function() {
  return del(['./app/temp/designs/sprite', './app/assets/images/sprites/designs']);
});

gulp.task('createSVGDesignSprite', function() {
  return gulp.src('./app/assets/images/designs/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/designs/sprite/'));
});

gulp.task('createPngDesignSprite', function(){
  return gulp.src('./app/temp/designs/sprite/css/*.svg')
  .pipe(svg2png())
  .pipe(gulp.dest('./app/temp/designs/sprite/css'));
});

gulp.task('copyDesignSprites', function() {
  return gulp.src('./app/temp/designs/sprite/css/**/*.{svg,png}')
    .pipe(gulp.dest('./app/assets/images/sprites/designs'));
});

gulp.task('copyDesignSpriteCSS', function() {
  return gulp.src('./app/temp/designs/sprite/css/*.css')
    .pipe(rename('_design-sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endCleanDesign', function() {
  return del('./app/temp/design/sprite');
});

gulp.task('createDesigns', gulp.series(['createSVGDesignSprite', 'createPngDesignSprite']));
gulp.task('copyDesigns', gulp.parallel(['copyDesignSprites', 'copyDesignSpriteCSS']));

gulp.task('designs', gulp.series(['beginCleanDesigns', 'createDesigns', 'copyDesigns', 'endCleanDesign']));