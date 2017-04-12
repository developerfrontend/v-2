import path from 'path';

// constants
import { WEBPACK } from '../../env/config';

// utils
import vendors from '../util/vendors';
import loaders from '../util/loaders';
import resolve from '../util/resolve';
import commonPlugins from '../plugins/common_plugins';
import devPlugins from '../plugins/dev_plugins';

export default {
    entry: {
        [WEBPACK.DEV_SERVER_APP_NAME]: [
            'webpack-dev-server/client?http://localhost:8080/',
            'webpack/hot/dev-server',
            path.join(__dirname, '../../src/client/main.es'),
            path.join(__dirname, '../util/immutable_devtools.es'),
            path.join(__dirname, '../../src/client/dev_settings.es'),
        ],
        [WEBPACK.DEV_SERVER_VENDOR_NAME]: vendors,
    },

    output: {
        path: WEBPACK.DEV_SERVER_PUBLIC_PATH,
        filename: '[name]-build.js',
        publicPath: WEBPACK.DEV_SERVER_PUBLIC_PATH,
    },

    module: {
        loaders,
    },

    resolve,

    plugins: devPlugins.concat(commonPlugins),
};
