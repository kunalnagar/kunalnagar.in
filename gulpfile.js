var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var hash = require('gulp-hash');
var del = require('del');
var theme = 'themes/kunalnagar';

gulp.task('scss', function() {
	del([theme + '/static/css/**/*'])
	gulp.src(theme + '/static/scss/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(autoprefixer({
			browsers: ['last 20 versions']
		}))
		.pipe(hash())
		.pipe(gulp.dest(theme + '/static/css'))
		.pipe(hash.manifest('hash.json'))
		.pipe(gulp.dest(theme + '/data/css'))
});

// gulp.task('images', function() {
// 	del([theme + '/static/img/**/*'])
// 	gulp.src(theme + '/static/images/**/*')
// 		.pipe(hash())
// 		.pipe(gulp.dest(theme + '/static/img'))
// 		.pipe(hash.manifest('hash.json'))
// 		.pipe(gulp.dest(theme + '/data/img'))
// });

gulp.task('js', function() {
	del([theme + '/static/js/**/*'])
	gulp.src(theme + '/static/javascripts/**/*')
		.pipe(uglify().on('error', function(e) {
			console.log(e);
		}))
		.pipe(hash())
		.pipe(gulp.dest(theme + '/static/js'))
		.pipe(hash.manifest('hash.json'))
		.pipe(gulp.dest(theme + '/data/js'))
});

gulp.task('watch', ['scss', 'images', 'js'], function() {
	gulp.watch(theme + '/static/scss/**/*', ['scss']);
	// gulp.watch(theme + '/static/images/**/*', ['images']);
	gulp.watch(theme + '/static/javascripts/**/*', ['js']);
});