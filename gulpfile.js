var fs           = require('fs')                       // file system, used to load the text content
		gulp         = require('gulp'),                    // gulp task runner
		sass         = require('gulp-sass'),               // compiles sass
		autoprefixer = require('gulp-autoprefixer'),       // applies CSS vendor prefixes
		rename       = require('gulp-rename'),             // renames files
		livereload   = require('gulp-livereload'),         // reload browser when files change
		concat       = require('gulp-concat'),             // concatenate scripts
		handlebars   = require('gulp-compile-handlebars'), // compile handlebars templates
		http         = require('http'),                    // node core module to serve data
		serveStatic  = require('serve-static'),            // serves static files
		finalhandler = require('finalhandler'),            // standardizes server response
		opn          = require('opn'),                     // opens the browser when we gulp
		jshint       = require('gulp-jshint'),             // catches errors in javascript
		stylish      = require('jshint-stylish'),          // makes lint errors look nicer
		plumber      = require('gulp-plumber'),            // keeps pipes working even when error happens
		notify       = require('gulp-notify'),             // system notification when error happens
		del          = require('del')	  									 // deletes files. used in 'clean' task

var paths = {
	styles:   './src/scss/**/*',
	scripts:  './src/js/**/*',
	pages:    './src/html/pages/**/*',
	partials: './src/html/partials/**/*',
	images:   './src/img/**/*',
	svgs:     './src/img/svgs.json',
	dist:     './dist'
}

/*

███████╗████████╗██╗   ██╗██╗     ███████╗███████╗
██╔════╝╚══██╔══╝╚██╗ ██╔╝██║     ██╔════╝██╔════╝
███████╗   ██║    ╚████╔╝ ██║     █████╗  ███████╗
╚════██║   ██║     ╚██╔╝  ██║     ██╔══╝  ╚════██║
███████║   ██║      ██║   ███████╗███████╗███████║
╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚══════╝╚══════╝

*****************************************************/

gulp.task('styles', ['clean'], function(){

	var sassError = function(err){
		notify.onError({
			title:    err.relativePath,
			subtitle: 'Line '+err.line,
			message:  '<%= error.messageOriginal %>'
		})(err)
		this.emit('end')
	}

	gulp.src('./src/scss/imports.scss')
		.pipe(plumber({
				errorHandler: sassError
		}))
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(rename('style.css'))
		.pipe(gulp.dest(paths.dist))
		.pipe(livereload())
})

/*

███████╗ ██████╗██████╗ ██╗██████╗ ████████╗███████╗
██╔════╝██╔════╝██╔══██╗██║██╔══██╗╚══██╔══╝██╔════╝
███████╗██║     ██████╔╝██║██████╔╝   ██║   ███████╗
╚════██║██║     ██╔══██╗██║██╔═══╝    ██║   ╚════██║
███████║╚██████╗██║  ██║██║██║        ██║   ███████║
╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝        ╚═╝   ╚══════╝

********************************************************/

gulp.task('scripts', ['lint','clean'], function(){
	return gulp.src(paths.scripts)
		.pipe(concat('main.js'))
		.pipe(gulp.dest(paths.dist))
		.pipe(livereload())
})

gulp.task('lint',function(){
	return gulp.src(paths.scripts)
		.pipe(plumber())
		.pipe(jshint({
			'asi':true // allows missing semicolons
		}))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(notify(function (file) {  // Use gulp-notify as jshint reporter
			if (file.jshint.success) {
				return false // Don't show something if success
			}
			var errors = file.jshint.results.map(function (data) {
				if (data.error) {
					return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason
				}
			}).join("\n")
			return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors
		}))
})


/*

██╗ ███╗   ███╗  █████╗   ██████╗  ███████╗ ███████╗
██║ ████╗ ████║ ██╔══██╗ ██╔════╝  ██╔════╝ ██╔════╝
██║ ██╔████╔██║ ███████║ ██║  ███╗ █████╗   ███████╗
██║ ██║╚██╔╝██║ ██╔══██║ ██║   ██║ ██╔══╝   ╚════██║
██║ ██║ ╚═╝ ██║ ██║  ██║ ╚██████╔╝ ███████╗ ███████║
╚═╝ ╚═╝     ╚═╝ ╚═╝  ╚═╝  ╚═════╝  ╚══════╝ ╚══════╝

****************************************************/

