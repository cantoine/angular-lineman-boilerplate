angular.module( 'collection.base', [
    'model.user'
]).factory('collection.base', [
    'service.event-manager',
    'service.socket',
    function(eventManagerService, socketService) {
        var Base;

        return Base = (function() {
            function Base(upStream, downStream, data) {
                if (!upStream || !downStream) {
                    throw new Error('Upstream and Downstream channels are required');
                }

                this.upStream = new Bacon.Bus();
                this.downStream = downStream;

                // Watch for values in the upStream and 
                // push them into our parent
                this.upStream.onValue(function(event) {
                    // The event could be decorated with information about us
                    // before pushing to parent.
                    return upStream.push(event);
                });

                this.models = [];
                this.buildCollection(data);
            }

            Base.prototype.buildCollection = function(data) {
                var self = this;

                this.models = data.map(
                    function(item) {
                        return new self.model(self.upStream, self.downStream, item);
                    }
                );
            };

            Base.prototype.query = function(message) {
                return this.upStream.push(message);
            };

            Base.prototype.remove = function(index) {
                delete this.models[index];
                this.models = _.compact(this.models);
            };

            Base.prototype.get = function() {
                return this.models;
            };

            // Need to adjust this to search the models fo the specified id vs index
            Base.prototype.getOne = function(index) {
                return this.models[index];
            };

            Base.prototype.splice = function(index, data) {
                this.models.splice(index, 0, new this.model(eventManagerService.queryStream, eventManagerService.eventStream, data));
            };

            Base.prototype.append = function(data) {
                this.models.push(new this.model(eventManagerService.queryStream, eventManagerService.eventStream, data));
                return this;
            };

            Base.prototype.prepend = function(data) {
                this.models.splice(0, 0, new this.model(eventManagerService.queryStream, eventManagerService.eventStream, data));
                return this;
            };

            Base.prototype.open = function() {
                socketService.listenToRoom(this.room);
            };

            /*Base.prototype.close = function() {
                socketService.silenceRoom(this.room);
            };*/

            Base.prototype.close = function() {
                return this.models.map(function(model) {
                    model.close();
                });
            };

          return Base;

        })();
    }
]);