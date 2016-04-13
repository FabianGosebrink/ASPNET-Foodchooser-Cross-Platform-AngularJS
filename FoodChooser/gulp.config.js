'use strict';

module.exports = {
    general: {
        appName: "FoodChooserApp",
        rootFolder: "app/",
        indexHtml: "app/index.html"
    },
    assets: {
        electron: "assets/electron/",
        cordova: "assets/cordova/"
    },
    sources: {
        sourceFolder: "src/",
        allAppJsFiles: [
            "./app/src/*.js",
            "./app/src/*/*.js",
            "./app/src/*/*.module.js",
            "./app/src/*/*.routes.js",
            "./app/src/*/**/*.js",
        ],
        allAppHtmlFiles: [
            "./app/src/**/*.html"
        ],
        allAppCssFiles: [
            "./bower_components/bootstrap/dist/css/bootstrap.min.css",
            "./app/css/*.css"
        ],
        allAppImgFiles: [
            "./app/img/*.*",
            "./app/img/windows/*.*"
        ],
        vendorScripts: [
            "bower_components/jquery/dist/jquery.min.js",
            "bower_components/angular/angular.js",
            "bower_components/angular-ui-router/release/angular-ui-router.js",
            "bower_components/bootstrap/dist/js/bootstrap.min.js",
            "app/vendor/useravatar.js"
        ],
        filesToCopyAsIs: [
            "app/vendor/winstore-jscompat.js"
        ]
    },
    temp: {
        electronTempFolder: ".temp/electron/",
        cordova: ".temp/cordova/",
        cordovaWww: ".temp/cordova/www/",
    },
    targets: {
        vendorScriptsMinFileName: "vendor.min.js",
        appMinFileName: "app.min.js",
        webAppOutputPath: ".webapp/",
        electronOutputPath: ".electron/",
        cordovaOutputPath: ".cordova/",
        scriptsOutputPath: ".webapp/scripts/",
        cssOutputPath: ".webapp/css/",
        minifiedTemplates: "templates.min.js"
    }
};