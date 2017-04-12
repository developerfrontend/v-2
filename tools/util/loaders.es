export default [
    {
        test: /\.(js|jsx|es)$/,
        loader: 'babel',
    }, {
        test: /\.json$/,
        loader: 'json',
    }, {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader',
    },
];
