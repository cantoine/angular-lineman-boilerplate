describe('Home module', function() {
    describe('visiting the home page', function() {
        beforeEach(function() {
            module("boilerplate");
        });

        /*beforeEach(
            inject(
                function($controller, $rootScope, $location, $httpBackend) {
                    this.$location = $location;
                    this.$httpBackend = $httpBackend;
                    this.scope = $rootScope.$new();
                    this.redirect = spyOn($location, 'path');
                    return $controller('AppCtrl', {
                        $scope: this.scope,
                        $location: $location
                    });
                }
            )
        );*/

        describe('when we do something', function() {
            it('it should display nothing', function() {
                //expect(true).toEqual(true);
            });
            
            it('it should display nothing2', function() {
                //expect(true).toEqual(true);
            });

            it('it should display nothing 3', function() {
                //expect(true).toEqual(true);
            });

        });
    });
});