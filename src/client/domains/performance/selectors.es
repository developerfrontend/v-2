export function isSelected (state) {
    return state.getIn([ 'performance', 'isSelected' ]);
}
