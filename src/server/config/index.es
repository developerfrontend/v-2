import _ from 'lodash';
import configCommon from './server_common';
import configDev from './server_dev';
import configProd from './server_production';

const config = _.merge(
    configCommon,
    process.env.NODE_ENV === 'production' ? configProd : configDev);

export default {
    get (key) {
        return config[key];
    },
};
