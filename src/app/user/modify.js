angular.module( 'user.modify', [
    'user',
    'service.users',
    'service.roles'
]).config(
    function config( $stateProvider) {
        $stateProvider.state({
            name: 'three-column.user.list.modify',
            url: '/:id/modify',
            views: {
                'detail': {
                    controller:'UserModifyController',
                    templateUrl: 'user/templates/modify.tpl.html'
                }
            },
            resolve: {
                perm: [
                    //DI the identity to make sure it's resolved first
                    'identity',
                    'service.authorization',
                    function(identity, authorizationService) {
                        return authorizationService.isRouteAllowed('user', 'update');
                    }
                ],
                user: [
                    '$stateParams',
                    'service.users',
                    // DI the perm to make sure it's resolved prior
                    'perm',
                    function($stateParams, userService, perm) {
                        return userService.findOne($stateParams.id);
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
).controller( 'UserModifyController', [
    '$scope', 
    '$state',
    'service.notifications',
    'user',
    'roles',
    'resources',
    function UserModifyController($scope, $state, notificationService, user, roles, resources) {
        $scope.roles = roles.get();
        $scope.user = user;
        $scope.notificationFilter = {
            type: 'modify-user'
        };
        $scope.resources = resources;
        $scope.role = user.role;

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

        $scope.delete = function() {
            var notification = {
                type: 'delete-user',
                icon: 'info',
                message: 'Deleting User',
                spinner: true
            };

            notificationService.add(notification);

            $scope.user.delete().then(
                function(res) {
                    $scope.user.close();
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

        $scope.save = function() {
            var notification = {
                type: 'modify-user',
                icon: 'info',
                message: 'Saving User',
                spinner: true
            };

            notificationService.add(notification);

            $scope.user.save().then(
                function(res) {
                    $scope.user.close();
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