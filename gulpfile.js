// Importações
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

// Compressão de Imagens
function comprimeImg() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

// Compressão do JS
function comprimeJS() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'))
}

// Compilação do SASS
function compiladorSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

exports.watch = function() {
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compiladorSass));
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimeJS));
    gulp.watch('./source/images/*', {ignoreInitial: false}, gulp.series(comprimeImg));
}