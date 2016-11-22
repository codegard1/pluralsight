var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function () {
	gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish', {
			verbose: true
		}))
		.pipe(jscs())
		.pipe(jscs.reporter());
});

gulp.task('fix', function () {
	gulp.src('src/app.js')
		.pipe(jscs({
			fix: true
		}))
		.pipe(gulp.dest('src'));
});