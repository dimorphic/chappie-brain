require.config({
    baseUrl: '/js/',

    // alias libraries paths.  Must set 'angular'
    paths: {
		'jquery': 'vendor/jquery',
        'angular': 'vendor/angular',

        'noise': 'vendor/index',
        'statsjs': 'vendor/stats.min',

        'app': 'app'
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        angular: {
            exports: 'angular'
        }
    },

    // kick start application
    deps: ['boot']
});
