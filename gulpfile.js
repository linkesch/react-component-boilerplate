var gulp = require('gulp');
var loadPlugins = require('gulp-load-plugins');
var path = require('path');
var del = require('del');
var sass = require('gulp-sass');
var manifest = require('./package.json');
var Server = require('karma').Server;
var webpack = require('webpack-stream');
var livereload = require('gulp-livereload');
var babel = require('gulp-babel');

// Load all of our Gulp plugins
var $ = loadPlugins();

// Gather the library data from `package.json`
var mainFile = manifest.main;
var destinationFolder = 'dist';
var exportFileName = manifest.name;

function cleanDistJs(done) {
    del([path.join(destinationFolder, 'js')]).then(function () { done(); });
}

function cleanLib(done) {
    del(['lib']).then(function () { done(); });
}

function cleanDistCss(done) {
    del([path.join(destinationFolder, 'css')]).then(function () { done(); });
}

// Lint a set of files
function lint(files) {
    return gulp.src(files)
        .pipe($.plumber())
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failOnError())
        // .pipe($.jscs())
        .pipe($.jscs.reporter())
        .pipe($.jscs.reporter('fail'));
}

function lintSrc() {
    return lint('src/**/*.js');
}

function lintTest() {
    return lint('test/**/*.js');
}

function karma(done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function () {
        done();
    }).start();
}

function buildDist() {
    return gulp.src(path.join('src/js/index.js'))
        .pipe(webpack(require('./webpack.config.js')))
        .pipe($.rename(exportFileName + '.js'))
        .pipe(gulp.dest(path.join(destinationFolder, 'js')))
        .pipe($.rename(exportFileName + '.min.js'))
        .pipe($.sourcemaps.init({ loadMaps: true }))
        .pipe($.uglify())
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(path.join(destinationFolder, 'js')))
        .pipe(livereload());
}

function buildLib() {
    return gulp.src('src/js/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('lib'));
}

var watchFiles = ['src/js/*', 'package.json', '**/.eslintrc', '.jscsrc'];

function watch() {
    livereload.listen();
    gulp.watch(watchFiles, ['js']);
    gulp.watch(['src/sass/*'], ['css']);
}

function css() {
    return gulp.src(path.join('src/sass', '*.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe($.sourcemaps.init({ loadMaps: true }))
        .pipe($.rename(exportFileName + '.css'))
        .pipe(gulp.dest(path.join(destinationFolder, 'css')))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe($.rename(exportFileName + '.min.css'))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(path.join(destinationFolder, 'css')))
        .pipe(livereload());
}

// Remove the built files
gulp.task('clean', ['clean-js', 'clean-css']);
gulp.task('clean-lib', cleanLib);
gulp.task('clean-js', ['clean-lib'], cleanDistJs);
gulp.task('clean-css', cleanDistCss);

// Lint our source code
gulp.task('lint-src', lintSrc);
gulp.task('lint-test', lintTest);
gulp.task('lint', ['lint-src', 'lint-test']);

// Test
gulp.task('karma', karma);
gulp.task('test', ['lint', 'karma']);

// Build JS
gulp.task('lib', ['test', 'clean-js'], buildLib);
gulp.task('js', ['lib'], buildDist);

// Build CSS
gulp.task('css', ['clean-css'], css);

// Run the headless unit tests as you make changes.
gulp.task('watch', watch);

// Build two versions of the library
gulp.task('build', ['css', 'js']);

// An alias of test
gulp.task('default', ['build']);
