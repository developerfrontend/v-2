import './style';
import React from 'react';
import AbstractComponent from 'components/abstract_component';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Paths } from 'router/constants';
import { translate } from 'lang';
import Megalist from './megalist';
import Performance from 'domains/performance';
import PerformanceTesterSelector from './selector';

const numberOfRows = 200;
const numberOfColumns = 200;

class PerformanceTester extends AbstractComponent {
    render () {
        const lists = [];

        for (let i = 0; i < numberOfRows; i++) {
            lists.push(
                <Megalist
                    kind={this.props.isSelected}
                    key={i}
                    numberOfItems={numberOfColumns}
                />
            );
        }

        return <div>
            <Link to={Paths.HOME}>{translate('KEY_MENU_LABEL_HOME', this.context.currentLanguage)}</Link>
            <div
                className="button"
                onClick={function onPerformanceClick () {
                    Performance.Actions.toggleIsSelected();
                }}
            />
            {lists}
        </div>;
    }
}

PerformanceTester.propTypes = {
    isSelected: React.PropTypes.bool.isRequired,
};

export default connect(PerformanceTesterSelector)(PerformanceTester);
