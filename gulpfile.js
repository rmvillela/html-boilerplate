var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minify       = require('gulp-minify');
var browserSync  = require('browser-sync').create();
var reload       = browserSync.reload;

gulp.task('sass', function(){
    return gulp.src('./src/scss/styles.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer('last 10 versions', 'ie 11'))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('compress', function() {
  return gulp.src('./src/js/*.js')
      .pipe(minify())
      .pipe(gulp.dest('./assets/js'))
})

gulp.task('watch-sass', function() {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
});

gulp.task('watch-js', function() {
  gulp.watch('./src/js/**/*.js', ['compress']);
});

gulp.task('serve', function () {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });

  gulp.watch('./src/scss/**/*.scss', ['sass', reload]);

  gulp.watch('./src/js/**/*.js', ['compress']);
});

gulp.task('default', ['sass', 'compress', 'watch-js', 'watch-sass']);