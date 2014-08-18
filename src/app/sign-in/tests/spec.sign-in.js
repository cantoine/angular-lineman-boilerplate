//'use strict';

describe('Sign in module', function() {
    var controller,
        authMock,
        state = 'single-column.sign-in';

    beforeEach(function() {
        module('sign-in', function($provide) {
            $provide.value('service.authentication', authMock = {});
        });
    });

    it('should require someone to be unauthenticated', inject(function($rootScope, $injector, $state) {
        authMock.getIdentity = sinon.stub().returns({ role: 'guest' });
        $state.go(state);
        $rootScope.$digest();
        $state.current.name.should.be.equal(state);
        sinon.assert.called(authMock.getIdentity);
    }));

    //it('should redirect an authenticated user', inject(function($rootScope, $injector, $state) {
    //    authMock.getIdentity = jasmine.createSpy('getIdentity').and.returnValue({ role: 'user' });
    //    $state.go(state);
    //    $rootScope.$digest();
    //    expect(authMock.getIdentity).toHaveBeenCalled();
        //console.log($state.current);
        //expect($state.current.name).toBe('three-column.product.list');
    //}));
});