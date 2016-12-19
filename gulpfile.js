
// require modules
const gulp         = require('gulp');
const htmlmin      = require('gulp-htmlmin');
const browserSync  = require('browser-sync').create();
const scss         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber      = require('gulp-plumber');
const uglify       = require('gulp-uglify');
const del          = require('del');
const imagemin     = require('gulp-imagemin');
const runSequence  = require('run-sequence');
const ftp          = require('vinyl-ftp');
const include      = require("gulp-include");
const rename       = require("gulp-rename");
const spritesmith  = require("gulp.spritesmith");
const sourcemaps   = require('gulp-sourcemaps');
const filter       = require('gulp-filter');

// sprite
gulp.task('sprite', function() {
    var spriteData =
        gulp.src('src/sprites/**/*.*')
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: '_sprite.scss',
                algorithm: 'binary-tree',
                padding: 10
            }));
    spriteData.img.pipe(gulp.dest('src/images'));
    spriteData.css.pipe(gulp.dest('src/scss/base'));
});

// html
gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'));
});

// styles
gulp.task('style', function() {
    return gulp.src('src/scss/main.scss')
        .pipe(plumber())
        .pipe(autoprefixer({
          browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.init())
        .pipe(scss.sync())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

// scripts
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(include())
        .pipe(uglify())
        .pipe(rename({
         suffix: ".min",
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/js/min'));
});

// serve
gulp.task('serve', function() {
    browserSync.init({
        server: "src/"
    });
});

// clean
gulp.task("clean", function() {
    return del("dist/");
});

// copy
gulp.task('copy', function() {
    return gulp.src(["src/css/**/*.css", "src/images/*", "src/js/min/*.js"], {
            base: "src"
        })
        .pipe(gulp.dest("dist/"));
});

// images
gulp.task('img', function() {
    return gulp.src('src/images/*', {
            base: 'src'
        })
        .pipe(imagemin())
        .pipe(gulp.dest('dist/'));
});

// upload to ftp
gulp.task('upload', function() {
    var conn = ftp.create({
        host: 's8.mydevil.net',
        user: 'f1372_andrzej',
        password: 'Andrzej11151'
    });
    return gulp.src('dist/**/*').pipe(conn.dest('/public_html/'));
});

// build project
gulp.task('build', function(cb) {
    runSequence('sprite', 'img', 'clean', 'html', 'copy', 'scripts', 'upload', cb);
});

// gulp watch
gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', ['style']);
    gulp.watch(['src/js/modules/*.js', 'src/js/main.js', 'src/*.html'], ['scripts']).on('change', browserSync.reload);
});

// gulp default
gulp.task('default', ['style', 'scripts', 'serve', 'watch']);
