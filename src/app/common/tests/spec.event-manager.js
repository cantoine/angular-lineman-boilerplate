(function () {
   'use strict';

    describe('Event Manager Service', function() {
        var delayStub = sinon.stub().returns(
                {
                    subscribe: sinon.stub().callsArgWith(0, { 
                        value: function(){
                            return false;
                        }
                    })
                }
            ),
            fakePromise = {
                then: sinon.stub().callsArgWith(0, { guid: 12345, data:{} })
            },
            fakeQueuePromise = {
                then: sinon.stub().callsArgWith(0, 0)
            },
            hustleMock = {
                length: sinon.stub().returns(fakeQueuePromise),
                reserve: sinon.stub().returns(fakePromise),
                put: sinon.stub().returns(fakePromise)
            },
            socketMock = {
                addReceiveListener: sinon.stub(),
                connected: {
                    delay: delayStub
                },
                publish: sinon.stub(),
                ready: false
            },
            service = null;

        beforeEach(function() {
            module('service.event-manager', function($provide) {
                $provide.value('service.socket', socketMock);
                $provide.value('service.hustle', hustleMock);
            });

            inject(['service.event-manager', function(_service_) {
                service = _service_;
            }]);
        });

        // it('should setup receive listeners', inject(function($rootScope, $injector) {
        //     sinon.assert.called(socketMock.addReceiveListener);
        //     sinon.assert.called(socketMock.connected.delay);
        //     sinon.assert.called(socketMock.connected.delay().subscribe);
        // }));

        // it('should queue query events', inject(function($rootScope, $injector) {
        //     service.queryStream.push({
        //         data: {},
        //         guid: 23456789
        //     });

        //     // Should figure out a way to test for error cases too
        //     sinon.assert.called(hustleMock.put);
        //     sinon.assert.called(hustleMock.put().then);
        // }));

        // it('should push query events to the socket', inject(function($rootScope, $injector) {
        //     socketMock.ready = true;
        //     service.queryStream.push({
        //         data: {},
        //         guid: 23456789
        //     });

        //     sinon.assert.called(socketMock.publish);
        // }));
    });
}());