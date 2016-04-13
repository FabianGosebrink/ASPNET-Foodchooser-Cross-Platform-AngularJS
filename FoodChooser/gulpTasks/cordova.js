var gulp = require('gulp');
var runSeq = require('run-sequence');
var electron = require('gulp-atom-electron');
var symdest = require('gulp-symdest');
var taskListing = require('gulp-task-listing');
var concat = require('gulp-concat');
var path = require('path');
var sh = require('shelljs');
var del = require('del');
var cssMinifier = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var htmlmin = require('gulp-htmlmin');
var templateCache = require('gulp-angular-templatecache');

var buildConfig = require('../gulp.config');

gulp.task('build:apps', function(done) {
    runSeq(
        'cordova-clean-temp',
        'cordova-copy-config-to-temp',
        'cordova-copy-index-to-temp-folder',
        'cordova-copy-images-to-temp-folder',
        'cordova-copy-filesAsIs-to-temp-folder',
        'cordova-copy-css-to-temp-folder',
        'cordova-create-html-templates',
        'cordova-concat-uglify-and-copy-vendor-scripts',
        'cordova-concat-uglify-and-copy-app-scripts',
        'cordova-inject-js-in-html',
        'cordova-inject-css-in-html',
        // 'cordova-add-plugins',
        'cordova-build-windows',
        //'cordova-build-android',
        'cordova-copy-to-dist',
        done);
});

gulp.task('cordova-clean-temp', function(done) {
    return del(buildConfig.temp.cordova, done);
});

gulp.task('cordova-copy-config-to-temp', function() {
    var configFile = path.join(buildConfig.assets.cordova, "config.xml");

    return gulp.src([
        configFile
    ])
        .pipe(gulp.dest(buildConfig.temp.cordova));
});

gulp.task('cordova-copy-index-to-temp-folder', function(done) {
    return gulp.src(buildConfig.general.indexHtml)
        .pipe(gulp.dest(buildConfig.temp.cordovaWww));
});

gulp.task('cordova-copy-filesAsIs-to-temp-folder', function(done) {
    return gulp.src(buildConfig.sources.filesToCopyAsIs)
        .pipe(gulp.dest(buildConfig.temp.cordovaWww + "scripts/"));
});

gulp.task('cordova-copy-images-to-temp-folder', function(done) {
    return gulp.src(buildConfig.sources.allAppImgFiles)
        .pipe(gulp.dest(buildConfig.temp.cordovaWww + "img"));
});

gulp.task('cordova-copy-css-to-temp-folder', function(done) {
    return gulp.src(buildConfig.sources.allAppCssFiles)
        .pipe(gulp.dest(buildConfig.temp.cordovaWww + "css"));
});

gulp.task('cordova-create-html-templates', function(done) {
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
        .pipe(gulp.dest(buildConfig.temp.cordovaWww + "scripts/"));
});

gulp.task('cordova-concat-uglify-and-copy-vendor-scripts', function(done) {
    return gulp.src(buildConfig.sources.vendorScripts)
        .pipe(concat(buildConfig.targets.vendorScriptsMinFileName))
        .pipe(uglify())
        .pipe(gulp.dest(buildConfig.temp.cordovaWww + "scripts/"));
});

gulp.task('cordova-concat-uglify-and-copy-app-scripts', function(done) {
    return gulp.src(buildConfig.sources.allAppJsFiles)
        .pipe(concat(buildConfig.targets.appMinFileName))
        .pipe(uglify())
        .pipe(gulp.dest(buildConfig.temp.cordovaWww + "scripts/"));
});

gulp.task('cordova-inject-js-in-html', function(done) {
    var target = gulp.src(
        path.join(buildConfig.temp.cordovaWww, "index.html"));

    var vendorJs = path.join(buildConfig.temp.cordovaWww, "scripts/",
        buildConfig.targets.vendorScriptsMinFileName);

    var appJs = path.join(buildConfig.temp.cordovaWww, "scripts/",
        buildConfig.targets.appMinFileName);

    var templates = path.join(buildConfig.temp.cordovaWww, "scripts/",
        buildConfig.targets.minifiedTemplates);

    var explicitVendorScript = path.join(buildConfig.temp.cordovaWww,
        "scripts/",
        "winstore-jscompat.js");

    var arrayToCopy = buildConfig.sources.filesToCopyAsIs
        .concat(vendorJs, appJs, templates);

    var sources = gulp.src([explicitVendorScript, vendorJs, appJs, templates], {
        read: false
    });

    return target.pipe(inject(sources, {
        ignorePath: buildConfig.temp.cordovaWww,
        addRootSlash: false
    }))
        .pipe(gulp.dest(buildConfig.temp.cordovaWww));
});

gulp.task('cordova-inject-css-in-html', function(done) {
    var target = gulp.src(
        path.join(buildConfig.temp.cordovaWww, "index.html"));

    var sources = gulp.src([buildConfig.temp.cordovaWww + "css/*.css"], {
        read: false
    });

    return target.pipe(inject(sources, {
        ignorePath: buildConfig.temp.cordovaWww,
        addRootSlash: false
    }))
        .pipe(gulp.dest(buildConfig.temp.cordovaWww));
});



gulp.task('cordova-add-plugins', function(done) {
    sh.cd(buildConfig.temp.cordova);
    sh.exec('cordova plugin add https://github.com/apache/cordova-plugin-splashscreen.git');
    sh.exec('cordova plugin add org.apache.cordova.camera');
    sh.cd('../..');
    done();
});

gulp.task('cordova-build-windows', function(done) {
    sh.cd(buildConfig.temp.cordova);
    sh.exec('cordova platform add windows');
    sh.exec('cordova build windows');
    sh.cd('../..');
    done();
});

gulp.task('cordova-build-android', function(done) {
    sh.cd(buildConfig.temp.cordova);
    sh.exec('cordova platform add android');
    sh.exec('cordova build android');
    sh.cd('../..');
    done();
});

gulp.task('cordova-copy-to-dist', function() {
    var sourceFolder = path.join(buildConfig.temp.cordova, 'platforms', "**", '*.*');
    return gulp.src([sourceFolder])
        .pipe(gulp.dest(buildConfig.targets.cordovaOutputPath));
});