angular.module( 'three-column', [])
.config(
    function config( $stateProvider) {
        $stateProvider.state({
            name: 'three-column',
            abstract: true,
            views: {
                'layout': {
                    controller: 'ThreeColumnController',
                    templateUrl: 'layouts/templates/three-column.tpl.html'
                }
            },
            resolve: {
                identity: [
                    'service.authentication',
                    function(authService) {
                        return authService.getIdentity();
                    }
                ]
            }
        });
    }
).controller( 'ThreeColumnController', 
    [ '$scope', 
    function ThreeColumnController($scope) {
        $scope.notificationFilter = {
            type: 'loading'
        };
    }
]);