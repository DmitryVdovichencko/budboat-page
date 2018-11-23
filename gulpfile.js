var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
sass.compiler = require('node-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('css', function () {
    gulp.src('source/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    	  .pipe(gulp.dest('build'))
        .pipe(connect.reload())
});
gulp.task('html', function() {
  gulp.src('source/html/*.html')
    .pipe(gulp.dest('build'))
    .pipe(connect.reload())
});
gulp.task('watch', function () {
   gulp.watch('source/scss/*.scss', ['css']);
   gulp.watch('source/html/*.html', ['html']);
});
gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true,
    open: true
  });
});
gulp.task('default', ['css', 'html']);
gulp.task('start', ['connect', 'watch']);