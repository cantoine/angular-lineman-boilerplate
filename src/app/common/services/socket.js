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
            ByteBuffer = dcodeIO.ByteBuffer,
            connectedBus = new Bacon.Bus(),
            receiveListeners= [],
            api = {
                retryTimeout: 10000,
                ready: false,
                connected: connectedBus.toProperty(false),
                listenToRoom: function(room, force) {
                    if (!room) {
                        return;
                    }
                    
                    if (!_.contains(rooms, room) || force) {
                        api.publish(
                            new MessageModel(
                                {
                                    event: 'listenToRoom',
                                    room: room
                                }
                            )
                        );

                        if (_.indexOf(rooms, room) === -1) {
                            rooms.push(room);
                        }
                    }
                },
                silenceRoom: function(room) {
                    api.queryStream.push(
                        new MessageModel(
                            {
                                event: 'silenceRoom',
                                room: room
                            }
                        )
                    );

                    _.pull(rooms, room);
                },
                addRequiredParam: function(param, value) {
                    params[param] = value;
                },
                publish: function(data, cb) {
                    if (!cb) {
                        cb = function(result) {
                            if (result.resultCode !== 0) {
                                console.error('Error Sending: ', sendInfo);
                            }
                        };
                    }

                    _.forEach(params, function(value, key) {
                        if (!data.params[key]) {
                            data.params[key] = value;
                        }
                    });

                    console.log('Publish: ', data);

                    var string = data.toString() + '\r\n';
                    data = str2ab(string);

                    chrome.sockets.tcp.send(socketId, data, cb);             
                    // Not sure why but something goes funky when we create 
                    // the buffer with the ByteBuffer lib. Don't want to spend more time
                    // finding the reason for this currently but should come back to it 
                    // at another time.
                    /*var bb = new ByteBuffer();
                    bb.writeLString(data.toString() + '\r\n').flip();

                    console.log('Sending: ', bb.toArrayBuffer(), data.toString());

                    chrome.sockets.tcp.send(socketId, bb.toArrayBuffer(), function(result) {
                        console.log('Result: ', result);
                    });*/
                },
                addReceiveListener: function(fn) {
                    receiveListeners.push(fn);
                },
                addReceiveErrorListener: function(fn) {
                    return chrome.sockets.tcp.onReceiveError.addListener(fn);
                }
            };

        // Need to find a way to not have to delay the connected var.
        // This fires up our queue so the delay isn't great when the 
        // socket is able to connect faster
        api.connected.delay(500).subscribe(
            function(connected) {
                api.ready = connected.value();
            }
        );

        var buffer = [],
            data = '';

        chrome.sockets.tcp.onReceive.addListener(
            function (info) {
                data += ab2str(info.data);

                var index, json;

                while((index = data.indexOf('\r\n')) > -1) {
                    json = data.slice(0, index);
                    data = data.slice(index + 2);
                    if(json.length > 0) {
                        try {
                            notifyListeners(JSON.parse(json));
                        } catch(e) {
                            chrome.notifications.create(
                                '',
                                {
                                    type: 'basic',
                                    title: 'Communication Error',
                                    message: 'Unable to parse the response from the server',
                                    iconUrl: "assets/warning_blue.png"
                                },
                                function(id) {
                                    console.log('Notification');
                                }
                            );

                            notifyListeners({
                                status: 'error',
                                data: 'Communication Error with the server'
                            });

                            console.error(e);
                        }
                    }
                }
            }
        );

        // Default error listener used for auto-reconnect
        api.addReceiveErrorListener(
            function(result) {
                console.log('Got an error: ', result);
                // Lost our connection
                if (result.resultCode === -100) {
                    connectedBus.push(false);
                    $timeout(connect, api.retryTimeout);
                }
            }
        );

        function notifyListeners(response) {
            receiveListeners.forEach(
                function(listener) {
                    listener(response);
                }
            );
        }

        function ab2str(buffer) {
            var array = new Uint8Array(buffer),
                str = '';

            for (var i = 0; i < array.length; ++i) {
                str += String.fromCharCode(array[i]);
            }

            return str;
        }

        function str2ab(str) {
            var buf = new ArrayBuffer(ByteBuffer.calculateUTF8Bytes(str)),
                bufView = new Uint8Array(buf);

            for (var i = 0, strLen = str.length; i < strLen; i++) {
                bufView[i] = str.charCodeAt(i);
            }

            return buf;
        }

        function connect() {
            chrome.sockets.tcp.create({}, function(createInfo) {
                socketId = createInfo.socketId;
                chrome.sockets.tcp.connect(
                    socketId,
                    apiHost,
                    5000,
                    function(result) {
                        if (result === 0) {
                            console.log('Connected!');
                            connectedBus.push(true);
                            subscribe();
                        } else {
                            console.error('Connection Error: ', result);
                            $timeout(connect, api.retryTimeout);
                        }
                    }
                );
            });
        }

        function subscribe() {
            _.forEach(rooms, function(room) {
                api.listenToRoom(room, true);
            });
        }

        connect();

        return api;
    }
]);