import _ from 'lodash';
// models
import Profile from '../models/profile';
//constants
import { PRE_REGISTER_TIME_OUT, PRE_LOGIN_TIME_OUT, MAX_NUMBER_OF_PRE_REGISTRED, MAX_NUMBER_OF_PRE_LOGINED } from '../env/config';
import * as Constants from '../constants';
//security
import NodeRSA from 'node-rsa';
import randomString from 'randomstring';
import passport from 'passport';
//logger
import log from '../log';
//helpers
import { success, failed, invalid } from '../helpers/response';

export function getAll (request, response) {
    Profile.findAll().then((profiles) => {
        success(response, {
            profiles,
        });
    }).catch((error) => {
        log.warn(`Profile controller -> getAll: Process of getting FAILED error: ${error.message}.`);
        failed(response, {
            error,
        });
    });
}

export function getProfile (request, response) {
    Profile.findByName(request.params.username).then((profile) => {
        success(response, {
            message: profile.message,
            username: profile.username,
        });
    }).catch((error) => {
        log.warn(`Profile controller -> getMessage: Process of getting FAILED error: ${error.message}.`);
        failed(response, {
            error,
        });
    });
}

export function findById (request, response) {
    Profile.findById(request.params.id).then((profile) => {
        success(response, {
            name: profile.username,
        });
    }).catch((error) => {
        log.warn(`Profile controller -> findById: Process of finding FAILED error: ${error.message}.`);
        failed(response, {
            error,
        });
    });
}

export function removeById (request, response) {
    Profile.findById(request.params.id).then((profile) => {
        profile.remove((error, removed) => {
            if (error) {
                throw error;
            } else if (!removed) {
                failed(response);
            } else {
                success(response);
            }
        });
    }).catch((error) => {
        log.warn(`Profile controller -> removeById: Process of removing FAILED error: ${error.message}.`);
        failed(response, {
            error,
        });
    });
}

const currentPreRegistred = {};

function addToPreRegistredMap (username, key) {
    if (currentPreRegistred[username]) {
        return;
    }

    const preRegistrationTimeoutId = setTimeout(() => {
        currentPreRegistred[username].clear();
    }, PRE_REGISTER_TIME_OUT);

    currentPreRegistred[username] = {
        key,
        clear: () => {
            clearTimeout(preRegistrationTimeoutId);
            delete currentPreRegistred[username];
        },
    };
}

function clearPreRegisteredMap () {
    _.forEach(Object.keys(currentPreRegistred), (key) => {
        currentPreRegistred[key].clear();
    });
}

export function preRegister (request, response) {
    log.debug(`Profile controller -> preRegister: Was called with body: ${JSON.stringify(request.body)}.`);
    const numberOfUsers = Object.keys(currentPreRegistred).length;

    if ( numberOfUsers > MAX_NUMBER_OF_PRE_REGISTRED) {
        log.debug(`Profile controller -> preRegister: There is too many pre registered users : ${numberOfUsers}.`);
        failed(response);

        return;
    }

    const {
        username,
        key,
    } = request.body;

    if (!username) {
        log.debug(`Profile controller -> preRegister: Username is not passed.`);
        failed(response);

        return;
    }

    if (currentPreRegistred[username]) {
        log.debug(`Profile controller -> preRegister: User with username '${username}' has been PREregistered already.`);
        failed(response);

        return;
    }

    Profile.findByName(username).then(() => {
        log.debug(`Profile controller -> preRegister: User is REGISTERED already username : ${username}.`);
        invalid(response);
    }).catch(() => {
        log.debug(`Profile controller -> preRegister: Starting process of preregistration.`);
        const rsa = new NodeRSA();
        const passwordKey = randomString.generate();

        rsa.importKey(key, 'public');
        const encryptedHashKey = rsa.encrypt(passwordKey, Constants.SERVER_ENCRYPTION);

        addToPreRegistredMap(username, passwordKey);

        log.debug(`Profile controller -> preRegister: Process of preregistration SUCCESS.`);
        success(response, {
            encryptedHashKey,
        });
    }).catch((error) => {
        log.warn(`Profile controller -> preRegister: Process of preregistration FAILED error: ${error.message}.`);
        failed(response);
    });
}

