import path from 'path';

// constants
import { WEBPACK } from '../../env/config';

// utils
import vendors from '../util/vendors';
import loaders from '../util/loaders';
import resolve from '../util/resolve';
import commonPlugins from '../plugins/common_plugins';
import productionPlugins from '../plugins/production_plugins';

export default {
    entry: {
        [WEBPACK.DEV_SERVER_APP_NAME]: [
            path.join(__dirname, '../../src/client/main.es'),
        ],
        [WEBPACK.DEV_SERVER_VENDOR_NAME]: vendors,
    },

    output: {
        path: path.join(__dirname, '../../build/client'),
        filename: '[name]-build.js',
    },

    module: {
        loaders,
    },

    resolve,

    plugins: commonPlugins.concat(productionPlugins),
};
