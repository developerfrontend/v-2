import Webpack from 'webpack';

export default [
    new Webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production'),
        },
    }),

    new Webpack.optimize.AggressiveMergingPlugin(),

    new Webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false,
        },
        compress: {
            warnings: false,
        },
    }),
];
