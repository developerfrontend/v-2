// common
import NodeRSA from 'node-rsa';
import cryptoJS from 'crypto-js';
import log from 'log';
import store from 'store';
// constants
import ActionTypes from './action_types';

// service
import * as Service from './service';

// PRIVATE

// DISPATCHERS
function profileLoaded (profile) {
    store.dispatch({
        type: ActionTypes.SET_DATA,
        payload: profile,
    });
}

function resetUserData () {
    store.dispatch({
        type: ActionTypes.RESET,
    });
}

//LOADING ACTIONS
function profileLoadingRequest (username) {
    return Service.loadProfile(username)
        .then(profileLoaded)
        .catch((error) => {
            log.error(error);
            throw error;
        });
}

// PUBLIC

export function login (username, password) {
    const rsa = new NodeRSA({
        b: 512,
    });
    const key = rsa.exportKey('public');

    return Service.preLogin(username, key).then(({
        encryptedHashKey,
    }) => {
        const hashKey = rsa.decrypt(encryptedHashKey, 'utf8');
        const hashedPassword = cryptoJS.HmacSHA512(password, hashKey).toString(); //eslint-disable-line new-cap

        return Service.login(username, hashedPassword);
    }).catch((error) => {
        log.error(error);
        throw error;
    }).then(() => profileLoadingRequest(username));
}

export function register (username, password, message) {
    const rsa = new NodeRSA({
        b: 512,
    });
    const key = rsa.exportKey('public');

    return Service.preRegister(username, key).then(({
        encryptedHashKey,
    }) => {
        const hashKey = rsa.decrypt(encryptedHashKey, 'utf8');
        const hashedPassword = cryptoJS.HmacSHA512(password, hashKey).toString(); //eslint-disable-line new-cap

        return Service.register(username, hashedPassword, message);
    }).catch((error) => {
        log.error(error);
        throw error;
    });
}

export function logout () {
    return Service.logout().then(resetUserData).catch((error) => {
        log.error(error);
        throw error;
    });
}
