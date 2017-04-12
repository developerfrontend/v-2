import React from 'react';
import { Link } from 'react-router';

// shared
import { translate } from 'lang';
import AbstractComponent from 'components/abstract_component';

// constants
import { Paths } from 'router/constants';

export default class About extends AbstractComponent {
    render () {
        return (
            <div className="about">
                <div>{translate('KEY_MENU_LABEL_ABOUT', this.context.currentLanguage)}</div>
                <Link to={Paths.HOME}>{translate('KEY_MENU_LABEL_HOME', this.context.currentLanguage)}</Link>
            </div>
        );
    }
}
