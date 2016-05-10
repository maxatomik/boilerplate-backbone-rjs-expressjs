define([
    'backbone'
    , 'models/page'
    
], function(Backbone, Page) {
    
    var Pages = Backbone.Collection.extend({
        model: Page,
        
        initialize: function() {}
    });
    
    return Pages;
});