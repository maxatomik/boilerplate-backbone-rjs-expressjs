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
            '/': 'onHomepage',
            'page/:slug/': 'onPage',
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
            //to simpligy
            $.getJSON("/live-edit/is_authorized", function(data) {
                if(data._id !== undefined) {
                    $(document).on('change','#tplchange', function(){
                        var $input = $(this);
                        serverHandler['edit']({"path":window.location.pathname, "id" :"tpl", "value": $input.val()});
                    });

                    
                    $(document).find('p, span, h1, h2, h3, h4, a:not(#tools > a)').attr('contenteditable','true');
                    $(document).find('img').each(function(i) {
                        $(this).append($('<form name="uploader" enctype="multipart/form-data"><input type="file" name="avatar"'+i+'/></form><progress></progress>', this));
                    });
                    $(document).on('change','input[type="file"]', function(){
                        var data = new FormData();
                        data.append("avatar", this.files[0]);
                        data.append("path", window.location.pathname);
                        var $input = $(this);
                        var $img = $input.parents('img');
                        var request = new XMLHttpRequest();
                        request.open("POST", "/live-edit/fileupload");
                        request.send(data);
                        request.onreadystatechange = function() {
                            if (request.readyState == 4 && request.status == 200) {
                                var r = JSON.parse(request.responseText);
                                serverHandler['edit']({"path":window.location.pathname, "id" : $img.data('name'), "value": '/img/uploads/'+r.file.filename});
                                $img.attr('src', '/img/uploads/'+r.file.filename);
                            }
                        };
                    });
                    $(document).on('click','img', function( event ) {
                      $('input[type="file"]', this).click();
                    });
                    $(document).on('click','input[type="file"]', function(e){
                        e.stopImmediatePropagation();
                    });
                    $(document).on('blur','[contenteditable="true"]', function( event ) {
                        serverHandler['edit']({"path":window.location.pathname, "id" : $(this).data("name"), "value": $(this).text()});
                    });
                }
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