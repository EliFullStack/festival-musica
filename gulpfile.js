const { src, dest, watch } = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//compile style sheet
function css(callback) {

    src('src/scss/**/*.scss') //identify SASS file
        .pipe(plumber())
        .pipe( sass() ) //compile it
        .pipe(dest('build/css')); //store it on hard drive
    
    callback();
}

function dev(callback) {

    watch('src/scss/**/*.scss', css);

    callback();
}

exports.css = css;
exports.dev = dev;