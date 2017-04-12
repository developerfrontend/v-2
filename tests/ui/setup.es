import CLC from 'cli-color';

// react test component packages
import ReactTestUtils from 'react-addons-test-utils';
import StubContext from 'react-stub-context';

global.ReactTestUtils = ReactTestUtils;
global.stubContext = StubContext;

console.log(CLC.blue('MOCHA SETUP FOR REACT COMPONENTS COMPLETE'));
