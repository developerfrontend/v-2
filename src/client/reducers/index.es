import { combineReducers } from 'redux-immutable';

// reducers
import routingReducer from 'router/reducer';

// domains
import systemReducer from 'domains/system/reducer';
import profileReducer from 'domains/profile/reducer';
import performanceReducer from 'domains/performance/reducer';

export default combineReducers({
    profile: profileReducer,
    routing: routingReducer,
    system: systemReducer,
    performance: performanceReducer,
});
