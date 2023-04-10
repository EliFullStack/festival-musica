const { src, dest, watch, parallel } = require("gulp");

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//Images
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//compile style sheet
function css(callback) {

    src('src/scss/**/*.scss') //identify SASS file
        .pipe(plumber())
        .pipe( sass() ) //compile it
        .pipe(dest('build/css')); //store it on hard drive
    
    callback();
}

function images(callback) {
    const options = {
        optimizationLevel: 3
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(options)))
        .pipe(dest('build/img'))
    callback();
}

function webpVersion(callback) {
    const options = {
        quality:50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(options))
        .pipe(dest('build/img'))
    callback();
}

function avifVersion(callback) {
    const options = {
        quality:50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(options))
        .pipe(dest('build/img'))
    callback();
}

function dev(callback) {

    watch('src/scss/**/*.scss', css);

    callback();
}

exports.css = css;
exports.images = images;
exports.webpVersion = webpVersion;
exports.avifVersion = avifVersion;
exports.dev = parallel(images, webpVersion, avifVersion, dev);