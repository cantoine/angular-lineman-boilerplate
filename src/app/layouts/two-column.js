angular.module( 'two-column', [])
.config(
    function config( $stateProvider) {
        $stateProvider.state({
            name: 'two-column',
            abstract: true,
            views: {
                'layout': {
                    controller: 'TwoColumnController',
                    templateUrl: 'layouts/templates/two-column.tpl.html'
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
).controller( 'TwoColumnController', 
    [ '$scope', 
    function TwoColumnController($scope) {
    }
]);