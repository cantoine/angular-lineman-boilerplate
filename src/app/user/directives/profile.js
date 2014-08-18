angular.module('user.profile-widget', [
])
.directive('profileWidget', [
    function ProfileWidget() {
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            templateUrl: 'user/templates/profile-widget.tpl.html',
            controller: [
                '$scope',
                '$state',
                'service.authentication',
                function ProfileWidgetController($scope, $state, authService) {
                    authService.getIdentity().then(
                        function(identity) {
                            $scope.identity = identity;
                        }
                    );
                }
            ]
        };
    }
]);