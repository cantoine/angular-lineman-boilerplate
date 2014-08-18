angular.module( 'model.user', [
    'model.base',
    'model.message'
]).factory('model.user',[
    '$q',
    'model.base',
    'model.message',
    function($q, Base, MessageModel) {
        return User = (function(Base) {
            angular.extend(User.prototype, Base.prototype);

            function User(upStream, downStream, data) {
                Base.prototype.constructor.apply(this, arguments);
                var self = this;

                this.listeners.push(
                    this.downStream.filter(function(event) {
                        return event.context == 'user' && 
                               event.message.action == 'user-updated' && 
                               event.message._id == self._id;
                    }).onValue(function(event) {
                        var message = new MessageModel(
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
                        );

                        self.query(message);
                    })
                );
            }

            User.prototype.create = function() {
                var deferred = $q.defer(),
                    self = this,
                    message = new MessageModel(
                        {
                            action: 'create-user',
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

            User.prototype.delete = function() {
                var deferred = $q.defer(),
                    self = this,
                    message = new MessageModel(
                        {
                            action: 'delete-user',
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

            User.prototype.update = function() {
                var deferred = $q.defer(),
                    self = this,
                    message = new MessageModel(
                        {
                            action: 'update-user',
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

            return User;
        })(Base);
    }
]);