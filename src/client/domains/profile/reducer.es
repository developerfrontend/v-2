import Immutable from 'immutable';

// constants
import ActionTypes from './action_types';

const initialState = Immutable.fromJS({
    message: '',
    username: '',
});

export default function profileReducer (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_DATA:
            return state.mergeDeep(action.payload);

        case ActionTypes.RESET:
            return initialState;

        default:
            return state;
    }
}
