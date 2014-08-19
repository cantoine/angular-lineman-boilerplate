angular.module( 'service.socket', [
    'service.event-manager',
    'service.uuid'
]).factory('service.socket', [
    '$rootScope',
    '$q',
    '$timeout',
    '$log',
    'model.message',
    'API_HOST',
    function($rootScope, $q, $timeout, $log, MessageModel, apiHost) {
        var rooms = [],
            params = {},
            socketId,
            receiveListeners= [],
            api = {
            };

        return api;
    }
]);