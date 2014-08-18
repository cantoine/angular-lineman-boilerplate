angular.module('exceptionOverride', [
]).factory('$exceptionHandler', function () {
    return function (exception, cause) {
        console.log('Exception: ', exception);
        exception.message += ' (caused by "' + cause + '")';
        //throw exception;
    };
});