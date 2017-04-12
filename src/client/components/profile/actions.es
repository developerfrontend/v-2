import Profile from 'domains/profile';
import * as RouterActions from 'router/actions';
import log from 'log';

export function logout () {
    Profile.Actions.logout().then(() => {
        RouterActions.goToHome();
    }).catch(log.error);
}
