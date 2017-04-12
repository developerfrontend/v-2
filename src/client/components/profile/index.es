import React from 'react';
import AbstractComponent from 'components/abstract_component';
import * as Actions from './actions';
import Selector from './selector';
import { connect } from 'react-redux';
import { translate } from 'lang';

class Profile extends AbstractComponent {
    render () {
        return (
            <div>
                <div>{ `username = ${this.props.username}` }</div>
                <div>{ `message = ${this.props.message}` }</div>
                <button
                    onClick={() => {
                        Actions.logout();
                    }}
                >
                { translate('KEY_PROFILE_LOGOUT', this.context.currentLanguage) }
                </button>
            </div>
        );
    }
}

export default connect(Selector)(Profile);
