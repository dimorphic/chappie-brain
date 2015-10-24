require.config({
    baseUrl: '/js/',

    // alias libraries paths.  Must set 'angular'
    paths: {
		'jquery': 'vendor/jquery',

        // 'angular': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min'
        'react': 'vendor/react',
        'noise': 'vendor/index',

        'statsjs': 'vendor/stats.min'
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: { },

    // kick start application
    deps: ['app']
});
