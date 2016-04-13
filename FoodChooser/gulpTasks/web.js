var gulp = require('gulp');
var runSeq = require('run-sequence');
var del = require('del');
var taskListing = require('gulp-task-listing');
var concat = require('gulp-concat');
var path = require('path');
var cssMinifier = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var htmlmin = require('gulp-htmlmin');
var templateCache = require('gulp-angular-templatecache');

var buildConfig = require('../gulp.config');

gulp.task('build:web:prod', function(done) {
    runSeq(
        'web-clean-webapp',
        'web-copy-index-to-webapp-folder',
        'web-copy-images-to-webapp-folder',
        'web-copy-css-to-webapp-folder',
        'web-create-html-templates',
        'web-concat-uglify-and-copy-vendor-scripts',
        'web-concat-uglify-and-copy-app-scripts',
        'web-inject-js-in-html',
        'web-inject-css-in-html',
        'web-copy-webapp-folder-to-dist',
        done);
});

gulp.task('build:web:dev', function(done) {
    runSeq(
        'web-clean-webapp',
        'web-copy-index-to-webapp-folder',
        'web-copy-images-to-webapp-folder',
        'web-copy-css-to-webapp-folder',
        'web-copy-vendor-scripts',
        'web-copy-app',
        'web-inject-js-in-html-dev',
        'web-inject-css-in-html-dev',
        done);
});

gulp.task('web-clean-webapp', function(done) {
    del(buildConfig.targets.webAppOutputPath).then(function() {
        done();
    });
});

gulp.task('web-copy-webapp-folder-to-dist', function(done) {
    return gulp.src(path.join(buildConfig.targets.webAppOutputPath, "**/*"))
        .pipe(gulp.dest("webapp"));
});

gulp.task('web-copy-index-to-webapp-folder', function(done) {
    return gulp.src(buildConfig.general.indexHtml)
        .pipe(gulp.dest(buildConfig.targets.webAppOutputPath));
});

gulp.task('web-copy-images-to-webapp-folder', function(done) {
    return gulp.src(buildConfig.sources.allAppImgFiles)
        .pipe(gulp.dest(buildConfig.targets.webAppOutputPath + "img"));
});

gulp.task('web-copy-css-to-webapp-folder', function(done) {
    return gulp.src(buildConfig.sources.allAppCssFiles)
        .pipe(gulp.dest(buildConfig.targets.webAppOutputPath + "css"));
});

gulp.task('web-concat-uglify-and-copy-vendor-scripts', function(done) {
    return gulp.src(buildConfig.sources.vendorScripts)
        .pipe(concat(buildConfig.targets.vendorScriptsMinFileName))
        .pipe(uglify())
        .pipe(gulp.dest(buildConfig.targets.scriptsOutputPath));
});

gulp.task('web-copy-vendor-scripts', function(done) {
    return gulp.src(buildConfig.sources.vendorScripts)
        .pipe(gulp.dest(buildConfig.targets.scriptsOutputPath));
});

gulp.task('web-concat-uglify-and-copy-app-scripts', function(done) {
    return gulp.src(buildConfig.sources.allAppJsFiles)
        .pipe(concat(buildConfig.targets.appMinFileName))
        .pipe(uglify())
        .pipe(gulp.dest(buildConfig.targets.scriptsOutputPath));
});

gulp.task('web-copy-app', function(done) {
    var allSources = buildConfig.sources.allAppJsFiles.concat(buildConfig.sources.allAppHtmlFiles);

    return gulp.src(allSources)
        .pipe(gulp.dest(buildConfig.targets.webAppOutputPath + "src"));
});

gulp.task('web-create-html-templates', function(done) {
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
        .pipe(gulp.dest(buildConfig.targets.scriptsOutputPath));
});

gulp.task('web-inject-js-in-html', function(done) {
    var target = gulp.src(
        path.join(buildConfig.targets.webAppOutputPath, "index.html"));

    var vendorJs = path.join(buildConfig.targets.scriptsOutputPath,
        buildConfig.targets.vendorScriptsMinFileName);

    var appJs = path.join(buildConfig.targets.scriptsOutputPath,
        buildConfig.targets.appMinFileName);

    var templates = path.join(buildConfig.targets.scriptsOutputPath,
        buildConfig.targets.minifiedTemplates);

    var sources = gulp.src([vendorJs, appJs, templates], {
        read: false
    });

    return target.pipe(inject(sources, {
        ignorePath: buildConfig.targets.webAppOutputPath,
        addRootSlash: false
    }))
        .pipe(gulp.dest(buildConfig.targets.webAppOutputPath));
});

gulp.task('web-inject-js-in-html-dev', function(done) {
    var target = gulp.src(
        path.join(buildConfig.targets.webAppOutputPath, "index.html"));

    var allSources = [
        buildConfig.targets.scriptsOutputPath + "jquery.min.js",
        buildConfig.targets.scriptsOutputPath + "bootstrap.min.js",
        buildConfig.targets.scriptsOutputPath + "angular.js",
        buildConfig.targets.scriptsOutputPath + "angular-ui-router.js",
        buildConfig.targets.scriptsOutputPath + "useravatar.js",
    ]
        .concat([
            buildConfig.targets.webAppOutputPath + "src/*.js",
            buildConfig.targets.webAppOutputPath + "src/*/*.js",
            buildConfig.targets.webAppOutputPath + "src/*/*.module.js",
            buildConfig.targets.webAppOutputPath + "src/*/*.routes.js",
            buildConfig.targets.webAppOutputPath + "src/*/**/*.js",
        ]);

    var sources = gulp.src(allSources, {
        read: false
    });

    return target.pipe(inject(sources, {
        ignorePath: buildConfig.targets.webAppOutputPath,
        addRootSlash: false
    }))
        .pipe(gulp.dest(buildConfig.targets.webAppOutputPath));
});



gulp.task('web-inject-css-in-html', function(done) {
    var target = gulp.src(
        path.join(buildConfig.targets.webAppOutputPath, "index.html"));

    var sources = gulp.src([buildConfig.targets.cssOutputPath + "*.css"], {
        read: false
    });

    return target.pipe(inject(sources, {
        ignorePath: buildConfig.targets.webAppOutputPath,
        addRootSlash: false
    }))
        .pipe(gulp.dest(buildConfig.targets.webAppOutputPath));
});

gulp.task('web-inject-css-in-html-dev', function(done) {
    var target = gulp.src(
        path.join(buildConfig.targets.webAppOutputPath, "index.html"));

    var sources = gulp.src([
        buildConfig.targets.cssOutputPath + "bootstrap.min.css",
        buildConfig.targets.cssOutputPath + "avatars.css",
        buildConfig.targets.cssOutputPath + "custom.css",
    ], {
            read: false
        });

    return target.pipe(inject(sources, {
        ignorePath: buildConfig.targets.webAppOutputPath,
        addRootSlash: false
    }))
        .pipe(gulp.dest(buildConfig.targets.webAppOutputPath));
});