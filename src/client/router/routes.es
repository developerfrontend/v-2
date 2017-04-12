import React from 'react';
import { Route, IndexRedirect } from 'react-router';

// constants
import { Paths } from 'router/constants';

// components
import App from 'components/app';
import Home from 'components/home';
import About from 'components/about';
import Performance from 'components/performance_tester';
import Profile from 'components/profile';

export default () =>
    <Route
        path="/"
        component={App}
    >
        <IndexRedirect to={Paths.HOME} />

        <Route
            path={Paths.HOME}
            component={Home}
        />

        <Route
            path={Paths.ABOUT}
            component={About}
        />

        <Route
            path={Paths.PERFORMANCE}
            component={Performance}
        />

        <Route
            path={Paths.PROFILE}
            component={Profile}
        />
    </Route>;
