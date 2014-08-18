angular.module( 'dashboard', [
    'templates',
    'ui.router',
]).config(
    function config( $stateProvider) {
        $stateProvider.state({
            name: 'dashboard',
            url: '/dashboard',
            views: {
                'main': {
                    controller:'DashboardController',
                    templateUrl: 'dashboard/templates/dashboard.tpl.html'
                }
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
).controller( 'DashboardController',[
    '$scope', 
    function DashboardController($scope) {
        console.log('Dashboard Controller');
    }
]);