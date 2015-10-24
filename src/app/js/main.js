require.config({
    baseUrl: '/js/',

    // alias libraries paths.  Must set 'angular'
    paths: {
		'jquery': 'vendor/jquery',
        'noise': 'vendor/index',

        'statsjs': 'vendor/stats.min',
        'annyang': 'vendor/annyang'
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: { },

    // kick start application
    deps: ['app']
});
