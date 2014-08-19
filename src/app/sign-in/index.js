angular.module( 'sign-in', [
    'templates',
    'ui.router',
    'single-column',
    'service.users',
    'service.authentication'
]).config(
    function config( $stateProvider) {
        $stateProvider.state({
            name: 'single-column.sign-in',
            url: '/sign-in',
            views: {
                'main': {
                    controller:'SignInController',
                    templateUrl: 'sign-in/templates/sign-in.tpl.html'
                }
            },
            resolve: {
            }
        });
    }
).controller( 'SignInController', [
    '$scope', 
    '$state',
    'service.authentication',
    'service.notifications',
    function SignInController($scope, $state, authService, notificationService) {
        // Get the identity and find out what the users role is
        authService.getIdentity().then(
            function(identity) {
                if (identity.role !== 'guest') {
                    $state.go('three-column.product.list');
                    return;
                }
            }
        );

        $scope.notificationFilter = {
            type: 'sign-in'
        };

        $scope.login = {
            username: '',
            password: ''
        };

        $scope.error = null;

        $scope.signin = function() {
            notificationService.add(
                {
                    type: 'sign-in',
                    message: 'Signing In',
                    spinner: true
                }
            );

            $scope.error = null;
            authService.authenticate($scope.login).then(
                function(identity) {
                    notificationService.remove({
                        type: 'sign-in'
                    });
                    $state.go('three-column.product.list');
                },
                function(err) {
                    $scope.error = err.message;
                    notificationService.remove({
                        type: 'sign-in'
                    });
                }
            );
        };
    }
]);