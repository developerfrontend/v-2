import Webpack from 'webpack';
import path from 'path';

// webpack plugins
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// constants
import { WEBPACK } from '../../env/config';

export default [
    new Webpack.optimize.CommonsChunkPlugin({
        name: [ WEBPACK.DEV_SERVER_VENDOR_NAME ],
        minChunks: Infinity,
    }),

    new ExtractTextWebpackPlugin('[name]-build.css'),

    new Webpack.NoErrorsPlugin(),

    new HtmlWebpackPlugin({
        title: 'Victoria-v2',
        template: path.join(__dirname, '../../src/client/template/index.ejs'),
    }),
];
