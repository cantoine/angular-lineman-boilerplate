angular.module( 'model.role', [
    'model.base',
    'model.message'
]).factory('model.role',[
    '$q',
    'model.base',
    'model.message',
    function($q, Base, MessageModel) {
        return Role = (function(Base) {
            angular.extend(Role.prototype, Base.prototype);

            function Role(upStream, downStream, data) {
                //Base.call(this, upStream, downStream, data);
                Base.prototype.constructor.apply(this, arguments);
                var self = this;

                this.listeners.push(
                    this.downStream.filter(function(event) {
                        return event.context == 'user' && 
                               event.room == 'roles' && 
                               event.message.action == 'role-updated' && 
                               event.message._id == self._id;
                    }).onValue(function(event) {
                        var message = new MessageModel(
                            {
                                action: 'view-role',
                                _id: self._id
                            },
                            self.downStream,
                            function(message) {
                                if (message.status == 'success') {
                                    angular.extend(self, message.data);
                                }
                            }
                        );

                        self.query(message);
                    })
                );
            }

            Role.prototype.create = function() {
                var deferred = $q.defer(),
                    self = this,
                    message = new MessageModel(
                        {
                            action: 'create-role',
                            params: this
                        },
                        this.downStream,
                        function(message) {
                            if (message.status == 'success') {
                                self.close();
                                return deferred.resolve(message);
                            }

                            deferred.reject(message);
                        }
                    );

                this.query(message);

                return deferred.promise;
            };

            Role.prototype.delete = function() {
                var deferred = $q.defer(),
                    self = this,
                    message = new MessageModel(
                        {
                            action: 'delete-role',
                            params: this
                        },
                        this.downStream,
                        function(message) {
                            if (message.status == 'success') {
                                self.close();
                                return deferred.resolve(message);
                            }

                            deferred.reject(message);
                        }
                    );

                this.query(message);

                return deferred.promise;
            };

            Role.prototype.update = function() {
                var deferred = $q.defer(),
                    self = this,
                    message = new MessageModel(
                        {
                            action: 'update-role',
                            params: this
                        },
                        this.downStream,
                        function(message) {
                            if (message.status == 'success') {
                                return deferred.resolve(message);
                            }

                            deferred.reject(message);
                        }
                    );

                this.query(message);

                return deferred.promise;
            };

            return Role;
        })(Base);
    }
]);