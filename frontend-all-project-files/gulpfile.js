var gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    gulpif = require('gulp-if'),
    del = require('del'),
    jmq = require('gulp-join-media-queries'),
    argv = require('minimist')(process.argv),
    _CONFIG = {};

if (argv.env && argv.env === 'production') {
    _CONFIG = {
        sourcemaps: false,
        cleancss: {
            inline: ['local'],
            rebase: false,
            processImport: true,
            level: 2
        },
        uglify: true
    };
} else {
    _CONFIG = {
        sourcemaps: true,
        cleancss: {
            inline: ['local'],
            rebase: false,
            processImport: true,
            level: 2,
            format: 'beautify'
        },
        uglify: false
    };
}
var destinyPath = './assets/',
    Sass_SourceFiles = './src/sass/main.scss',
    Sass_watchFiles = ['./src/sass/**/*.scss'],
    JavaScript_SourceFiles = [
        './node_modules/swiper/swiper-bundle.js',
        './src/js/main.js',
    ],
    JavaScript_watchFiles = ['./src/js/**/*.js'];



//-- Generate layout.css
gulp.task('styles', function() {
    return gulp
        .src(Sass_SourceFiles)
        .pipe(gulpif(_CONFIG.sourcemaps, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(jmq())
        .pipe(cleanCSS(_CONFIG.cleancss))
        .pipe(gulpif(_CONFIG.sourcemaps, sourcemaps.write('.')))
        .pipe(gulp.dest(destinyPath));
});

gulp.task('scripts', function() {
    return gulp
        .src(JavaScript_SourceFiles)
        .pipe(gulpif(_CONFIG.sourcemaps, sourcemaps.init()))
        .pipe(concat('main.js'))
        .pipe(gulpif(_CONFIG.uglify, uglify()))
        .pipe(gulpif(_CONFIG.sourcemaps, sourcemaps.write('.')))
        .pipe(gulp.dest(destinyPath));
});

gulp.task('clean-assets', function() {
    return del([destinyPath + '*.map', destinyPath + '*.js', destinyPath + '*.css']);
});

//-- Watch
gulp.task('watch', function() {
    // Watch .scss files
    var styleWatcher = gulp.watch(Sass_watchFiles, gulp.parallel('styles'));
    styleWatcher.on('change', function(path, stats) {
        console.log('[STYLE] File ' + path + ' was changed');
    });
    var scriptsWatcher = gulp.watch(JavaScript_watchFiles, gulp.parallel('scripts'));
    scriptsWatcher.on('change', function(path, stats) {
        console.log('[SCRIPTS] File ' + path + ' was changed');
    });

});
gulp.task('build', gulp.series('clean-assets', 'styles', 'scripts'));
//
gulp.task(
    'dev-watch',
    gulp.series('clean-assets', 'styles', 'scripts', 'watch', function(done) {
        // do more stuff
        done();
    })
);
