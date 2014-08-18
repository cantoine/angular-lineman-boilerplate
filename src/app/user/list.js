angular.module( 'user.list', [
    'user',
    'service.authorization'
]).config(
    function config( $stateProvider) {
        $stateProvider.state({
            name: 'three-column.user.list',
            url: '/users',
            views: {
                'list': {
                    controller:'UserListController',
                    templateUrl: 'user/templates/list.tpl.html'
                }
            },
            resolve: {
                perm: [
                    //DI the identity to make sure it's resolved first
                    'identity',
                    'service.authorization',
                    function(identity, authorizationService) {
                        return authorizationService.isRouteAllowed('user', 'read');
                    }
                ]
            }
        });
    }
).controller( 'UserListController', [
    '$scope', 
    'service.users',
    'identity',
    function UserListController($scope, userService, identity) {
        var collection;
        userService.find().then(
            function(users) {
                collection = users;
                $scope.users = collection.get();
            },
            function(err) {
                console.log('Error getting user list', err);
            }
        );
    }
]);