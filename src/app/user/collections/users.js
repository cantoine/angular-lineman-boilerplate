angular.module( 'collection.users', [
    'collection.base',
    'model.user',
    'model.message',
    'service.event-manager'
]).factory('collection.users', [
    'collection.base',
    'model.user',
    'model.message',
    'service.event-manager',
    function(BaseCollection, UserModel, MessageModel, eventManagerService) {
        return UserCollection = (function(BaseCollection) {
            angular.extend(UserCollection.prototype, BaseCollection.prototype);

            function UserCollection(upStream, downStream, data) {
                // Set our model for later instantiations
                this.model = UserModel;
                this.room = 'users';

                // Call our base contructor
                BaseCollection.prototype.constructor.apply(this, arguments);
                var self = this;

                this.downStream.filter(
                    function(event) {
                        return event.context == 'user' && event.room == 'users' && event.message.action == 'user-created';
                    }
                ).onValue(
                    function(event) {
                        var message = new MessageModel(
                                {
                                    action: 'view-user',
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
                        return event.context == 'user' && event.room == 'users' && event.message.action == 'user-deleted';
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

            return UserCollection;
        })(BaseCollection);
    }
]);