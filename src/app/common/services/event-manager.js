angular.module( 'service.event-manager', [
    'model.message',
    'service.hustle',
    'service.socket'
]).config([
    'hustleConfigProvider',
    function(hustleConfigProvider) {
        hustleConfigProvider.addQueue('server-events');
    }
]).factory('service.event-manager', [
    '$rootScope',
    '$q',
    'model.message',
    'service.hustle',
    'service.socket',
    function($rootScope, $q, MessageModel, hustleService, socketService) {
        var eventManager = {
                eventStream: new Bacon.Bus(),
                queryStream: new Bacon.Bus()
            };

        eventManager.queryStream.onValue(handleQueryEvent);

        socketService.connected.delay(500).subscribe(
            function(connected) {
                if (connected.value()) {
                    processQueue();
                }
            }
        );

        socketService.addReceiveListener(function(response) {
            //if (info.socketId != socketId) {
            //    return;
            //}
            console.log('Response: ', response);
            if (!response.context) {
                // If the message doesn't have a context it's not a server reply
                return;
            }

            $rootScope.$apply(function() {
                eventManager.eventStream.push(response);
            });
        });

        function handleQueryEvent(event) {
            if (socketService.ready) {
                checkQueue().then(
                    function(count) {
                        if (count === 0) {
                            return socketService.publish(event);
                        }

                        addToQueue(event);
                    }
                );
            } else {
                addToQueue(event);
            }
        }

        function checkQueue() {
            return hustleService.length('server-events');
        }

        function addToQueue(event) {
            hustleService.put('server-events', event).then(
                function(item) {
                    //console.log('Queued Item: ', item);
                },
                function(err) {
                    console.log('Error: ', err);
                }
            );
        }

        function processQueue() {
            //console.log('Begin Processing commands');
            hustleService.reserve('server-events').then(
                function(item) {
                    if (item !== null) {
                        socketService.publish(new MessageModel(item.data));

                        // Delete the item we just pushed into the bus and 
                        // then check to see if we need have more to process
                        hustleService.delete(item.id);
                        checkQueue().then(
                            function(count) {
                                if (count > 0) {
                                    processQueue();
                                }
                            }
                        );
                    }
                },
                function(err) {
                    console.error(err);
                }
            );
        }

        return eventManager;
    }
]);