gulp.task('images', ['clean'], function(){
	return gulp.src(paths.images,{base:'./src/img/'})

	

	.pipe(gulp.dest(paths.dist+'/img'))
})

/*

██╗  ██╗████████╗███╗   ███╗██╗
██║  ██║╚══██╔══╝████╗ ████║██║
███████║   ██║   ██╔████╔██║██║
██╔══██║   ██║   ██║╚██╔╝██║██║
██║  ██║   ██║   ██║ ╚═╝ ██║███████╗
╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝╚══════╝

*************************************/

gulp.task('lint-svgs',function(){
	return gulp.src(paths.svgs)
		.pipe(plumber())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(notify(function (file) {  // Use gulp-notify as jshint reporter
			if (file.jshint.success) {
				return false // Don't show something if success
			}
			var errors = file.jshint.results.map(function (data) {
				if (data.error) {
					return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason
				}
			}).join("\n")
			return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors
		}))
})

gulp.task('html',['lint-svgs','images','clean'], function () {

	// get svgs object
	var svgs = JSON.parse(fs.readFileSync(paths.svgs,'utf8'))

	// notify when handlebars error happens
	var handlebarsError = function(err){
		notify.onError({
			title:    'Handlebars Error',
			message:  '<%= error.message %>'
		})(err)
		console.log(err)
		this.emit('end')
	}

	var options = { batch : './src/html/partials' } // batch is the path to the partials

	return gulp.src(paths.pages)
		.pipe(plumber({
			errorHandler: handlebarsError
		}))
		.pipe(handlebars(svgs, options)) // pass in the SVGs and partials
		.pipe(rename(function(path){
			path.extname = '.html'
		}))
		.pipe(gulp.dest(paths.dist))
		.pipe(livereload())
})

/*

███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗
██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗
███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝
╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗
███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║
╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝

****************************************************/

gulp.task('livereload-listen', function(){
	livereload.listen()
})

gulp.task('serve',['html'], function() {

	// Serve up distribution folder
	var serve = serveStatic(paths.dist)

	// Create server
	var server = http.createServer(function(req, res){
		var done = finalhandler(req, res)
		serve(req, res, done)
	})

	server.listen(3000) // Listen
})

// opens browser to the page
gulp.task('open',['serve'], function(){
	opn('http:/localhost:3000')
})

/*

██╗    ██╗ █████╗ ████████╗ ██████╗██╗  ██╗
██║    ██║██╔══██╗╚══██╔══╝██╔════╝██║  ██║
██║ █╗ ██║███████║   ██║   ██║     ███████║
██║███╗██║██╔══██║   ██║   ██║     ██╔══██║
╚███╔███╔╝██║  ██║   ██║   ╚██████╗██║  ██║
 ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝    ╚═════╝╚═╝  ╚═╝

**********************************************/

gulp.task('watch',['serve'], function(){
	gulp.watch(paths.styles,   ['styles'])
	gulp.watch(paths.scripts,  ['scripts'])
	gulp.watch(paths.pages,    ['html'])
	gulp.watch(paths.partials, ['html'])
	gulp.watch(paths.content,  ['html'])
	gulp.watch(paths.svgs,     ['html'])
})

/*

██████╗  ██╗   ██╗ ██╗ ██╗      ██████╗
██╔══██╗ ██║   ██║ ██║ ██║      ██╔══██╗
██████╔╝ ██║   ██║ ██║ ██║      ██║  ██║
██╔══██╗ ██║   ██║ ██║ ██║      ██║  ██║
██████╔╝ ╚██████╔╝ ██║ ███████╗ ██████╔╝
╚═════╝   ╚═════╝  ╚═╝ ╚══════╝ ╚═════╝

**************************************/

gulp.task('clean',function(){
	 return del('./dist')
})


gulp.task('default', ['clean','styles','scripts','images','html','serve','watch','livereload-listen','open'])
