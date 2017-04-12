export function currentLanguage (state) {
    return state.getIn([ 'system', 'currentLanguage' ]);
}
