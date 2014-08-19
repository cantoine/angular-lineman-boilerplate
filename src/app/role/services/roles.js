angular.module( 'service.roles', [
    'model.role',
    'model.message',
    'collection.roles',
    'service.event-manager'
]).service('service.roles', [
    'collection.roles', 
    'model.role',
    'model.message',
    'service.event-manager',
    '$q',
    function(RolesCollection, RoleModel, MessageModel, eventManagerService, $q) {
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
                        action: 'list-roles'
                    },
                    eventManagerService.eventStream,
                    function(message) {
                        if (message.status == 'success') {
                            self.collection = new RolesCollection(eventManagerService.queryStream, eventManagerService.eventStream, message.data);
                            return deferred.resolve(self.collection);
                        }

                        deferred.reject(message);
                    }
                );

            eventManagerService.queryStream.push(message);

            return deferred.promise;
        };

        this.getResources = function() {
            var deferred = $q.defer(),
                message = new MessageModel(
                    {
                        action: 'list-permission-resources'
                    },
                    eventManagerService.eventStream,
                    function(message) {
                        if (message.status == 'success') {
                            return deferred.resolve(message.data);
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
                        action: 'view-role',
                        _id: id
                    },
                    eventManagerService.eventStream,
                    function(message) {
                        if (message.status == 'success') {
                            return deferred.resolve(new RoleModel(eventManagerService.queryStream, eventManagerService.eventStream, message.data));
                        }

                        deferred.reject(message);
                    }
                );

            eventManagerService.queryStream.push(message);

            return deferred.promise;
        };

        this.create = function(data) {
            return new RoleModel(eventManagerService.queryStream, eventManagerService.eventStream, data);
        };

        return this;
    }
]);