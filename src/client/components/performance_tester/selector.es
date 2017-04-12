import { createSelector } from 'reselect';
import Performance from 'domains/performance';

export default createSelector([
    Performance.Selectors.isSelected,
], (isSelected) => {
    return {
        isSelected,
    };
});
