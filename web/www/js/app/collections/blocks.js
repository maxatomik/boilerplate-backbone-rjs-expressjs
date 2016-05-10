define([
    'backbone'
    , 'models/block'
    
], function(Backbone, Block) {
    
    var Blocks = Backbone.Collection.extend({
        model: Block,
        
        initialize: function() {}
    });
    
    return Blocks;
});