angular.module( 'model.message', [
    'service.uuid'
]).factory('model.message',[
    '$q',
    'service.uuid',
    function($q, uuidService) {
        return message = (function() {
            var verbs = [
                'quit',
                'roomChange',
                'roomLeave',
                'roomView',
                'listenToRoom',
                'silenceRoom',
                'detailsView',
                'say'
            ];

            function Message(data, downStream, cb) {
                var self = this;

                this.event = 'action';
                this.params = {
                    guid: uuidService.generate()
                };

                if (data.event) {
                    this.event = data.event;
                    delete data.event;
                }

                if (data.action) {
                    this.params.action = data.action;
                    delete data.action;
                }

                if (data.params) {
                    angular.extend(this.params, data.params);
                } else {
                    angular.extend(this.params, data);
                }

                if (typeof cb === 'function') {
                    downStream.filter(function(message) {
                        return message.guid == self.params.guid;
                    }).onValue(function(message) {
                        cb(message);
                        // Messages are self-destructing once they get 
                        // a response they die off.
                        return Bacon.noMore;
                    });
                }
            }

            Message.prototype.toString = function() {
                // There are specific verbs that AH responds to that can't be
                // execute via a json payload
                if (_.contains(verbs, this.event)) {
                    var ret = this.event;
                    _.forEach(this.params, function(item, key) {
                        if (key !== 'guid') {
                            ret += ' ' + item;
                        }
                    });
                    return ret.trim();
                }

                var data = {
                    event: this.event,
                    params: {}
                };

                _.forEach(this.params, function(item, key) {
                    data.params[key] = item;
                });

                return JSON.stringify(data);
            };

            return Message;
        })();
    }
]);