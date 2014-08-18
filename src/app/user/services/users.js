angular.module( 'service.users', [
    'model.user',
    'model.message',
    'collection.users',
    'service.event-manager'
]).service('service.users', [
    'collection.users', 
    'model.user',
    'model.message',
    'service.event-manager',
    '$q',
    function(UsersCollection, UserModel, MessageModel, eventManagerService, $q) {
        this.collection = null;

        this.find = function() {
            var deferred = $q.defer();
            if (this.collection) {
                deferred.resolve(this.collection);

                return deferred.promise;
            }

            var self = this,
                message = new MessageModel(
                    {
                        action: 'list-users'
                    },
                    eventManagerService.eventStream,
                    function(message) {
                        if (message.status == 'success') {
                            self.collection = new UsersCollection(eventManagerService.queryStream, eventManagerService.eventStream, message.data);
                            return deferred.resolve(self.collection);
                        }

                        deferred.reject(message);
                    }
                );

            eventManagerService.queryStream.push(message);

            return deferred.promise;
        };

        this.findOne = function(id) {
            var deferred = $q.defer(),
                message = new MessageModel(
                    {
                        action: 'view-user',
                        _id: id
                    },
                    eventManagerService.eventStream,
                    function(message) {
                        if (message.status == 'success') {
                            return deferred.resolve(new UserModel(eventManagerService.queryStream, eventManagerService.eventStream, message.data));
                        }

                        deferred.reject(message);
                    }
                );

            eventManagerService.queryStream.push(message);

            return deferred.promise;
        };

        this.create = function(data) {
            return new UserModel(eventManagerService.queryStream, eventManagerService.eventStream, data);
        };

        return this;
    }
]);