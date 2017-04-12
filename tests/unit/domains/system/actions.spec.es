import proxyquire from 'proxyquire';

describe('System domain actions', function systemDomainActionsTests () {

    let SystemActions;
    let spyStore;

    afterEach(() => {
        localStorage.clear();
    });

    beforeEach(function systemDomainBeforeEach () {
        spyStore = {
            default: {
                dispatch: chai.spy(),
            },
        };

        SystemActions = proxyquire('domains/system/actions.es', {
            store: spyStore,
        });
    });

    describe('updateCurrentLanguage', function systemDomainUpdateCurrentLanguageTests () {

        it('should put to store passed language', function systemDomainUpdateCurrentLanguagePutToStoreTest () {
            SystemActions.updateCurrentLanguage('en-GB');

            expect(spyStore.default.dispatch).to.have.been.called();
        });

    });
});
