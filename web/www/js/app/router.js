define([

    'backbone',

    'services/views-handler',
    'services/window-profiler',
    'services/server-handler',
    'services/loader',
    'services/tracker',
    'collections/assets',
    'collections/pages',
    'views/footer'

], function(
        Backbone,
        viewsHandler,
        windowProfiler,
        serverHandler,
        Loader,
        tracker,
        AssetsCollection,
        PagesCollection,
        FooterView
    ) {

    'use strict';

    var Router = Backbone.Router.extend({

        routes: {
            '': 'onHomepage',
            'page/:slug': 'onPage',
            '*path': 'on404'
        },

        initialize: function () {

            // Click listener on all document
            $(document).on('click', 'a', _.bind(this.onClick, this));

            // Save html
            this.$main = $('#main');
            Backbone.router = this;

            // Services init
			windowProfiler.initialize();
            tracker.initialize();
            viewsHandler.initialize({$el: this.$main});

            // Qualities collection


            $('body').show();

            this.history = [];
            this.on('route', _.bind(function(e) {
                this.history.push(Backbone.history.fragment);
                if (this.history.length > 2) {
                    this.history.shift();
                }
            }, this));


            $( "h1, p, span" ).blur(function( event ) {

                serverHandler['edit']({"path":window.location.pathname, "id" : $(this).attr("id"), "value": $(this).text()});
           
            });
        },


        onHomepage: function (html, page) {


            viewsHandler.getTransition(html, views, 'homepage', false, true);
        },

       

        on404: function () {
            console.log('404 page not found !');
        },
        onClick: function (e) {

            var $link = $(e.currentTarget),
                href = $link.attr('href');

            // Not a mailto link
            if (!(/^(tel|mailto):/).test(href)) {
                if (this.isInternalLink(href)) {

                    // Block link click and navigate
                    // to the link URL via the router
                    e.preventDefault();
                    this.navigate(href, true);

                // If # href, just prevent it !
                } else if ((/^\s*\#?\s*$/).test(href)) {
                    e.preventDefault();
                }
            }
        },

        isInternalLink: function(link) {
            // INTERNAL LINKS CHECK
            // if internal link
            // AND not http(s): link
            // AND not files: link
            return (
                (/^((\.?\/)?\w)|(\/)/).test(link) &&
                !(/^\.?\/files\//).test(link) &&
                !(/^http(?:s)?:\/\//).test(link)
            );
        },

        execute: function (callback, args, name) {

            if (this.init && history.pushState) {

                this.init = false;
                args.unshift(this.html);
                callback.apply(this, args);

            } else {
                var url = window.location.href.replace('#', '');

                $.ajax(url, {
                    method : 'GET',
                    dataType : 'html'/*,
                    data: 'layout=false'*/
                })
                .done(_.bind(function(html) {
                    args.unshift($('<div/>').append(html));
                    callback.apply(this, args);

                }, this))
                .fail(_.bind(function() {

                    console.error(arguments);

                },this));

            }
        }
    });

    return {
        initialize : function() {
            var router = new Router();
        }
    };
});