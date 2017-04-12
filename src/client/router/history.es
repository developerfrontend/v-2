import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { selectLocationState } from 'router/selectors';
import store from 'store';

export default syncHistoryWithStore(browserHistory, store, {
    selectLocationState,
});
