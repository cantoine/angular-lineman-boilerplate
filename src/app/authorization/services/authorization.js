angular.module( 'service.authorization', [
    'not-authorized'
]).service('service.authorization', [
    '$q',
    'service.authentication',
    function($q, authenticationService) {
        var resources = {};

        // Helper function that allows us to easily request perms in a resolve
        this.isRouteAllowed = function(resource, perm) {
            var deferred = $q.defer();

            authenticationService.getIdentity().then(
                function(identity) {
                    if (!identity.isAllowed(resource, perm)) {
                        return deferred.reject({
                            name: 'Not Authorized',
                            message: 'Not allowed to be here',
                            code: 403
                        });
                    }

                    return deferred.resolve(true);
                }
            );

            return deferred.promise;
        };

        // Helper function to abstract away the logic to parse the perms
        this.isAllowed = function(resources, permission) {
            var deferred = $q.defer();

            authenticationService.getIdentity().then(
                function(identity) {
                    if (typeof resources === 'object') {
                        var checks = {};
                        angular.forEach(resources, function( perm, resource ) {
                            if (!checks[resource]) {
                                checks[resource] = {};
                            }
                            
                            checks[resource][perm] = identity.isAllowed(resource, perm);
                        });

                        return deferred.resolve(checks);
                    } else {
                        return deferred.resolve(identity.isAllowed(resources, permission));
                    }
                }
            );

            return deferred.promise;
        };

        return this;
    }
]).run( [
    '$rootScope',
    '$state',
    function run($rootScope, $state) {
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
            if ( error.code === 403 ) {
                $state.go('two-column.not-authorized');
            }
        });
    }
]);