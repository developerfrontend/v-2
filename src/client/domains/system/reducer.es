import Immutable from 'immutable';

// constants
import ActionTypes from './action_types';
import { AvailableLanguages } from './constants';

const initialState = Immutable.fromJS({
    currentLanguage: AvailableLanguages.ENGLISH_US,
});

export default function systemReducer (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.UPDATE_CURRENT_LANGUAGE:
            return state.set('currentLanguage', action.payload);

        default:
            return state;

    }
}
