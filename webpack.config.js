var path = require('path');
var webpack = require("webpack");
var resolveBowerPath = function(componentPath) {
    return path.join(__dirname, 'bower_components', componentPath);
};

module.exports = {
    entry: './src/adswipe.js',
    //watch: true,
    resolve: {
        alias: {
            hammer: resolveBowerPath('/hammerjs/hammer.js'),
            fingerprint2: resolveBowerPath('/fingerprintjs2/fingerprint2.js'),
            //velocity: resolveBowerPath('/velocity/velocity.js')
            uaparser: resolveBowerPath('/ua-parser-js/src/ua-parser.js'),
            jstoast: resolveBowerPath('/js-toast/toast.js')
        },
        modulesDirectories: [
            'src',
            'bower_commponents',
            'node_modules'
        ]
    },
    output: {
        path: '/dist',
        filename: 'adswipe.js',
        library: 'adswipe',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
        }]
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        )
    ]
};
