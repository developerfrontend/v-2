import Profile from 'domains/profile';
import * as RouterActions from 'router/actions';
import log from 'log';

export function login (username, password) {
    Profile.Actions.login(username, password).then(() => {
        RouterActions.goToProfile();
    }).catch(log.error);
}

export function register (username, password, message) {
    if (message.length > 0) {
        Profile.Actions.register(username, password, message).then(() => {
            login(username, password);
        }).catch(log.error);
    }
}
