(function () {
   'use strict';

    describe('UUID Service', function() {
        var service;

        beforeEach(function() {
            module('service.uuid');

            inject([ 'service.uuid', function(_uuidService_) {
                service = _uuidService_;
            }]);
        });

        it('should generate a unique token', function() {
            var uuid = service.generate(),
                pieces = uuid.split('-');

            pieces[2][0].should.be.equal('4');
            pieces.length.should.be.equal(5);
            uuid.length.should.be.equal(36);
        });
    });
}());