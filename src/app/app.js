window.onerror = function(message, url, line, column, error){
    console.error(error.message);
};

angular.module( 'boilerplate', [
    'ngMessages',
    'templates',
    'ui.bootstrap',
    'ui.router',
    'ui.validate',
    'ui.route',
    'service.notifications',
    'sign-in',
    'sign-out',
    'dashboard',
    'user'
])
.config( [
    '$stateProvider',
    '$urlRouterProvider',
    '$compileProvider',
    '$provide',
    function AppConfig ( $stateProvider, $urlRouterProvider, $compileProvider, $provide) {
        // Redirect to sign-in
        $urlRouterProvider.otherwise( '/sign-in' );
    }
])
.run( [
    '$rootScope',
    '$state',
    'service.event-manager',
    'service.notifications',
    'service.uuid',
    function run($rootScope, $state, socket, notificationService, uuidService) {

        $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){ 
            console.log('State not Found');
            console.log(unfoundState.to);
            console.log(unfoundState.toParams);
            console.log(unfoundState.options);
        });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
            console.log('State Error Event: ', event);
            console.log('Error From: ', fromState, fromParams);
            console.log('Error To: ', toState, toParams);
            if (error.message) {
                console.log('State Change Error: ', error.message);
            } else {
                console.log('State Change Error: ', error);
            }
        });
    }
]);