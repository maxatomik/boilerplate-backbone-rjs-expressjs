'use strict';

define([
    
    'backbone'

], function(Backbone) {

    var HomeView = Backbone.View.extend({

        tagName: 'section',
        id: 'home',

        initialize: function() {
            console.log('init');
        }
    });

    return HomeView;
});