import './style';
import React from 'react';
import classNames from 'classnames';
import AbstractComponent from 'components/abstract_component';
import Perf from 'react-addons-perf';

class Megalist extends AbstractComponent {
    componentWillUpdate () {
        Perf.start();
    }

    componentDidUpdate () {
        Perf.stop();
        Perf.printInclusive(Perf.getLastMeasurements());
    }

    render () {
        const items = [];
        const className = classNames({
            'item': true,
            'item__primary': this.props.kind,
        });

        for (let i = 0; i < this.props.numberOfItems; i++) {
            items.push(
                <div
                    key={i}
                    className={className}
                />
            );
        }

        return <div className="list">
            {items}
        </div>;
    }
}

Megalist.propTypes = {
    kind: React.PropTypes.bool.isRequired,
    numberOfItems: React.PropTypes.number,
};

export default Megalist;
