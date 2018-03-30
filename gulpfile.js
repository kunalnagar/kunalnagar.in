var fs = require('fs');

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var hash = require('gulp-hash');
var del = require('del');
var critical = require('critical').stream;

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

gulp.task('critical', function () {
	var files = fs.readdirSync('./public/css/');
	var fileName = '';
	files.forEach(function(file) {
		console.log(file);
		fileName = file;
	});
    return gulp.src('public/**/*.html')
        .pipe(critical({base: 'public/', inline: true, css: ['public/css/' + fileName]}))
        .on('error', function(err) { console.log(err.message); })
        .pipe(gulp.dest('public'));
});

gulp.task('watch', ['scss', 'js'], function() {
	gulp.watch(theme + '/static/scss/**/*', ['scss']);
	gulp.watch(theme + '/static/javascripts/**/*', ['js']);
});