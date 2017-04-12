import StatusConstants from '../constants/status';
import express from 'express';
import { setupProfilePassportStrategy } from '../passport/profile_strategy';
import log from '../log';

const authentitcateRouter = express.Router();

setupProfilePassportStrategy();

function authenticateProfile (request, response, next) {
    if (request.isAuthenticated()) {
        next();
    } else {
        log.debug(`Authenticate Check -> authenticateProfile: Unautorized access attempt.`);
        response.status(StatusConstants.SERVER_FAILED_STATUS).end();
    }
}

authentitcateRouter.all('/api/profile', authenticateProfile);
authentitcateRouter.all('/api/profile/*', authenticateProfile);

export default authentitcateRouter;
