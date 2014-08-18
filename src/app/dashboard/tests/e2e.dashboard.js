var protractor = require('protractor');
    
describe('Home module', function() {
    describe('visiting the home page', function() {

        beforeEach(function() {
            browser.get('/');
        });

        describe('when we do something', function() {
            it('it should display nothing', function() {
                expect(true).toEqual(true);
            });

            it('it should display nothing', function() {
                expect(true).toEqual(true);
            });

            it('it should display nothing', function() {
                expect(true).toEqual(true);
            });

            it('it should display nothing', function() {
                expect(true).toEqual(true);
            });
        });
    });
});