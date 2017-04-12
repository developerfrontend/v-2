export function message (state) {
    return state.getIn([ 'profile', 'message' ]);
}

export function username (state) {
    return state.getIn([ 'profile', 'username' ]);
}
