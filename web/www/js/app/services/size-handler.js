define([
    
    'backbone'
    
], function(Backbone) {
	'use strict';
    
    var SizeHandler = _.extend({}, Backbone.Events, {
        
        initialize: function() {},
		
		cover: function($container, $content, ratio) {
			
			var vch = $container.height(),
				vcw = $container.width(),
				vcr = vcw / vch,
				vr = ratio,
				width,
				height,
				left,
				top;
			
			if(vcr > vr) {
				width = vcw;				
				height = width / vr;
				left = 0;
				top = -(height - vch) / 2;
			} else {
				height = vch;
				width = vr * height;
				left = -(width - vcw) / 2;
				top = 0;
			}
			
			$content.css({
				width: width,
				height: height,
				left: left,
				top: top
			});
		},
		
		contain: function($container, $content, ratio) {
			
			var vch = $container.height(),
				vcw = $container.width(),
				vcr = vcw / vch,
				vr = ratio,
				width,
				height,
				left,
				top;
			
			if(vcr > vr) {
				height = vch;
				width = vr * height;
				left = (vcw - width) / 2;
				top = 0;
			} else {
				width = vcw;
				height = width / vr;
				left = (vcw - width) / 2;
				top = (vch - height) / 2;
			}
			
			$content.css({
				width: width,
				height: height,
				left: left,
				top: top
			});
		},
		
		getDim: function(cW, cH, iW, iH) {
			
			var cR = cW / cH,
				iR = iW / iH,
				left = 0,
				top = 0,
				width = 0,
				height = 0;
			
			if(cR > iR) {
				
				width = cW;
				height = width / iR;
				left = 0;
				top = -(height - cH) / 2;
				
			} else {
				
				height = cH;
				width = iR * height;
				left = -(width - cW) / 2;
				top = 0;
				
			}
			
			var result = {
				sx: 0, 
				sy: 0, 
				sWidth: iW, 
				sHeight: iH, 
				x: left, 
				y: top, 
				width: width, 
				height: height
			};
			
			return result;
		}
    });
    
    return SizeHandler;
});