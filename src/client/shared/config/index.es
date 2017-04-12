import _ from 'lodash';
import configCommon from './client_common';
import configDev from './client_dev';
import configProd from './client_production';

const config = _.merge(
    configCommon,
    process.env.NODE_ENV === 'production' ? configProd : configDev);

export default {
    get (key) {
        return config[key];
    },
};
