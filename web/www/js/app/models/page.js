define([
    'backbone'
    
], function(Backbone) {

    var PageModel = Backbone.Model.extend({

        defaults: {
        	url: null,
        	blocks: null
        }
    });

    return PageModel;
});