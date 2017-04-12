import ActionTypes from './action_types';
import store from 'store';
import * as Selectors from './selectors';

export function toggleIsSelected () {
    setIsSelected(!Selectors.isSelected(store.getState()));
}

export function setIsSelected (isSelected) {
    store.dispatch({
        type: ActionTypes.SET_IS_SELECTED,
        payload: isSelected,
    });
}
