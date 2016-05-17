require.config({
  urlArgs: 'bust=' + new Date().getTime(),
  paths: {
    underscore: 'libs/underscore/underscore',
    jquery: 'libs/jquery/jquery',
    backbone: 'libs/backbone/backbone',
    text: 'libs/requirejs-text/text',
    templates: '../../templates',
    mobileDetect: 'libs/mobile-detect/mobile-detect',
    mousewheel: 'libs/jquery-mousewheel/jquery.mousewheel',
    tweenMax: 'libs/GreenSock-JS/src/minified/TweenMax.min',
    scrollTo: 'libs/GreenSock-JS/src/minified/plugins/ScrollToPlugin.min',
    jcounter : 'libs/jquery.counter'
  },
  shim: {
  	backbone: {
  		deps: [ 'underscore', 'jquery'],
  		exports: 'Backbone'
  	},
    mobileDetect: {
        exports: 'MobileDetect'
    },
    mousewheel: {
      deps: ['jquery']
    },
    scrollTo: {
      deps: ['tweenMax']
    },
    jcounter: {
        deps: ['jquery']
    }
  }
});

require([
    'app'

], function(App) {
    App.initialize();
});