angular.module('notification-widget', [
    'service.notifications'
])
.directive('notificationWidget', [
    function NotificationWidget() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                'filterBy': '=',
                'design': '='
            },
            templateUrl: 'notification/templates/notification-widget.tpl.html',
            controller: [
                '$scope',
                '$state',
                'service.notifications',
                function NotificationWidgetController($scope, $state, notificationService) {
                    // Hack to be able to react to changing notifications
                    $scope.notificationList = notificationService.get();

                    $scope.$watchCollection('notificationList', function(newVal, oldVal) {
                        $scope.notifications = _.where(newVal, $scope.filterBy);
                    });
                }
            ]
        };
    }
]);