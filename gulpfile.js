'use strict';

var gulp = require('gulp');
var es = require('event-stream');
var paths = require('./paths');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var rimraf = require('rimraf');
var os = require('os');
var replace = require('gulp-replace');
var angularTemplatecache = require('gulp-angular-templatecache');
var htmlreplace = require('gulp-html-replace');
var cordova = require('gulp-cordovacli');

function buildVersionString() {
        var jenkinsTag = process.env.BUILD_TAG;
        if (!jenkinsTag || jenkinsTag === '') {
            var hoje = new Date();
            var day = ('00' + hoje.getUTCDate()).slice(-2);
            var month = ('00' + (hoje.getUTCMonth() + 1)).slice(-2);
            var year = ('0000' + hoje.getUTCFullYear()).slice(-4);
            var hour = ('00' + hoje.getUTCHours()).slice(-2);
            var minute = ('00' + hoje.getUTCMinutes()).slice(-2);
            var second = ('00' + hoje.getUTCSeconds()).slice(-2);


            jenkinsTag = os.hostname() + '-UTC-' + year + '-' + month + '-' + day + '_' + hour + ':' + minute + ':' + second;
        }
        return jenkinsTag;
    }


gulp.task('copyImagesNoMin', function() {
    gulp.src(paths.imageSrc)
        .pipe(gulp.dest(paths.imageDestinationDir));
});

gulp.task('watchSTYLE', function() {
    gulp.watch(paths.appcss, ['AppCSS']);
    gulp.watch(paths.appsass, ['AppCSS']);
    gulp.watch(paths.vendorcss, ['VendorCSS']);
    gulp.watch(paths.vendorsass, ['VendorCSS']);
    // gulp.watch(paths.images, ['ProcessaStilosParaDesenvolvimento']);
});

gulp.task('clean', function(cb) {
    rimraf.sync(paths.build);
    cb();
});

//combine all template files of the app into a js file and put into cache.
gulp.task('templates', function() {
    gulp.src(paths.templates)
        .pipe(angularTemplatecache('templates.js', {
            standalone: true
        }))
        .pipe(gulp.dest(paths.build));
});


gulp.task('scripts-production', function() {
    var versionNumber = buildVersionString();
    //se houver o "actual", uese ele. Senão será o production.
    console.log('paths.envConfigFiles.actual: ' + paths.envConfigFiles.actual);
    var envFilePath = paths.envConfigFiles.actual || paths.envConfigFiles.production;

    return es.merge(
        gulp.src(envFilePath)
        .pipe(replace('<!--BuildVersion-->', versionNumber)),
        gulp.src(paths.scripts))

    // .pipe(plugins.jshint())
    // .pipe(plugins.jshint.reporter('default'))
    //        .pipe(plugins.stripDebug())
    //    .pipe(plugins.ngmin())
    //    .pipe(plugins.uglify({mangle: false}))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(paths.build));
});

gulp.task('vendorJS', function() {
    //concatenate vendor JS files
    gulp.src(paths.vendorJS)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest(paths.build));

    // //TODO: Por enquanto trata ui-grid separado.
    // gulp.src(paths.uigrid)
    //     .pipe(plugins.concat('debug.js'))
    //     .pipe(gulp.dest(paths.build));

});


gulp.task('AppCSS', function() {

    var sassFiles = gulp.src(paths.appsass);
    var cssFiles = gulp.src(paths.appcss);
    return es.merge(
            sassFiles.pipe(sass()),
            cssFiles)
        //        .pipe(plugins.changed(paths.build))
        .pipe(concat('app.css'))
        // .pipe(plugins.autoprefixer('last 2 versions'))
        // .pipe(minifyCSS())

    .pipe(gulp.dest(paths.build));
});


gulp.task('VendorCSS', ['CopiaWebFonts'], function() {

    var sassFiles = gulp.src(paths.vendorsass);
    var cssFiles = gulp.src(paths.vendorcss);

    return es.merge(
            sassFiles.pipe(sass()),
            cssFiles)
        // .pipe(plugins.changed(paths.build))
        .pipe(concat('lib.css'))
        // .pipe(minifyCSS())

    .pipe(gulp.dest(paths.build));
});

gulp.task('copyMapFiles', function() {
    gulp.src(paths.vendorMapFiles)
        .pipe(gulp.dest(paths.build));
});

gulp.task('CopiaWebFonts', function() {
    return gulp.src(paths.webFonts)
        .pipe(gulp.dest(paths.buildfonts));
});

// gulp.task('CopiaIonicWebFonts', function() {
//     return gulp.src(paths.ionicWebFonts)
//         .pipe(gulp.dest(paths.ionicbuildfonts));
// });

//TODO: por hora não estamos usando o uiGrid
gulp.task('CopiaUIGridWebFonts', function() {
        //ui-grid fonts need to be at same level as lib... WEEAAKKK!
    gulp.src(paths.uigridfonts)
        .pipe(gulp.dest(paths.uigridbuildfonts));

    });

gulp.task('copy-index', function() {
    //Aqui, vamos remover um pedaco do index.html e substituir com o trecho abaixo.
    //perceba que a ORDEM dos .js e importante. O lib precisa ir primeiro, pois traz todas as dependencias (angular, etc.)
    //em seguida vem o app que traz nossas definicoes.
    //Por fim, vem os templates que apenas carrega os "partials" em funcoes js.

    var prodJS = [
        'lib.js',
        // 'debug.js',
        'app.js',
        'templates.js'
    ];
    var prodCSS = [
        'lib.css',
        'app.css'
    ];

    //Substitui trechos de HTML para refletir as versoes de producao das bibliotecas JS e CSS.
    gulp.src(paths.index)
        .pipe(htmlreplace({
            js: prodJS,
            css: prodCSS
        }))
        .pipe(gulp.dest(paths.build));
});


gulp.task('connect-dev', function() {
    connect.server({
        root: ['.', 'src/app', 'src/build'],
        port: 9090,
        livereload: true
    });
});
// gulp.task('connect-dev', function() {
//     connect.server({
//         root: [__dirname, 'app', 'build'],
//         port: 9090,
//         livereload: true
//     });
// });

gulp.task('connect-prod', function() {
    connect.server({
        root: ['build'],
        port: 9000,
        livereload: true
    });
});

gulp.task('connect-prod-debugtemplates', function() {
    connect.server({
        root: ['.', 'build', 'app'],
        port: 9000,
        livereload: true
    });
});

gulp.task('clean-cordova', function(cb) {
    rimraf(paths.cordovadeploy, cb);
});
gulp.task('copy-files-cordova', ['clean-cordova', 'clean', 'scripts-production', 'templates', 'VendorCSS', 'AppCSS', 'copyImagesNoMin', 'CopiaWebFonts', 'copyMapFiles', 'copy-index', 'vendorJS'], function() {
    gulp.src(paths.build + '/**/*')
        .pipe(gulp.dest(paths.cordovadeploy));
});

gulp.task('cordova-init', function() {
    gulp.src('./cordovagulp.json')
    .pipe(cordova());
});

gulp.task('default', ['copy-files-cordova']);
gulp.task('genNoServe', ['clean', 'scripts-production', 'templates', 'VendorCSS', 'AppCSS', 'copyImagesNoMin', 'CopiaWebFonts', 'copyMapFiles', 'copy-index', 'vendorJS']);
gulp.task('desenv', ['copyImagesNoMin', 'CopiaWebFonts', 'VendorCSS', 'AppCSS', 'watchSTYLE']);
gulp.task('serve-desenv', ['desenv', 'connect-dev']);
