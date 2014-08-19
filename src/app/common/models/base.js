angular.module( 'model.base', [
    'service.event-manager',
    'service.uuid'
]).factory('model.base', [
    'service.event-manager',
    'service.uuid',
    function(eventManagerService, uuid) {
        var Base;

        return Base = (function() {
            function Base(upStream, downStream, data) {
                /*if (!upStream || !downStream) {
                    throw new Error('Upstream and Downstream channels are required');
                }

                this.upStream = new Bacon.Bus();
                this.downStream = downStream;

                if (!data) {
                    data = {};
                }

                angular.extend(this, data);

                this.listeners = [];
                this.events = new Bacon.Bus();
                this.eventListeners = [];

                // Watch for values in the upStream and 
                // push them into our parent
                this.upStream.onValue(
                    function(event) {
                        // The event could be decorated with information about us
                        // before pushing to parent.
                        return upStream.push(event);
                    }
                );*/
            }

            Base.prototype.getValidation = function() {
                console.log('##### Get Validation #####');
                return false;
            };

            Base.prototype.on = function(name, fn) {
                var listener = this.events.filter(function(message) {
                    return message.name == name;
                }).onValue(function(message) {
                    fn.call(null, message.data);
                });

                this.eventListeners.push(listener);

                return listener;
            };

            Base.prototype.emit = function(name, data) {
                this.events.push(
                    {
                        name: name,
                        data: data
                    }
                );
            };

            Base.prototype.close = function() {
                this.closeListeners();
                this.closeEvents();
            };

            Base.prototype.closeListeners = function() {
                _.forEach(this.listeners, function(listener) {
                    listener();
                });
            };

            Base.prototype.closeEvents = function() {
                _.forEach(this.eventListeners, function(listener) {
                    listener();
                });
            };

            Base.prototype.query = function(message) {
                return this.upStream.push(message);
            };

            Base.prototype.save = function() {
                if (!this._id) {
                    return this.create();
                } else {
                    return this.update();
                }
            };

            Base.prototype.create = function() {
                throw new Error('Create function was not implemented');
            };

            Base.prototype.update = function() {
                throw new Error('Update function was not implemented');
            };

          return Base;

        })();
    }
]);