angular.module( 'model.identity', [
    'model.base',
    'model.message',
    'service.event-manager'
]).factory('model.identity',[
    '$q',
    'model.base',
    'model.message',
    'service.event-manager',
    'service.socket',
    function($q, Base, MessageModel, eventManagerService, socketService) {
        return Identity = (function(Base) {
            angular.extend(Identity.prototype, Base.prototype);

            function Identity(upStream, downStream, data) {
                Base.prototype.constructor.apply(this, arguments);

                this.role = 'guest';
                /*socketService.listenToRoom('users');

                angular.extend(this, data);

                var self = this;

                this.listeners.push(
                    this.downStream.filter(
                        function(event) {
                        return event.context == 'user' && 
                               event.message.action == 'user-updated' && 
                               event.message._id == self._id;
                        }
                    ).onValue(function(event) {
                        self.query(
                            new MessageModel(
                                {
                                    action: 'view-user',
                                    _id: self._id
                                },
                                self.downStream,
                                function(message) {
                                    if (message.status == 'success') {
                                        angular.extend(self, message.data);
                                    }
                                }
                            )
                        );
                    })
                );*/
            }

            Identity.prototype.isAuthenticated = function() {
                if (this.role == 'guest') {
                    return false;
                }

                return true;
            };

            Identity.prototype.authenticate = function() {
                var deferred = $q.defer(),
                    self = this;

                this.query(
                    new MessageModel(
                        {
                            action: 'sign-in',
                            username: this.username,
                            password: this.password
                        },
                        this.downStream,
                        function(message) {
                            if (message.status == 'success') {
                                angular.extend(self, message.data);

                                deferred.resolve(self);
                                return;
                            }

                            deferred.reject(message.data);
                        }
                    )
                );
                // Delete the password now that we've sent it off to the server.
                delete self.password;

                return deferred.promise;
            };

            Identity.prototype.isAllowed = function(resource, permission) {
                if (this.permissions &&
                    this.permissions[resource] && 
                    this.permissions[resource][permission] && 
                    this.permissions[resource][permission]) {
                    return true;
                }

                return false;
            };

            Identity.prototype.getToken = function() {
                if (this.access_token && this.access_token.key) {
                    return this.access_token.key;
                } else {
                    return null;
                }
            };

            return Identity;
        })(Base);
    }
]);