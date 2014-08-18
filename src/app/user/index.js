angular.module( 'user', [
    'three-column',
    'user.profile-widget',
    'user.list',
    'user.create',
    'user.modify',
    'ui.inflector'
]).config(
    function config( $stateProvider) {
        $stateProvider.state({
            name: 'three-column.user',
            abstract: true,
            views: {
                'main': {
                    controller:'UserController',
                    templateUrl: 'user/templates/index.tpl.html'
                },
                'header': {
                    templateUrl: 'user/templates/header.tpl.html'
                },
                'contextAddButton': {
                    templateUrl: 'user/templates/context-add.tpl.html'
                }
            },
            resolve: {
                authenticated: [
                    'service.authentication',
                    function(authService) {
                        if (!authService.isAuthenticated()) {
                            throw {
                                name: 'Not Authenticated',
                                message: 'Not allowed to be here',
                                code: 401
                            };
                        }

                        return authService.getIdentity();
                    }
                ],
                identity: [
                    'service.authentication',
                    'authenticated',
                    function(authService, authenticated) {
                        return authService.getIdentity();
                    }
                ]
            }
        });
    }
).controller( 'UserController', 
    [ '$scope', 
    function UserController($scope) {
    }
]);