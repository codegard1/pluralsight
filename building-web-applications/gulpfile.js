var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function () {
	return gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish', {
			verbose: true
		}))
		.pipe(jscs())
		.pipe(jscs.reporter());
});

gulp.task('fix', function () {
	return gulp.src(jsFiles)
		.pipe(jscs({
			fix: true
		}))
		.pipe(gulp.dest('src'));
});

gulp.task('inject', function () {
	var wiredep = require('wiredep').stream;
	var inject = require('gulp-inject');

	var options = {
		bowerJson: require('./bower.json'),
		directory: './public/lib',
		ignorePath: '../../public'
	};

	var injectSrc = gulp.src([
		'./public/css/*.css',
		'./public/js/*.js'
	], {
		read: false
	});

	var injectOptions = {
		ignorePath: '/public'
	};

	/* return gulp.src('./src/views/*.html')
		.pipe(wiredep(options))
		.pipe(inject(injectSrc, injectOptions))
		.pipe(gulp.dest('./src/views')); */

	return gulp.src('./src/views/*.jade')
		.pipe(wiredep(options))
		.pipe(inject(injectSrc, injectOptions))
		.pipe(gulp.dest('./src/views'));
	}); 

	/*return gulp.src('./src/views/*.hbs')
		.pipe(wiredep(options))
		.pipe(inject(injectSrc, injectOptions))
		.pipe(gulp.dest('./src/views'));
	});*/

gulp.task('serve', ['style', 'inject'], function () {
	var options = {
		script: 'app.js',
		delayTime: 5,
		env: {
			'PORT': 5000
		},
		watch: jsFiles
	};

	return nodemon(options)
		.on('restart', function (ev) {
			console.log(ev || ('Restarting...'));
		});
});