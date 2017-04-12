import { compose, createStore } from 'redux';
import { serialize, deserialize } from 'redux-localstorage-immutable';
import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import config from 'config';

// reducers
import reducers from 'reducers';

// middlewares
import middlewares from 'middlewares';

const persistReducers = compose(
    mergePersistedState(deserialize)
)(reducers);

const storage = compose(
    serialize
)(adapter(window.localStorage));

const createPersistentStore = compose(
    persistState(storage, config.get('LOCALSTORAGE').VICTORIA),
    middlewares
)(createStore);

export default createPersistentStore(persistReducers);
