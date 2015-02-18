/**
 * Created by raul on 04/06/14.
 */

var paths = {
    index: ['./app/index.html', './app/test.html'],

    scripts: [
        '!./app/**/*_test.js',
        '!./app/**/*_spec.js',
        '!./app/**/*Spec.js',
        '!./app/templates-dummy.js',
        '!./app/env/**/*',
        '!./app/pocs/**/*',
        '!./app/**/e2e/**/*',
        '!./app/**/*_mock*.js',


        './app/**/*.js'
    ],

    testes: {
        e2e: './app/**/e2e/**/*.js',
        reports: './testReports'
    },

    envConfigFiles: {
        production: ['./app/env/*production.js'],
        development: ['./app/env/*dev.js']
    },

    templates: ['!./app/index.html', './app/**/*.html'],


    vendorcss: [
        './app/assets/style/external/**/*.css',
        './bower_components/famous-angular/dist/famous-angular.css',
        './bower_components/ionic/css/ionic.min.css'


    ],
    vendorsass: [
        './app/assets/style/external/**/*.scss'
        // './bower_components/font-awesome/scss/*.scss'
        // ,
        // './bower_components/foundation/scss/*.scss'
    ],
    webFonts: [
    './app/assets/fonts/**/*.*'
    ],


    appcss: ['./app/assets/style/app/**/*.css'],
    appsass: ['./app/assets/style/app/**/*.scss'],



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
        './bower_components/ionic/js/ionic-angular.js'

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
    cordovadeploy: '../www',
    imageSrc: ['./app/assets/images/*.*'],
    mockFiles: ['./app/mockdata/**/*.json']
};
paths.imageDestinationDir = paths.build + '/assets/images';
paths.buildfonts = paths.build + '/assets/fonts';
paths.ionicbuildfonts = paths.build + '/fonts';

//The uigrid needs special consideration.
//paths.uigridfonts = [
//  './app/assets/style/external/ui-grid/*.eot',
//    './app/assets/style/external/ui-grid/*.svg',
//    './app/assets/style/external/ui-grid/*.ttf',
//    './app/assets/style/external/ui-grid/*.woff'
//];

//TODO: quando o UI-GRID vier do bower, temos que colocar abaixo. e comentar acima.
paths.uigridfonts = [
    './bower_components/angular-ui-grid/*.eot',
    './bower_components/angular-ui-grid/*.svg',
    './bower_components/angular-ui-grid/*.ttf',
    './bower_components/angular-ui-grid/*.woff'
];
paths.uigridbuildfonts = paths.build;

module.exports = paths;
