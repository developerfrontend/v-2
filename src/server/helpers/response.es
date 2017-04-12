import StatusConstants from '../constants/status';

function makeResponse (response, status, body) {
    response.status(status);

    if (body) {
        response.json(body);
    }

    response.end();
}

export function success (response, body) {
    makeResponse(response, StatusConstants.SERVER_SUCCESS_STATUS, body);
}

export function failed (response, body) {
    makeResponse(response, StatusConstants.SERVER_FAILED_STATUS, body);
}

export function invalid (response, body) {
    makeResponse(response, StatusConstants.SERVER_INVALID_DATA_STATUS, body);
}
