import config from 'config';

// constants
import { LOG_LEVELS } from './constants';

function formatMessage (message/*, level*/) {
    const date = (new Date()).toTimeString();

    return `${date}: ${message}`;
}

function log (message, level) {
    if (level > config.get('logLevel')) {
        return;
    }

    switch (level) {
        case LOG_LEVELS.DEBUG:
        default:
            console.log(formatMessage(message, level));
            break;
        case LOG_LEVELS.INFO:
            console.info(formatMessage(message, level));
            break;
        case LOG_LEVELS.WARN:
            console.warn(formatMessage(message, level));
            break;
        case LOG_LEVELS.ERROR:
            console.error(formatMessage(message, level));
            break;
    }
}

export default {
    debug (message) {
        log(message, LOG_LEVELS.DEBUG);
    },

    info (message) {
        log(message, LOG_LEVELS.INFO);
    },

    warn (message) {
        log(message, LOG_LEVELS.WARN);
    },

    error (message) {
        log(message, LOG_LEVELS.ERROR);
    },
};
