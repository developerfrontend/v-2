import './style';
import React from 'react';
import { Link } from 'react-router';

// shared
import { translate, translateFormattedLabel } from 'lang';
import AbstractComponent from 'components/abstract_component';

// constants
import { Paths } from 'router/constants';

//actions
import * as Actions from './actions';

// for tests
export class Home extends AbstractComponent {
    render () {
        return (
            <div className="home">
                <div>{translate('KEY_MENU_LABEL_HOME', this.context.currentLanguage)}</div>
                <div>{translateFormattedLabel({
                    alias: 'KEY_FORMATTED_HELLO_MESSAGE',
                    subs: [{
                        key: 'name',
                        value: 'EXAMPLE USER NAME',
                    }],
                }, this.context.currentLanguage)}</div>
                <Link
                    className="home-link"
                    to={Paths.ABOUT}
                >
                    {translate('KEY_MENU_LABEL_ABOUT', this.context.currentLanguage)}
                </Link>
                <Link
                    className="home-link"
                    to={Paths.PERFORMANCE}
                >
                    {translate('KEY_PERFORMANCE_TESTER_LINK_LABEL', this.context.currentLanguage)}
                </Link>
                <input
                    type="text"
                    ref={(usernameInput) => {
                        this.usernameInput = usernameInput;
                    }}
                />
                <input
                    type="password"
                    ref={(passwordInput) => {
                        this.passwordInput = passwordInput;
                    }}
                />
                <input
                    type="text"
                    ref={(messageInput) => {
                        this.messageInput = messageInput;
                    }}
                />
                <button
                    onClick={() => {
                        Actions.login(this.usernameInput.value, this.passwordInput.value);
                    }}
                >
                {translate('KEY_HOME_LOGIN', this.context.currentLanguage)}
                </button>
                <button
                    onClick={() => {
                        Actions.register(this.usernameInput.value, this.passwordInput.value, this.messageInput.value);
                    }}
                >
                {translate('KEY_HOME_REGISTER', this.context.currentLanguage)}
                </button>
            </div>
        );
    }
}

export default Home;
