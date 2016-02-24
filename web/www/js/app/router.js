define([

    'backbone'
    , 'services/views-handler'
    , 'services/window-profiler'
    , 'services/server-handler'
    , 'services/tracker'
    , 'views/header'
    , 'views/footer'
    , 'views/oauth'
    , 'views/page01'
    , 'views/page02'
	, 'views/page03'
    , 'views/page04'

], function(
        Backbone,
        viewsHandler,
        windowProfiler,
        serverHandler,
        tracker,
        HeaderView,
        FooterView,
        OauthView,
        Page01View,
        Page02View,
        Page03View,
		Page04View
    ) {

    var Router = Backbone.Router.extend({
        routes: {
            '': 'onPage01',
            'page-02': 'onPage02',
            'page-03/:id': 'onPage03',
            'page-04': 'onPage04'
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

        onPage01: function(html) {
            
            this.headerView = this.headerView || new HeaderView();
            this.page01View = this.page01View || new Page01View();
            this.footerView = this.footerView || new FooterView();
            this.oauthView = this.oauthView || new OauthView();

            var views = [this.headerView, this.page01View, this.footerView, this.oauthView];

            viewsHandler.getTransition(html, views, 'page-01');
        },

        onPage02: function(html) {
            
            this.headerView = this.headerView || new HeaderView();
            this.page02View = this.page02View || new Page02View();
            this.footerView = this.footerView || new FooterView();

            var views = [this.headerView, this.page02View, this.footerView];

            viewsHandler.getTransition(html, views, 'page-02');
        },

        onPage03: function(html, id) {
            
            this.headerView = this.headerView || new HeaderView();
            this.page03View = this.page03View || new Page03View();
            this.footerView = this.footerView || new FooterView();

            var views = [this.headerView, this.page03View, this.footerView];

            viewsHandler.getTransition(html, views, 'page-03');
        },

        onPage04: function(html) {
            
            this.headerView = this.headerView || new HeaderView();
            this.page04View = this.page04View || new Page04View();
            this.footerView = this.footerView || new FooterView();

            var views = [this.headerView, this.page04View, this.footerView];

            viewsHandler.getTransition(html, views, 'page-04');
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