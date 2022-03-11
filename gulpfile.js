const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat'); 
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify'); 
const imagemin = require('gulp-imagemin');
const del = require('del');
const fileInclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'dist/'  
    },
    notify: false                   
  })
}

function styles() {
  return src('app/scss/style.scss')
    .pipe(scss({outputStyle: 'compressed'})) 
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true,
    }))
    .pipe(dest('dist/css'))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src([
    //'node_modules/jquery/dist/jquery.js',  
    'app/js/main.js'
  ])
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(dest('dist/js'))
  .pipe(dest('app/js'))
  .pipe(browserSync.stream())
}

function images() {
  return src('app/images/**/*.*')
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
      plugins: [
        {removeViewBox: true},
        {cleanupIDs: false}
      ]
    })
  ]))
  .pipe(dest('dist/images'))
}

function htmlInclude () {
  return src('app/*.html')
  .pipe(fileInclude({
    prefix: '@',
    basepath: '@file'
  }))
  .pipe(dest('dist/'))
  .pipe(browserSync.stream())
}

function fonts () {
  return src('app/fonts/**')
    .pipe(dest('dist/fonts/'))
}

function build() {
  return src([
    'app/css/style.min.css',
    'app/js/main.min.js',
    'app/**/*.woff2'
  ], {base: 'app'})
  .pipe(dest('dist'))
}

function cleanDist() {
  return del('dist', '!dist/*.html')
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);  
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/fonts/*.woff2'], fonts);
  watch(['app/**/*.html'], htmlInclude);
  watch(['app/**/*.html']).on('change', browserSync.reload);
}
 

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.htmlInclude = htmlInclude;

exports.build = series(cleanDist, htmlInclude, fonts, images, build);
exports.default = parallel(styles, htmlInclude, scripts, fonts, images, browsersync, watching)