(function () {
   'use strict';

    describe('Socket Service', function() {
        var service = null;

        beforeEach(function() {
            module('service.socket', function($provide) {
                //$provide.value('service.socket', socketMock);
                //$provide.value('service.hustle', hustleMock);
            });

            inject(['service.service', function(_service_) {
                service = _service_;
            }]);
        });

        // Should write some unit tests for the socket. Going to require
        // mocking a ton of stuff due to the socket service using array buffers
        // and Bacon etc etc.
    });
}());