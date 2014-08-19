angular.module( 'service.notifications', [
]).service('service.notifications', [
    '$q',
    '$timeout',
    function($q, $timeout) {
        this.notifications = [];

        this.get = function() {
            return this.notifications;
        };

        this.getOne = function(id) {
            return this.notifications[id];
        };

        this.add = function(notification) {
            var search = {};

            if (notification.type) {
                search.type = notification.type;
            }

            if (notification.uuid) {
                search.uuid = notification.uuid;
            }

            var index = _.findIndex(this.notifications, search);

            if (index === -1) {
                this.notifications.push(notification);

                if (notification.timeout) {
                    var self = this;

                    $timeout(
                        function() {
                            self.remove(notification);
                        },
                        notification.timeout
                    );
                }
            }
        };

        this.remove = function(filterBy) {
            return _.remove(this.notifications, filterBy);
        };

        return this;
    }
]);