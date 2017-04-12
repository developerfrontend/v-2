import { compose, applyMiddleware } from 'redux';

// other custom middlewares
import { LoggerMiddleWare } from 'middlewares/logger_middleware';

export default compose(
    applyMiddleware(LoggerMiddleWare)
);
