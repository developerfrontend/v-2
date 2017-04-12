import { createStructuredSelector } from 'reselect';
import Profile from 'domains/profile';

export default createStructuredSelector({
    message: Profile.Selectors.message,
    username: Profile.Selectors.username,
});
