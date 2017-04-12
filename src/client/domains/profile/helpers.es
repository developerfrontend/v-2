import { FAILED_STATUS } from './constants';

export function isValidDataWasSent (error) {
    return error.status === FAILED_STATUS;
}
