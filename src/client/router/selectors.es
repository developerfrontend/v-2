export function selectLocationState (state) {
    return state.get('routing').toJS();
}
