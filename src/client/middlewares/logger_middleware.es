import logger from 'log';

export const LoggerMiddleWare = (/*store*/) => (next) => (action) => {

    logger.info(action.type);
    logger.debug(JSON.stringify(action.payload));

    const result = next(action);

    // if some super logs will be required - uncomment this line
    // logger.debug(JSON.stringify(store.getState()));

    return result;
};
