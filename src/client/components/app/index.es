import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

// selectors
import { Selectors as SystemSelectors } from 'domains/system';

class App extends React.Component {
    getChildContext () {
        return {
            currentLanguage: this.props.currentLanguage,
        };
    }

    render () {
        return (
            <div className="app">
                { this.props.children }
            </div>
        );
    }
}

App.childContextTypes = {
    currentLanguage: React.PropTypes.string.isRequired,
};

const appSelector = createSelector(
    [ SystemSelectors.currentLanguage ],
    (currentLanguage) => {
        return {
            currentLanguage,
        };
    }
);

export default connect(appSelector)(App);
