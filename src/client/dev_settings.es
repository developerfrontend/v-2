import _ from 'lodash';
import Immutable from 'immutable';
import store from 'store';

// domains
import request from 'domains/http';
import * as ProfileDomain from 'domains/profile';
import * as SystemDomain from 'domains/system';
import NodeRSA from 'node-rsa';
import randomString from 'randomstring';
import cryptoJS from 'crypto-js';
import * as routerActions from 'router/actions';

window._ = _;
window.Immutable = Immutable;
window.store = store;
window.NodeRSA = NodeRSA;
window.randomString = randomString;
window.cryptoJS = cryptoJS;

// domains
window.domains = {};
window.domains.request = request;
window.domains.ProfileDomain = ProfileDomain;
window.domains.SystemDomain = SystemDomain;
window.routerActions = routerActions;
