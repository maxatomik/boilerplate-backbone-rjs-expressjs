define([
    'backbone'
    
], function(Backbone) {
    
    var Asset = Backbone.Model.extend({
        
        defaults: {
            type: null,
            path: null,
            loaded: false,
            tag: null
        }
    });
    
    return Asset;
});