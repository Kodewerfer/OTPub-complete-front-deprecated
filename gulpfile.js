/***
 * By LIJIALIN *
 */

var gulp = require('gulp')
var changed = require('gulp-changed')
var sourceMap = require('gulp-sourcemaps')
var less = require('gulp-less')
var cleanCss = require('gulp-clean-css')
var named = require('vinyl-named')
var rename = require('gulp-rename')
var connect = require('gulp-connect')
// webpack
var webpack = require('webpack2-stream-watch')

// SRC and Dist Path configurations.
const IOPATH = {
  html: {
    src: ['./html/**/*.html']
  },
  less: {
    src: ['./src/*/*.less', '!./src/_less/**/*.less'], // Only compile these files.
    bundleSrc: ['./src/**/*.less', '!./src/_less/**/*.less', '!./src/*.less'], // any of these changes, compile above 'src'.
    criticalSrc: ['./src/_less/**/*.less'], // Critical components, common components and all that.
    specialSrc: ['./src/*.less'], // For odd and end files, like the 'compo.less'
    dist: './dist/'
  },
  js: {
    src: ['./src/*/*.js', './src/*.js', '!./src/userCenter/**/*.js', '!./src/courses/ng-course-watch/**/*.js'],  // except for the angular related things.    
    dist: './dist/'
  },
  ngUserCenter: { // user center spec, full on angular module(with ui-router and all that.)
    src: ['./src/userCenter/user-center.bundle.js'],
    dist: './dist/userCenter/'
  },
  ngCourseWatch: { //course watch module, for the question answer and course note section, *pseudo module*
    src: ['./src/courses/ng-course-watch/ng-watch.bundle.js'],
    dist: './dist/courses/'
  }
}

function swallowError(error) {
  // If you want details of the error in the console
  console.log(error.toString())
  this.emit('end')
}

gulp.task('less-dist', function () {
  return gulp.src(IOPATH.less.src) // only compile the entry file    
    .pipe(less())
    .on('error', swallowError)
    .pipe(cleanCss({ compatibility: 'ie8' }))
    .pipe(gulp.dest(IOPATH.less.dist))
    .on('error', swallowError)
    .pipe(connect.reload())
})

// Compile all the less files, this gonna take some times.
// 编译所有less文件，这会花费很久。
gulp.task('less-doAll', function () {
  return gulp.src(IOPATH.less.src) // only compile the entry file
    .pipe(sourceMap.init())
    .pipe(less())
    .on('error', swallowError)
    .pipe(sourceMap.write())
    .pipe(gulp.dest(IOPATH.less.dist))
    .on('error', swallowError)
    .pipe(connect.reload())
})

// compile CHANGED less files, according to the configs above.
// 只编译被更改过的less文件，具体编译内容参照上面的配置。
gulp.task('less', function () {
  return gulp.src(IOPATH.less.src) // only compile the entry file
    .pipe(changed(IOPATH.less.dist))
    .pipe(sourceMap.init())
    .pipe(less())
    .on('error', swallowError)
    .pipe(sourceMap.write())
    .pipe(gulp.dest(IOPATH.less.dist))
    .on('error', swallowError)
    .pipe(connect.reload())
})

// compile some odd and end less files. don't fits in the bigger picture, and might slow down the compile.
// 编译特例less文件，如compo.less
gulp.task('less-specials', function () {
  return gulp.src(IOPATH.less.specialSrc) // only compile the entry file
    .pipe(changed(IOPATH.less.dist))
    .pipe(sourceMap.init())
    .pipe(less())
    .on('error', swallowError)
    .pipe(sourceMap.write())
    .pipe(gulp.dest(IOPATH.less.dist))
    .on('error', swallowError)
    .pipe(connect.reload())
})

// webpacking all the valid js source files. Only changed file are compiled to save some time.
// This task come with webpack's own watch function, don't need to create watch for it anymore.
// THIS WILL NOT COMPILE ANY NG MODULES
gulp.task('webpack-generic', function () {
  var tmp = {}
  return gulp.src(IOPATH.js.src)
    .pipe(named())
    .pipe(rename(function (path) {
      tmp[path.basename] = path
    }))
    .pipe(webpack(require('./webpack.config')))
    .pipe(rename(function (path) {
      path.dirname = tmp[path.basename].dirname
    }))
    .pipe(gulp.dest(IOPATH.js.dist))
    .pipe(connect.reload())
})

// USER CENTER module
gulp.task('ng-userCenter', function () {

  return gulp.src(IOPATH.ngUserCenter.src)
    .pipe(named())
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(IOPATH.ngUserCenter.dist))
    .pipe(connect.reload())
})

// COURSE WATCH module (question and note function.)
gulp.task('ng-course-watch', function () {

  return gulp.src(IOPATH.ngCourseWatch.src)
    .pipe(named())
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(IOPATH.ngCourseWatch.dist))
    .pipe(connect.reload())
})

// html live relaod.
// HTML页面发生更改时刷新页面.
gulp.task('html', function () {
  gulp.src(IOPATH.html.src)
    .pipe(connect.reload())
})

// gulp-connect live re-load server.
gulp.task('connect', function () {
  connect.server({
    livereload: true
  })
})

gulp.task('watch', function () {
  // watch for less changes.
  gulp.watch([IOPATH.less.bundleSrc], ['less']) // Watch all the .less files, then run the less task
  gulp.watch([IOPATH.less.criticalSrc], ['less-doAll']) // Watch all the .less files, then run the less task
  gulp.watch([IOPATH.less.specialSrc, IOPATH.less.criticalSrc], ['less-specials'])

  // watch for html changes.
  gulp.watch([IOPATH.html.src], ['html'])
})

gulp.task('default', ['connect', 'watch', 'less-doAll', 'less-specials', 'webpack-generic', 'ng-userCenter', 'ng-course-watch'])
