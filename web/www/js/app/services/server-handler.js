define([
    
    'backbone'
    
], function(Backbone) {
    
    var ServerHandler = _.extend({}, Backbone.Events, {
        
        initialize: function() {},
        edit: function(data, callback, errorCallback) {
            $.ajax({
                url: '/edit',
                type: 'POST',
                data: data
            })
            .done(function(results) {
                callback.call(this, results);
            })
            .fail(function(results) {
                if(typeof errorCallback === 'function') {
                    errorCallback.call(this, results.responseJSON);
                }
            });
        }
    });
    
    return ServerHandler;
});