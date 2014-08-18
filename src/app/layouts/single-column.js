angular.module( 'single-column', [])
.config(
    function config( $stateProvider) {
        $stateProvider.state({
            name: 'single-column',
            abstract: true,
            views: {
                'layout': {
                    controller: 'SingleColumnController',
                    templateUrl: 'layouts/templates/single-column.tpl.html'
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
).controller( 'SingleColumnController', 
    [ '$scope', 
    function SingleColumnController($scope) {
    }
]);