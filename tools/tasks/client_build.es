import Webpack from 'webpack';
import CLC from 'cli-color';

// wepback config
import WebpackProductionConfig from '../webpack_config/webpack.config.production';

const compiler = Webpack(WebpackProductionConfig);

compiler.run((err/*, stats*/) => {
    if (err) {
        console.error(CLC.red(err));
    } else {
        console.log(CLC.green('\nClient build success.\n'));
    }
});
