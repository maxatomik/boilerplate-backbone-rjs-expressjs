'use strict';

define([

    'backbone', 
    'text!templates/footer.jade'

], function(Backbone, tmp) {

    var FooterView = Backbone.View.extend({

        tagName: 'div',
        id: 'footer',
        template: _.template(tmp),

        initialize: function() {},

        render: function() {
            return this.$el.html(this.template);
        },
        onShow: function (deferred) {
            setTimeout(_.bind(function () {
                deferred.resolve();
            }, this), 500);
        },
        onHide: function (deferred) {
            this.$el.removeClass('active');
            setTimeout(_.bind(function () {
                this.remove();
                deferred.resolve();
            }, this), 500);
        },
        events: function () {
            console.log("yo");
        }
    });

    return FooterView;
});