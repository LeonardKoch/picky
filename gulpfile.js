const gulp = require('gulp');
const gutil = require('gulp-util');
const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const babelify = require('babelify');

const createBundle = (appBundler) => {
    console.log('Building...');

    return appBundler
        .transform('babelify')// Get settings from ".babelrc"
        .bundle()
        .on('error', gutil.log)
        .pipe(source('picky.js'))
        .pipe(gulp.dest('./dist'));
};

gulp.task('default', () => {
    const options = Object.assign({}, watchify.args, {
        entries: './index.js',
        debug: true
    });

    const appBundler = watchify(browserify(options));

    appBundler.on('update', () => createBundle(appBundler));
    createBundle(appBundler);
});