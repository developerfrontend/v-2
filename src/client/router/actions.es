import { Paths } from 'router/constants';
import history from 'router/history';

export function goToHome () {
    history.push(Paths.HOME);
}

export function goToAbout () {
    history.push(Paths.ABOUT);
}

export function goToPerformance () {
    history.push(Paths.PERFORMANCE);
}

export function goToProfile () {
    history.push(Paths.PROFILE);
}
