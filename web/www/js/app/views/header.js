define([
    'backbone',
    'services/window-profiler'

], function(Backbone, windowProfiler) {

    'use strict';

    var NavView = Backbone.View.extend({
        el: '#header',

        events : function () {
            // Clear previous listeners
            this.stopListening();
            // Add new listeners
            this.listenTo(windowProfiler, 'window:resize', this.onResize);
            this.listenTo(this.model, 'change:canvasHeight', this.onCanvasHeightChange);
            this.listenTo(this.model, 'change:frame', this.onFrameChange);
            this.listenTo(this.model, 'change:category', this.onCategoryChange);
            this.listenTo(this.model, 'change:introFinished', this.onIntroFinished);
        },

        init: true,

        initialize: function () {
            this.isMobile = windowProfiler.isMobile();
            if(window.innerHeight > window.innerWidth && windowProfiler.getDeviceType() === 'tablet'){
                this.isTablet = true;
            }

        },

        positionateNav: function () {
            var $nav = $(".container-nav-home-mobile .nav");
            $nav.css("left", "0px");
            $nav.parent().scrollLeft(0);

            var w1 = $nav.find("a:nth-child(1)").outerWidth();
            var o1 = $nav.find("a:nth-child(1)").offset();
            var o1L = o1.left;
            var w2 = $nav.find("a:nth-child(2)").outerWidth();
            var o2 = $nav.find("a:nth-child(2)").offset();
            var o2L = o2.left;
            var w3 = $nav.find("a:nth-child(3)").outerWidth();
            var o3 = $nav.find("a:nth-child(3)").offset();
            var o3L = o3.left;
            var w4 = $nav.find("a:nth-child(4)").outerWidth();
            var wScreen = windowProfiler.getWindowSize().width;
            var nw = w1+w2+w3+w4+1;
            var index = $nav.find("a.active").index();
            var np = 0;

            $nav.css("width", nw+"px");

            if(index == 0){
                np = (wScreen / 2) - (w1 / 2);
                $nav.css("left", np+"px");
                np = (wScreen / 2) - (w1 / 2);
                $nav.parent().scrollLeft(0);
            }
            if(index == 1){
                np = w1 - (wScreen / 2) + (w2 / 2);
                $nav.parent().scrollLeft(np);
            }
            if(index == 2){
                np = w1 + w2 - (wScreen / 2) + (w3 / 2);
                $nav.parent().scrollLeft(np);
            }
            if(index == 3){
                np = w1 + w2 + w3 - (wScreen / 2) + (w4 / 2);
                $nav.parent().scrollLeft(np);
            }
        },

        onCategoryChange: function (e) {

            // Update category data because of intro
            var $nav = $(".container-nav-home-mobile .nav");
            var category = this.model.get('targetCategory');

            console.log("category",category)

            var categoriesLength = this.model.get('categoriesLength') - 1;

            if(category != -1) {
                $nav.find("a").removeClass("active");
                $nav.find("a").eq(category).addClass("active");
                this.positionateNav();
            }

            var left = (this.categoryWidth / 2) - this.categoryWidth * category;
            var time = this.init
                ? 0
                : .3;

            this.init = false;
            TweenMax.to(this.$nav, time, {left: left, ease: Power2.easeIn});

            if (this.model.get('category') > 0) {
                //this.$navContainer.show();
            }
        },

        onFrameChange: function (e) {

            var frameID = this.model.get('frame') - this.model.get('introLength');
            var total = this.model.get('framesLength') - this.model.get('introLength') - 1;
            var per = (frameID / total) * 100;

            if (this.isMobile || this.isTablet) {
                this.$progress.css('width', per + '%');
            } else {
                this.$progress.css('height', per + '%');
            }
        },

        onIntroFinished: function () {
            if(!windowProfiler.isMobile() && !this.isTablet){
                this.$navContainer.fadeIn();
                console.log("yeaaaah");
            }
        },

        onRendered: function () {

            this.$nav = this.$('nav');
            this.$navLinks = this.$nav.find('a');
            this.$progress = this.$('.progress');
            this.$navContainer = this.$('.nav-container');

            this.navWidth = 0;
            this.categoryWidth = 0;

            if (this.model.get('category') > 0) {
                //this.$navContainer.show();
            }

            setTimeout(_.bind(function() {
                this.onResize(windowProfiler.getWindowSize());
            }, this), 0);
        },

        onShow: function (deferred) {
            if(windowProfiler.isMobile() || this.isTablet) this.positionateNav();
            deferred.resolve();
        },

        onResize: function (size) {
            var width = Math.round(size.width * .5);

            this.$navLinks.width(width);
            this.$nav.width(width * this.$navLinks.length);

            this.navWidth = this.$nav.width();
            this.categoryWidth = this.navWidth / this.$navLinks.length;

            this.$navContainer.css('top', (this.$el.height() - this.$navContainer.height()) / 2);

            //this.onCategoryChange();
            if(window.innerHeight > window.innerWidth && windowProfiler.getDeviceType() === 'tablet'){
                this.isTablet = true;
            }

            if(windowProfiler.isMobile() || this.isTablet){
                this.positionateNav();
            }
        },

        onCanvasHeightChange: function() {
            var size = windowProfiler.getWindowSize();
            var height = (size.height - this.model.get('canvasHeight')) / 2;
            if (this.isMobile || this.isTablet) {
                this.$el.height(size.width*0.125+'px');
            }
        }
    });

    return NavView;
});