export function register (request, response) {
    log.debug(`Profile controller -> register: Was called with body: ${JSON.stringify(request.body)}.`);

    const {
        username,
        password,
        message,
    } = request.body;

    if (currentPreRegistred[username]) {
        const passwordKey = currentPreRegistred[username].key;

        currentPreRegistred[username].clear();

        const profile = new Profile({
            username,
            password,
            passwordKey,
            message,
        });

        profile.save().then(() => {
            log.debug(`Profile controller -> register: Process of registration SUCCESS.`);
            success(response);
        }).catch((error) => {
            log.warn(`Profile controller -> register: Process of registration FAILED error: ${error.message}.`);
            failed(response, {
                error,
            });
        });
    } else {
        log.debug(`Profile controller -> register: Process of registration FAILED. User is not preregistred username: ${username}.`);
        failed(response);
    }
}

export function clearPreRegistered (request, response) {
    log.debug(`Profile controller -> clearPreRegistered: Was called.`);
    clearPreRegisteredMap();
    log.debug(`Profile controller -> clearPreRegistered: Was finished SUCCESS.`);
    success(response);
}

const currentPreLogined = {};

function addToPreLoginMap (username) {
    if (currentPreLogined[username]) {
        return;
    }

    const preLoginTimeoutId = setTimeout(() => {
        currentPreLogined[username].clear();
    }, PRE_LOGIN_TIME_OUT);

    currentPreLogined[username] = {
        clear: () => {
            clearTimeout(preLoginTimeoutId);
            delete currentPreLogined[username];
        },
    };
}

function clearPreLoginedMap () {
    _.forEach(Object.keys(currentPreLogined), (key) => {
        currentPreLogined[key].clear();
    });
}

export function preLogin (request, response) {
    log.debug(`Profile controller -> preLogin: Was called with body: ${JSON.stringify(request.body)}.`);
    const numberOfUsers = Object.keys(currentPreLogined).length;

    if (numberOfUsers > MAX_NUMBER_OF_PRE_LOGINED) {
        log.debug(`Profile controller -> preLogin: There is too many pre logined users : ${numberOfUsers}.`);

        failed(response);

        return;
    }

    const {
        username,
        key,
    } = request.body;

    if (!username) {
        log.debug(`Profile controller -> preLogin: Username is not passed.`);
        failed(response);

        return;
    }

    if (currentPreLogined[username]) {
        log.debug(`Profile controller -> preLogin: User with username '${username}' has been PRElogined already.`);
        failed(response);

        return;
    }

    Profile.findByName(username).then((profile) => {
        log.debug(`Profile controller -> preLogin: Starting process of prelogin.`);

        const rsa = new NodeRSA();
        const passwordKey = profile.passwordKey;

        rsa.importKey(key, 'public');
        const encryptedHashKey = rsa.encrypt(passwordKey, Constants.SERVER_ENCRYPTION);

        addToPreLoginMap(username);

        log.debug(`Profile controller -> preLogin: Process of prelogin SUCCESSED.`);
        success(response, {
            encryptedHashKey,
        });
    }).catch((error) => {
        log.warn(`Profile controller -> preLogin: Process of prelogin FAILED error: ${error.message}.`);
        failed(response, {
            error,
        });
    });
}

export function login (request, response) {
    log.debug(`Profile controller -> login: Was called with body: ${JSON.stringify(request.body)}.`);
    const {
        username,
    } = request.body;

    if (currentPreLogined[username]) {
        currentPreLogined[username].clear();

        passport.authenticate('local', function passportAuthenticateLocal (error, profile/*, info*/) {
            if (error) {
                log.warn(`Profile controller -> login: Process of login FAILED error: ${error.message}.`);

                return failed(response);
            } else if (profile) {
                return request.logIn(profile, function profileLogIn (logInError) {
                    if (logInError) {
                        log.debug(`Profile controller -> login: Process of login FAILED. Wrong password for user username: ${username}.`);

                        return failed(response);
                    } else {
                        log.debug(`Profile controller -> login: Process of login SUCCESS.`);

                        return success(response);
                    }
                });
            } else {
                log.debug(`Profile controller -> login: Process of login FAILED. User not found username: ${username}.`);

                return failed(response);
            }
        })(request, response);
    } else {
        log.debug(`Profile controller -> login: Process of login FAILED. User is not prelogined username: ${username}.`);

        failed(response);
    }
}

export function clearPreLogined (request, response) {
    log.debug(`Profile controller -> clearPreLogined: Was called.`);
    clearPreLoginedMap();
    log.debug(`Profile controller -> clearPreLogined: Was finished SUCCESS.`);
    success(response);
}

export function logout (request, response) {
    log.debug(`Profile controller -> logout: Was called.`);
    request.logout();
    log.debug(`Profile controller -> logout: Was finished SUCCESS.`);
    success(response);
}
