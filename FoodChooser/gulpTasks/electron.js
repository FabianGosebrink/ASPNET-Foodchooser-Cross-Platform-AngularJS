var gulp = require('gulp');
var runSeq = require('run-sequence');
var electron = require('gulp-atom-electron');
var symdest = require('gulp-symdest');
var taskListing = require('gulp-task-listing');
var concat = require('gulp-concat');
var path = require('path');
var del = require('del');
var taskListing = require('gulp-task-listing');
var cssMinifier = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var htmlmin = require('gulp-htmlmin');
var templateCache = require('gulp-angular-templatecache');

var buildConfig = require('../gulp.config');

gulp.task('build:electron:prod', function(done) {
    runSeq(
        'electron-clean-temp',
        'electron-copy-index-to-temp-folder',
        'electron-copy-images-to-temp-folder',
        'electron-copy-css-to-temp-folder',
        'electron-create-html-templates',
        'electron-concat-uglify-and-copy-app-scripts',
        'electron-concat-uglify-and-copy-vendor-scripts',
        'electron-inject-js-in-html',
        'electron-inject-css-in-html',
        'electron-copy-assets-to-temp-folder',
        'electron-build-win',
        done);
});

gulp.task('electron-clean-temp', function(done) {
    return del(buildConfig.temp.electronTempFolder, done);
});

gulp.task('electron-copy-index-to-temp-folder', function(done) {
    return gulp.src(buildConfig.general.indexHtml)
        .pipe(gulp.dest(buildConfig.temp.electronTempFolder));
});

gulp.task('electron-copy-images-to-temp-folder', function(done) {
    return gulp.src(buildConfig.sources.allAppImgFiles)
        .pipe(gulp.dest(buildConfig.temp.electronTempFolder + "img"));
});

gulp.task('electron-copy-css-to-temp-folder', function(done) {
    return gulp.src(buildConfig.sources.allAppCssFiles)
        .pipe(gulp.dest(buildConfig.temp.electronTempFolder + "css"));
});

gulp.task('electron-copy-assets-to-temp-folder', function(done) {
    return gulp.src(buildConfig.assets.electron + "*.*")
        .pipe(gulp.dest(buildConfig.temp.electronTempFolder));
});

gulp.task('electron-create-html-templates', function(done) {
    return gulp.src(buildConfig.sources.allAppHtmlFiles).
        pipe(htmlmin(
            {
                collapseWhitespace: true
            }))
        .pipe(templateCache(buildConfig.targets.minifiedTemplates, {
            root: buildConfig.sources.sourceFolder,
            standAlone: false,
            module: buildConfig.general.appName
        }))
        .pipe(gulp.dest(buildConfig.temp.electronTempFolder + "scripts/"));
});

gulp.task('electron-concat-uglify-and-copy-app-scripts', function(done) {
    return gulp.src(buildConfig.sources.allAppJsFiles)
        .pipe(concat(buildConfig.targets.appMinFileName))
        .pipe(uglify())
        .pipe(gulp.dest(buildConfig.temp.electronTempFolder + "scripts/"));
});

gulp.task('electron-concat-uglify-and-copy-vendor-scripts', function(done) {
    return gulp.src(buildConfig.sources.vendorScripts)
        .pipe(concat(buildConfig.targets.vendorScriptsMinFileName))
        .pipe(uglify())
        .pipe(gulp.dest(buildConfig.temp.electronTempFolder + "scripts/"));
});

gulp.task('electron-inject-js-in-html', function(done) {
    var target = gulp.src(
        path.join(buildConfig.temp.electronTempFolder, "index.html"));

    var vendorJs = path.join(buildConfig.temp.electronTempFolder, "scripts/",
        buildConfig.targets.vendorScriptsMinFileName);

    var appJs = path.join(buildConfig.temp.electronTempFolder, "scripts/",
        buildConfig.targets.appMinFileName);

    var templates = path.join(buildConfig.temp.electronTempFolder, "scripts/",
        buildConfig.targets.minifiedTemplates);

    var sources = gulp.src([vendorJs, appJs, templates], {
        read: false
    });

    return target.pipe(inject(sources, {
        ignorePath: buildConfig.temp.electronTempFolder,
        addRootSlash: false
    }))
        .pipe(gulp.dest(buildConfig.temp.electronTempFolder));
});

gulp.task('electron-inject-css-in-html', function(done) {
    var target = gulp.src(
        path.join(buildConfig.temp.electronTempFolder, "index.html"));

    var sources = gulp.src([buildConfig.temp.electronTempFolder + "css/*.css"], {
        read: false
    });

    return target.pipe(inject(sources, {
        ignorePath: buildConfig.temp.electronTempFolder,
        addRootSlash: false
    }))
        .pipe(gulp.dest(buildConfig.temp.electronTempFolder));
});

gulp.task('electron-build-win', function(done) {
    return gulp.src(path.join(buildConfig.temp.electronTempFolder, '**', '*'))
        .pipe(electron({
            version: '0.36.9',
            platform: 'win32',
            arch: 'x64',
            companyName: 'Offering Solutions',
            linuxExecutableName: 'ASPNETCoreAngularJS2Example',
        }))
        .pipe(symdest(buildConfig.targets.electronOutputPath + 'win'));
});

