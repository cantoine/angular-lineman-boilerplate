angular.module( 'service.authentication', [
    'service.event-manager',
    'model.identity'
]).service('service.authentication', [
    '$q',
    'service.event-manager',
    'service.socket',
    'model.identity',
    function($q, eventManagerService, socketService, IdentityModel) {
        var identityPromise = checkStorage(),
            identity = null,
            self = this;

        // Get the identity from local storage or initalize an empty identity
        identityPromise.then(
            function(ident) {
                identity = createIdentity(ident);
                //socketService.addRequiredParam('token', identity.getToken());

                return identity;
            }
        );

        this.getIdentity = function() {
            return identityPromise.then(
                function() {
                    return identity;
                }
            );
        };

        this.isAuthenticated = function() {
            var deferred = $q.defer();

            identityPromise.then(
                function(identity) {
                    if (identity.role == 'guest') {
                        return deferred.reject({
                            name: 'Not Authenticated',
                            message: 'Not logged in',
                            code: 401
                        });
                    }

                    return deferred.resolve(identity);
                }
            );

            return deferred.promise;
        };

        this.authenticate = function(data) {
            return createIdentity(data).authenticate().then(
                function(newIdentity){
                    identity.close();
                    identity = newIdentity;
                    socketService.addRequiredParam('token', identity.getToken());
                    saveIdentity();
                }
            );
        };

        this.signOut = function() {
            return deleteIdentity();
        };

        function createIdentity(data) {
            return new IdentityModel(
                eventManagerService.queryStream,
                eventManagerService.eventStream,
                data
            );
        }

        function checkStorage() {
            var self = this,
                deferred = $q.defer();

            /*chrome.storage.local.get('identity', function(result) {
                if (result.identity) {
                    deferred.resolve(result.identity);
                } else {
                    deferred.resolve({});
                }
            });*/
            deferred.resolve({});

            return deferred.promise;
        }

        function saveIdentity() {
            var identData = {
                _id: identity._id,
                name: identity.name,
                username: identity.username,
                resources: identity.resources,
                role: identity.role,
                permissions: identity.permissions,
                access_token: identity.access_token
            };

            // chrome.storage.local.set({ 'identity': identData }, function(identity) {
            //     if (chrome.runtime.lastError) {
            //         console.error('Error: ', chrome.runtime.lastError);
            //     }
            // });
        }

        function updateIdentity(changes) {
            var identData = {
                _id: identity._id,
                name: identity.name,
                username: identity.username,
                resources: identity.resources,
                role: identity.role,
                permissions: identity.permissions,
                access_token: identity.access_token
            };

            // chrome.storage.local.set({ 'identity': identData }, function(identity) {
            //     if (chrome.runtime.lastError) {
            //         console.error('Error: ', chrome.runtime.lastError);
            //     }
            // });
        }

        function deleteIdentity() {
            var deferred = $q.defer();

            chrome.storage.local.remove('identity', function() {
                if (chrome.runtime.lastError) {
                    deferred.reject(chrome.runtime.lastError);
                } else {
                    identity = createIdentity({});

                    deferred.resolve(identity);
                }
            });

            return deferred.promise;
        }

        return this;
    }
]).run( [
    '$rootScope',
    '$state',
    function run($rootScope, $state) {
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
            if (error.code === 401 && fromState.name != 'single-column.sign-in') {
                $state.go('single-column.sign-in');
            }
        });
    }
]);