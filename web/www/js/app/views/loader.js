define([
    
    'backbone',
    'text!templates/loader.html',
    'services/window-profiler',
    'services/size-handler',
    'tweenMax'
    
], function(Backbone, tmp, windowProfiler, sizeHandler) {

    'use strict';
    
    var LoaderView = Backbone.View.extend({
        
        id: 'loader',
        template: _.template(tmp),
        total: 0,
        count: 0,

        initialize: function (options) {
            this.options = options;

            this.listenTo(windowProfiler, 'window:resize', this.onResize);
            this.listenTo(this.collection, 'change:loaded', this.onLoadedAssetsChange);
        },
        
        render: function () {
            this.$el.html(this.template({isMobile: windowProfiler.isMobile()}));
            
            this.$bar = this.$('.bar');
            this.$counter = this.$('.counter strong');
            this.$l1 = this.$('h1 .l-1');
            this.$l2 = this.$('h1 .l-2');
            this.$box = this.$('.box');
            this.$bottom = this.$('.bottom');
            this.$bottomLeft = this.$bottom.find('.left');
            this.$bottomCenter = this.$bottom.find('.center');
            this.$bottomRight = this.$bottom.find('.right');
            this.$bg = this.$('.bg');
            this.$progress = this.$('.progress-bar');

            var bgURL = '/img/sequence/' + (windowProfiler.isMobile() ? '640x360' : '1920x1080') + '/img-000.jpg';
            //this.$bg.css('background-image', 'url(' + bgURL + ')');
            this.preloadSetBox(bgURL);

            setTimeout(_.bind(function() {
                this.onResize(windowProfiler.getWindowSize());
            }, this), 0);

            return this.$el;
        },

        preloadSetBox: function (url) {
            $('<img/>').attr('src', url).load(_.bind(function() {
               $(this).remove(); // prevent memory leaks
              this.$bg.css('background-image', 'url(' + url + ')');
            }, this));
        },

        onLoadedAssetsChange: function () {
            var loadedPercent = (this.collection.where({loaded: true}).length / this.collection.length) * 100;
            this.$progress.width(loadedPercent + '%');
        },

        onShow: function () {
            var self = this;
            var min = this.$bottomRight.find('li').length;
            var count = 1;
            var loopDelay = 0.75;

            // Title line 1
            /*TweenMax.from(this.$l1, .5, {x: "-=100",ease: Back.easeOut});
            TweenMax.to(this.$l1, .2, {opacity: 1, delay: .1, ease: Back.v});*/
            TweenMax.to(this.$l1, 1.5, {opacity: 1});

            // Title line 2
            /*TweenMax.from(this.$l2, .5, {x: "-=100", delay: .15, ease: Back.easeOut});
            TweenMax.to(this.$l2, .2, {opacity: 1, delay: .25, ease: Back.easeOut});*/
            TweenMax.to(this.$l2, 1.5, {opacity: 1});

            // Box
            TweenMax.to(this.$bg, 1.5, {opacity: 1});
            //TweenMax.from(this.$box, .8, {scale: .5, opacity: 0, delay: .5, ease: Back.easeOut});

            var t = 1.5;

            // Bottom left
            //TweenMax.from(this.$bottomLeft, .5, {x: '-=50', opacity: 0, delay: t, ease: Back.easeOut});
            TweenMax.from(this.$bottomLeft, .5, {opacity: 0, delay: t});

            // Bottom center
            //TweenMax.from(this.$bottomCenter, .5, {scale: 2, opacity: 0, delay: t + 0.15, ease: Back.easeOut});
            TweenMax.from(this.$bottomCenter, .5, {opacity: 0, delay: t + 0.15});

            // Bottom right
            //TweenMax.from(this.$bottomRight, .5, {x: '+=50', opacity: 0, delay: t, ease: Back.easeOut, onComplete: function() {
            TweenMax.from(this.$bottomRight, .5, {opacity: 0, delay: t, onComplete: function() {
                loop();
            }});

            function loop() {
                var $l1 = self.$bottomRight.find('.active');
                var $l2 = $l1.next().length ? $l1.next() : self.$bottomRight.find('li').eq(0);

                $l1.add($l2).attr('style', '').css('opacity', 1);

                //TweenMax.to($l2, 0, {y: -50, opacity: 0});
                TweenMax.to($l2, 0, {opacity: 0});

                /*TweenMax.to($l1, .25, {y: 50, opacity: 0, delay: loopDelay, ease: Back.easeOut});
                TweenMax.to($l2, .25, {y: 0, opacity: 1, delay: loopDelay, ease: Back.easeOut, onComplete: function () {*/
                TweenMax.to($l1, .75, {opacity: 0, delay: loopDelay});
                TweenMax.to($l2, .75, {opacity: 1, delay: loopDelay, onComplete: function () {
                    count++;
                    $l2.addClass('active');
                    $l1.removeClass('active');

                    if (self.collection.where({loaded: true}).length < self.options.min || count < min) {
                        loop();
                    } else if (count >= min) {
                        setTimeout(function() {
                            self.trigger('preloading:finished');
                        }, loopDelay * 1000);
                    }
                }});
            }
        },

        onHide: function () {
            var self = this;

            this.$el.fadeOut(function () {
                self.remove();
            });
        },

        onResize: function (size) {
            this.$el.height(size.height);
            sizeHandler.cover(this.$el, this.$box, 1.777777777777778);
        }
    });
    
    return LoaderView;
});