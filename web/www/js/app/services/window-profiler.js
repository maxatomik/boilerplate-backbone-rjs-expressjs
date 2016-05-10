define([

    'backbone',
    'mobileDetect',
    'mousewheel',
    'scrollTo'

], function(Backbone, MobileDetect) {

        'use strict';
        
        var windowProfiler = _.extend({}, Backbone.Events, {

            initialize: function() {

                this.md = new MobileDetect(window.navigator.userAgent);
                this.$window = $(window);
                this.$html = $('body');

                this.$window.on('resize', _.bind(this.updateSize, this));
                this.$window.on('mouseout', _.bind(this.onMouseout, this));
                this.$window.on('keydown', _.bind(this.onKeyDown, this));
                this.$window.on('scroll', _.bind(this.onScroll, this));
                this.$window.on('touchstart', _.bind(this.onTouchstart, this));
                this.$window.on('touchmove', _.bind(this.onTouchmove, this));
                this.$window.on('touchend', _.bind(this.onTouchend, this));
                this.$window.on('mousewheel', _.bind(this.onMousewheel, this));

                this.updateSize();
            },

            onMouseout: function(e) {
                this.trigger('window:mouseout', e);
            },

            onScroll: function (e) {
                this.trigger('window:scroll', this.$window.scrollTop());
            },

            getScrollPos: function() {
                return this.$window.scrollTop();
            },

            onTouchstart: function (e) {
                this.trigger('window:touchstart', e);
            },

            onTouchmove: function (e) {
                this.trigger('window:touchmove', e);
            },

            onTouchend: function (e) {
                this.trigger('window:touchend', e);
            },

            onMousewheel: function (e) {
                this.trigger('window:mousewheel', e);
            },

            updateSize: function() {
                var windowSize = this.getWindowSize();
                this.trigger('window:resize', windowSize);
            },

            getWindowSize: function() {
                this.windowSize = {
                    width: window.innerWidth,
                    height: window.innerHeight
                };

                return this.windowSize;
            },

            supportCanvas: function() {
                var el = document.createElement('canvas');
                return(el.getContext && el.getContext('2d'));
            },

            isMobile: function() {
                return !!this.md.mobile() && !this.md.tablet();
            },

            isTablet: function() {
                return !!this.md.tablet();
            },

            getDeviceType: function() {
                var device = this.isMobile() ? 'mobile' :
                    this.isTablet() ? 'tablet' : 'desktop';

                return device;
            },

            lockScroll: function() {
                this.$html.addClass('no-scroll');
            },

            onKeyDown: function (e) {
                this.trigger('window:keydown', e.keyCode);
            },

            unlockScroll: function() {
                this.$html.removeClass('no-scroll');
            },

            isRetina: function() {
                return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)').matches)) || (window.devicePixelRatio && window.devicePixelRatio >= 2)) && /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
            },

            scrollTo: function(value, time) {
                time = isNaN(time) ? 1 : time;
                TweenMax.to($(window), time, {scrollTo: {y: value, x: 0}, ease: Power2.easeOut});
            },

            supportCSSAnimation: function () {
                var animation = false,
                    animationstring = 'animation',
                    keyframeprefix = '',
                    domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
                    pfx  = '',
                    elm = document.createElement('div');

                if( elm.style.animationName !== undefined ) { animation = true; }    

                if( animation === false ) {
                  for( var i = 0; i < domPrefixes.length; i++ ) {
                    if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
                      pfx = domPrefixes[ i ];
                      animationstring = pfx + 'Animation';
                      keyframeprefix = '-' + pfx.toLowerCase() + '-';
                      animation = true;
                      break;
                    }
                  }
                }

                return animation;
            }
        });

        return windowProfiler;

    }
);