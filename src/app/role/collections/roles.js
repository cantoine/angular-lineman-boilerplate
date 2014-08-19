angular.module( 'collection.roles', [
    'collection.base',
    'model.role',
    'model.message',
    'service.event-manager'
]).factory('collection.roles', [
    'collection.base',
    'model.role',
    'model.message',
    'service.event-manager',
    function(BaseCollection, RoleModel, MessageModel, eventManagerService) {
        return RoleCollection = (function(BaseCollection) {
            angular.extend(RoleCollection.prototype, BaseCollection.prototype);

            function RoleCollection(upStream, downStream, data) {
                // Set our model for later instantiations
                this.model = RoleModel;
                this.room = 'roles';

                // Call our base contructor
                BaseCollection.prototype.constructor.apply(this, arguments);
                var self = this;

                this.downStream.filter(
                    function(event) {
                        return event.context == 'user' && event.room == 'roles' && event.message.action == 'role-created';
                    }
                ).onValue(
                    function(event) {
                        var message = new MessageModel(
                                {
                                    action: 'view-role',
                                    _id: event.message._id
                                },
                                self.downStream,
                                function(message) {
                                    self.append(message.data);
                                }
                            );

                        upStream.push(message);
                    }
                );

                this.downStream.filter(
                    function(event) {
                        return event.context == 'user' && event.room == 'roles' && event.message.action == 'role-deleted';
                    }
                ).onValue(
                    function(event) {
                        angular.forEach(self.models, function(item, key) {
                            if (item._id == event.message._id) {
                                item.close();
                                self.models.splice(key, 1);
                                return false;
                            }
                        });
                    }
                );

                this.open();
            }

            return RoleCollection;
        })(BaseCollection);
    }
]);