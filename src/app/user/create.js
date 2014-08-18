angular.module( 'user.create', [
    'user',
    'service.authorization',
    'service.roles'
]).config(
    function config( $stateProvider) {
        $stateProvider.state({
            name: 'three-column.user.list.create',
            url: '/create',
            views: {
                'detail': {
                    controller:'UserCreateController',
                    templateUrl: 'user/templates/create.tpl.html'
                }
            },
            resolve: {
                perm: [
                    //DI the identity to make sure it's resolved first
                    'identity',
                    'service.authorization',
                    function(identity, authorizationService) {
                        return authorizationService.isRouteAllowed('user', 'create');
                    }
                ],
                roles: [
                    'identity',
                    'service.roles',
                    function(identity, roleService) {
                        return roleService.find();
                    }
                ],
                resources: [
                    'identity',
                    'service.roles',
                    function(identity, service) {
                        return service.getResources();
                    }
                ]
            }
        });
    }
).controller( 'UserCreateController', [
    '$scope',
    '$state',
    'service.users',
    'service.authorization',
    'service.notifications',
    'roles',
    'resources',
    function UserCreateController($scope, $state, usersService, authorizationService, notificationService, roles, resources) {
        $scope.user = usersService.create({ permissions:{} });
        $scope.roles = roles.get();
        $scope.notificationFilter = {
            type: 'create-user'
        };

        $scope.resources = resources;

        $scope.selectRole = function(role) {
            $scope.role = role;
            $scope.user.role = role._id;

            // Reset everything back to false
            angular.forEach($scope.user.permissions, function(permissions, key) {
                $scope.user.permissions[key] = false;
            });

            // Merge the role perms
            angular.forEach(role.permissions, function(permissions, key) {
                $scope.user.permissions[key] = permissions;
            });
        };

        $scope.create = function() {
            var notification = {
                type: 'create-user',
                icon: 'info',
                message: 'Creating User',
                spinner: true
            };

            notificationService.add(notification);

            $scope.user.save().then(
                function(message) {
                    delete $scope.user;
                    notificationService.remove(notification);
                    $state.go('three-column.user.list');
                },
                function(err) {
                    console.warn(err);
                    notificationService.remove(notification);
                }
            );
        };
    }
]);