module.exports = function(config){
    config.set({

        basePath : './',

        files : [
            './bower_components/angular/angular.min.js',
            './bower_components/ngstorage/ngStorage.min.js',
            './bower_components/angular-mocks/angular-mocks.js',
            './app/js/**/*.js',
            './spec/app.spec.js'
        ],

        autoWatch : true,

        frameworks: ['jasmine', 'jasmine-matchers'],

        browsers : ['Chrome'],

        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-jasmine-matchers',
            'karma-junit-reporter'
        ],

        angularFilesort: {
            whitelist: [
                './app/js/**/*.js'
            ]
        },

        singleRun: true,

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
