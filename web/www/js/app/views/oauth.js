define([
    'backbone'
], function(Backbone) {

    var OauthView = Backbone.View.extend({
        el: '#oauth',
        w: "",
        onConnectionProcess : false,
        events : {
			'click .facebook-oauth': 'onFacebook',
            'click .twitter-oauth': 'onTwitter'
        },
        initialize: function(){
           var _self = this;
           $(window).focus(function() {
           		if(_self.onConnectionProcess) {
           			window.location.href = "/";
        			_self.onConnectionProcess = false;
        		}
			}).blur(function() {
	        	console.log(_self.onConnectionProcess)
			});
        },
	    onFacebook: function (e) {
	        var width = 600,
	            height = 300,
	            left = window.screen.width / 2 - width / 2,
	            top = window.screen.height / 2 - height / 2,
	            oauth = 'http://' + window.location.host + ':3300/auth/facebook';
	        this.onConnectionProcess = true;
	        this.w = window.open(oauth, 'popup_facebook', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);
	        e.preventDefault();
	    },
	   	
	    onTwitter: function (e) {
	        var width = 600,
	            height = 300,
	            left = window.screen.width / 2 - width / 2,
	            top = window.screen.height / 2 - height / 2,
	            oauth = 'http://' + window.location.host + ':3300/auth/twitter';
	        this.onConnectionProcess = true;	
	        this.w = window.open(oauth, 'popup_twitter', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);
	        e.preventDefault();
	    }
    });

    return OauthView;
});