require.config({
    baseUrl: '/js/',

    // alias libraries paths
    paths: {
		'jquery': 'vendor/jquery',

        'react': 'vendor/react',
        'noise': 'vendor/index',

        'statsjs': 'vendor/stats.min'
    },

    shim: { },

    // kick start application
    deps: ['app']
});
