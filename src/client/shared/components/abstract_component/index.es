import React from 'react';

export default class AbstractComponent extends React.Component {}

AbstractComponent.contextTypes = {
    currentLanguage: React.PropTypes.string.isRequired,
};
