// store
import store from 'store';

// constants
import ActionTypes from './action_types';

export function updateCurrentLanguage (language) {
    store.dispatch({
        type: ActionTypes.UPDATE_CURRENT_LANGUAGE,
        payload: language,
    });
}
