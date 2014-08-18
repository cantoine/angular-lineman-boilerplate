angular.module( 'sign-out', [
    'service.authentication',
]).config(
    function config( $stateProvider) {
        $stateProvider.state({
            name: 'single-column.sign-out',
            url: '/sign-out',
            views: {
                'main': {
                    controller: 'SignOutController'
                }
            }
        });
    }
).controller( 'SignOutController', [
    '$scope', 
    '$state',
    'service.authentication',
    function SignOutController($scope, $state, authService) {
        console.log('Sign Out Controller');
        authService.signOut().then(
            function() {
                $state.go('single-column.sign-in');
            },
            function(err) {
                console.error(err);
            }
        );
    }
]);