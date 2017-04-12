import React from 'react';
import ReactDOM from 'react-dom';

// components
import Root from 'components/root';

// store
import store from 'store';

//history
import history from 'router/history';

window.onload = () => {
    ReactDOM.render(
        <Root
            store={store}
            history={history}
        />,
        document.getElementById('app-container')
    );
};
