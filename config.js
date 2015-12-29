// deps
const path = require('path');

// app PATHS
const PATHS = {
    app: path.join( __dirname, 'src/app' ),
    public: path.join( __dirname, 'src/www' ),
    build: path.join( __dirname, 'dist' )
};

module.exports = {
    paths: PATHS
};
