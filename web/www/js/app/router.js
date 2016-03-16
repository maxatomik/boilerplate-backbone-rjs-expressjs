define([

    'backbone'
    , 'services/views-handler'
    , 'services/window-profiler'
    , 'services/server-handler'
    , 'services/tracker'
    , 'views/header'
    , 'views/footer'
    , 'views/oauth'
    , 'views/home'
    , 'views/page'

], function(
        Backbone,
        viewsHandler,
        windowProfiler,
        serverHandler,
        tracker,
        HeaderView,
        FooterView,
        OauthView,
        HomeView,
        PageView
    ) {

    var Router = Backbone.Router.extend({
        routes: {
            '': 'onHome',
            'page/:id': 'onPageById'
        },

        initialize: function() {
            // Empty hash (why ?)
            window.location.hash = "";

            // Services init
			windowProfiler.initialize();
            tracker.initialize();
            viewsHandler.initialize({$el: $('#main')});

            this.init = true;

            // Router starting
			Backbone.history.start({pushState: true});

            // Click listener on all document
            $(document).on('click', 'a', _.bind(this.onClick, this));
        },

         onHome: function(html) {
            this.headerView = this.headerView || new HeaderView();
            this.homeView = new HomeView();
            this.footerView = this.footerView || new FooterView();

            var views = [this.headerView, this.homeView, this.footerView];

            viewsHandler.getTransition(html, views, 'home');
        },

        onPageById: function(html, id) {
            this.headerView = this.headerView || new HeaderView();
            this.pageView = new PageView();
            this.footerView = this.footerView || new FooterView();
            this.oauthView = this.oauthView || new OauthView();

            var views = [this.headerView, this.pageView, this.footerView, this.oauthView];

            viewsHandler.getTransition(html, views, 'page');
        },

        onClick : function(e) {

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

        execute: function(callback, args, name) {
            if(!this.init) {
                $.ajax(window.location.href, {
                    method : 'GET',
                    dataType : 'html'
                }) 
                .done(_.bind(function(html) {

                    args.unshift($('<div/>').append(html));
                    callback.apply(this, args);

                }, this))
                .fail(_.bind(function() {

                    console.error(arguments);

                },this));

            } else {
                this.init = false;
                var html = $(document);

                args.unshift(html);
                callback.apply(this, args);
            }
        }
    });
    
    return {
        initialize : function() {
            var router = new Router();
        }
    };
});