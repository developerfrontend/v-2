import Immutable from 'immutable';
import ActionTypes from './action_types';

const initialState = Immutable.fromJS({
    isSelected: false,
});

export default function performanceReducer (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_IS_SELECTED:
            return state.set('isSelected', action.payload);
        default:
            return state;
    }
}
