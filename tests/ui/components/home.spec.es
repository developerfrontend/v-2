import React from 'react';

// component
import { Home as HomeComponent } from 'components/home';

describe('Home component tests', function homeComponentTest () {
    let home;
    let Home;

    afterEach(() => {
        localStorage.clear();
    });

    beforeEach(function homeComponentBeforeEach () {
        Home = stubContext(HomeComponent, {
            currentLanguage: 'en-US',
        });

        home = ReactTestUtils.renderIntoDocument(<Home />);
    });

    it('Should render container', function homeComponentRenderContainerTest () {
        const container = ReactTestUtils.findRenderedDOMComponentWithClass(home, 'home');

        expect(container).to.be.a('object');
    });

});
