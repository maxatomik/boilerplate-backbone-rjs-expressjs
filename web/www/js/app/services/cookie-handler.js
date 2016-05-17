define([
    
    'backbone'
    
], function(Backbone) {
    
    var cookieHandler = _.extend({}, Backbone.Events, {
        
        initialize: function() {},
		
		setCookie: function(name, val, exDay) {
			var e = new Date();
				e.setTime(e.getTime() + 10*24*60*60*1000);
			
			document.cookie = name + '=' + val + '; expires=' + e.toUTCString();
		},
		
		getCookie: function(name) {
			var cookies = document.cookie.split(';');
			name = name + '=';
			
			for(var i = 0; i < cookies.length; i++) {
				var c = cookies[i];
				while(c.charAt(0) === ' ') c = c.substring(1);
				if(c.indexOf(name) !== -1) return c.substring(name.length, c.length);
			}
			
			return '';
		},
		
		deleteCookie: function(name) {
			document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}
    });
    
    return cookieHandler;
});