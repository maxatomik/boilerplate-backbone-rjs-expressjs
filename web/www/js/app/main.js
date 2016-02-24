require.config({
  urlArgs: 'bust=' + new Date().getTime(),
  paths: {
    underscore: 'libs/underscore/underscore'
    , jquery: 'libs/jquery/jquery'
    , backbone: 'libs/backbone/backbone'
    , text: 'libs/requirejs-text/text'
    , templates: '../../templates'
    , mobileDetect: 'libs/mobile-detect/mobile-detect'
  },
  shim: {
  	backbone: {
  		deps: [ 'underscore', 'jquery']
  		, exports: 'Backbone'
  	},
    mobileDetect: {
        exports: 'MobileDetect'
    }
  }
});

require([
    'app'

], function(App) {
    App.initialize();
});