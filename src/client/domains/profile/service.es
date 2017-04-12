import request from 'domains/http';
import * as ProfileConstants from './constants';

/**
 * Request load a data for profile.
 * @function
 * @name loadProfile
 * @param {string} username - The username of profile.
 * @return {Promise} promise - with profile object in resolve and error in reject
 */
export function loadProfile (username) {
    return request.get(ProfileConstants.PROFILE_GET_DATA.replace('${username}', username));
}
/**
 * Request preRegister for profile.
 * @function
 * @name preRegister
 * @param {string} username - The username of profile.
 * @param {string} key - The RSA key for server.
 * @return {Promise} promise - with ecrypted hash key in resolve and error in reject
 */
export function preRegister (username, key) {
    return request.post(ProfileConstants.PROFILE_PREREGISTER, {
        username,
        key,
    });
}

/**
 * Request register for profile.
 * @function
 * @name register
 * @param {string} username - The username of profile.
 * @param {string} password - The hashed password of profile.
 * @param {string} message - The message of profile.
 * @return {Promise} promise - with register status
 */
export function register (username, password, message) {
    return request.post(ProfileConstants.PROFILE_REGISTER, {
        username,
        password,
        message,
    });
}

/**
 * Request preLogin for profile.
 * @function
 * @name preLogin
 * @param {string} username - The username of profile.
 * @param {string} key - The RSA key for server.
 * @return {Promise} promise - with ecrypted hash key in resolve and error in reject
 */
export function preLogin (username, key) {
    return request.post(ProfileConstants.PROFILE_PRELOGIN, {
        username,
        key,
    });
}

/**
 * Request login for profile.
 * @function
 * @name login
 * @param {string} username - The username of profile.
 * @param {string} password - The hashed password of profile.
 * @return {Promise} promise - with login status
 */
export function login (username, password) {
    return request.post(ProfileConstants.PROFILE_LOGIN, {
        username,
        password,
    });
}

/**
 * Request logout for profile.
 * @function
 * @name logout
 * @return {Promise} promise - with logout status
 */
export function logout () {
    return request.post(ProfileConstants.PROFILE_LOGOUT);
}
