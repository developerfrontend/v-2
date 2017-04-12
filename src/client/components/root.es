import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

// app routes
import routes from 'router/routes';

class Root extends React.Component {
    render () {
        return <Provider store={this.props.store}>
            <Router history={this.props.history} >
                { routes() }
            </Router>
        </Provider>;
    }
}

Root.propTypes = {
    history: React.PropTypes.object.isRequired,
    store: React.PropTypes.object.isRequired,
};

export default Root;
