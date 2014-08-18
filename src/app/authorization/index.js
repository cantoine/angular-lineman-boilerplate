angular.module( 'not-authorized', [
    'two-column'
]).config(
    function config( $stateProvider) {
        $stateProvider.state({
            name: 'two-column.not-authorized',
            url: '/not-authorized',
            views: {
                'main': {
                    controller:'NotAuthorizedController',
                    templateUrl: 'authorization/templates/not-authorized.tpl.html'
                },
                'header': {
                    templateUrl: 'authorization/templates/header.tpl.html'
                },
            },
            resolve: {
                authenticated: [
                    'service.authentication',
                    function(authService) {
                        return authService.isAuthenticated();
                    }
                ]
            }
        });
    }
).controller( 'NotAuthorizedController', [
    '$scope', 
    '$state',
    function NotAuthorizedController($scope, $state) {
    }
]);