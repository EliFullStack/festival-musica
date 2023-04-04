const { src, dest, watch } = require("gulp");
const sass = require('gulp-sass')(require('sass'));

//compile style sheet
function css(callback) {

    src('src/scss/app.scss') //identify SASS file
        .pipe( sass() ) //compile it
        .pipe(dest('build/css')); //store it on hard drive
    
    callback();
}

function dev(callback) {

    watch('src/scss/app.scss', css);

    callback();
}

exports.css = css;
exports.dev = dev;