import CLC from 'cli-color';

// test libs
import chai from 'chai';

// dom mock
import jsdom from 'jsdom';

// mock localstorage
import localStorage from 'mock-local-storage';  // eslint-disable-line no-unused-vars

global.chai = chai;
global.expect = chai.expect;

// mock DOM
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;

// mock localstorage
global.window.localStorage = global.localStorage;

console.log(CLC.green('MOCHA COMMON SETUP FOR COMPLETE'));
