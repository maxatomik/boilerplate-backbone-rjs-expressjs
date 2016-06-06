define([
    
    'backbone'
    
], function(Backbone) {
    
    var ServerHandler = _.extend({}, Backbone.Events, {
        initialize: function() {},
        edit: function(data) {
            $.ajax({
                url: '/live-edit',
                type: 'POST',
                data: data
            })
            .done(function() {
                console.log('saved');
            })
            .fail(function() {
                console.log('failed');
            });
        }
    });
    return ServerHandler;
});