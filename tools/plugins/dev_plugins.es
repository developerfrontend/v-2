import Webpack from 'webpack';
// import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import CLC from 'cli-color';

export default [

    // this line will be uncommented after an css adding
    // new ExtractTextWebpackPlugin('[name]-build.css'),
    new Webpack.HotModuleReplacementPlugin(),

    new Webpack.SourceMapDevToolPlugin({
        exclude: 'node_modules',
        columns: true,
    }),

    function compileStartLogPlugin () {
        this.plugin('compile', () => {
            console.log(CLC.yellow('Build start.'));
        });
    },

    function compoleDoneLogPlugin () {
        this.plugin('done', (status) => {
            if (status.compilation.errors && status.compilation.errors.length) {
                console.log(CLC.red(status.compilation.errors));
            } else {
                console.log(CLC.blue('\nSuccess build.\n'));
            }

        });
    },
];
