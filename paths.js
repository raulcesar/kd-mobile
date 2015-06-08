/**
 * Created by raul on 04/06/14.
 */

var paths = {
    index: ['./src/app/index.html', './src/app/test.html'],

    scripts: [
        '!./src/app/**/*_test.js',
        '!./src/app/**/*_spec.js',
        '!./src/app/**/*Spec.js',
        '!./src/app/templates-dummy.js',
        '!./src/app/cordova.js',
        '!./src/app/env/**/*',
        '!./src/app/pocs/**/*',
        '!./src/app/**/e2e/**/*',
        '!./src/app/**/*_mock*.js',


        './src/app/**/*.js'
    ],

    testes: {
        e2e: './src/app/**/e2e/**/*.js',
        reports: './src/testReports'
    },

    envConfigFiles: {
        production: ['./src/app/env/*production.js'],
        development: ['./src/app/env/*dev.js']
    },

    templates: ['!./src/app/index.html', './src/app/**/*.html'],


    vendorcss: [
        './src/app/assets/style/external/**/*.css',
        './bower_components/famous-angular/dist/famous-angular.css',
        './bower_components/ionic/css/ionic.min.css'
    ],
    vendorsass: [
        './src/app/assets/style/external/**/*.scss'
        // './bower_components/font-awesome/scss/*.scss'
        // ,
        // './bower_components/foundation/scss/*.scss'
    ],
    webFonts: [
    './src/app/assets/fonts/**/*.*'
    ],


    appcss: ['./src/app/assets/style/app/**/*.css'],
    appsass: ['./src/app/assets/style/app/**/*.scss'],



    vendorJS: [
        './bower_components/lodash/lodash.js',
        './bower_components/angular/angular.js',
        './bower_components/angular-animate/angular-animate.js',
        './bower_components/angular-sanitize/angular-sanitize.js',
        './bower_components/angular-ui-router/release/angular-ui-router.js',
        './bower_components/restangular/dist/restangular.js',
        './bower_components/jquery/dist/jquery.js',
        './bower_components/famous/dist/famous-global.js',
        './bower_components/famous-angular/dist/famous-angular.js',
        './bower_components/angular-foundation/mm-foundation-tpls.js',
        './bower_components/ionic/js/ionic.js',
        './bower_components/ionic/js/ionic-angular.js',
        './bower_components/angular-local-storage/dist/angular-local-storage.js',

        // './bower_components/angular/angular.min.js',
        // './bower_components/angular-ui-router/release/angular-ui-router.min.js',
        // './bower_components/lodash/dist/lodash.min.js',
        // './bower_components/restangular/dist/restangular.min.js',
        // './bower_components/jquery/dist/jquery.min.js',
        // './bower_components/famous/dist/famous-global.min.js',
        // './bower_components/famous-angular/dist/famous-angular.min.js',
        // './bower_components/angular-foundation/mm-foundation-tpls.min.js'

    ],
    vendorMapFiles: [
        './bower_components/angular/angular.min.js.map'
    ],

    build: './build',
    cordovadeploy: './www',
    imageSrc: ['./src/app/assets/images/**/*.*'],
    mockFiles: ['./src/app/mockdata/**/*.json']
};
paths.imageDestinationDir = paths.build + '/assets/images';
paths.buildfonts = paths.build + '/assets/fonts';
paths.ionicbuildfonts = paths.build + '/fonts';


module.exports = paths;
