define([

    'backbone'
	, 'collections/assets'
	, 'views/loader'

], function(
	Backbone,
	Assets,
	LoaderView
) {
	'use strict';

	var Loader = function() {};
		
	_.extend(Loader.prototype, Backbone.Events, {
		
		count: 0,
		assets: [],
		
		loadCollection: function (collection, options) {
			this.options = options;
			this.options.start = this.options.start || 0;
			this.collection = collection;
			var self = this;

			if (!this.collection || !this.collection.length || !this.options) {
				throw new Error('Invalid parameters !');
			}

			var timestamp = window.performance.now();
			var loadingOrder = this.getLoadingOrder();
			var minFrameToLoad = this.getMinFrameToLoad();

			if (this.options.$loaderEl && this.options.$loaderEl.length) {
				this.loaderView = new LoaderView({
					collection: collection, 
					min: minFrameToLoad
				});
				this.options.$loaderEl.append(this.loaderView.render());
				if (this.loaderView.onShow) {
					this.loaderView.onShow();
				}
			}

			this.listenTo(this.loaderView, 'preloading:finished', function () {

				if (self.count >= minFrameToLoad) {
					if (self.loaderView) {

						if (self.loaderView.onHide) {
							self.options.complete();
							self.loaderView.onHide();
						} else {
							self.loaderView.remove();
							self.options.complete();
						}
					}
				}
			});

			//this.checkLoadingOrder(loadingOrder);

			if (options.chapters) {
				startSmallLoading();
			} else {
				startBigLoading();
			}

			// Load each chapter's frame (for direct access)
			function startSmallLoading() {
				var smallCount = 0;

				for (var i = 0; i < options.chapters.length; i++) {

					var model = self.collection.at(options.chapters[i]);
					var src = model.get('path');
					var img = new Image();
						img.src = src;

					img.onload = (function (i, m) {
						return function () {
							smallCount++;
							
							m.set({
								loaded: true,
								tag: i
							});
							
							if (smallCount === options.chapters.length) {
								startBigLoading();
							}
						}
					})(img, model);
				}
			}

			// Load all remaining frames
			function startBigLoading() {
				for (var i = 0; i < loadingOrder.length; i++) {
					var model = self.collection.at(loadingOrder[i]);
					var src = model.get('path');
					var img = new Image();

					img.src = src;
					img.onload = (function (i, m) {
						return function () {
							self.count++;
							m.set({
								loaded: true,
								tag: i
							});
						}
					})(img, model);
				}
			}	
		},

		getMinFrameToLoad: function () {
			var len;

			if (this.options.minFrameToLoad) {
				return this.options.minFrameToLoad;
			} else if (this.options.minChapterToLoad) {
				len = this.options.chapters[this.options.minChapterToLoad]
				if(this.options.minPerToLoad) {
					len = Math.round(len *  this.options.minPerToLoad);
				}
				return len;
			} else {
				return this.collection.length;
			}
		},

		checkLoadingOrder: function (loadingOrder) {
			var copy = _.uniq(loadingOrder);

			for (var i = 0; i < 809; i++) {
				var match = false;
				var index = null;

				for (var ii = 0; ii < loadingOrder.length; ii++) {
					if(loadingOrder[ii] === i) match = true;
				}

				if (!match) console.log(i);
			}
		},
		
		getLoadingOrder: function () {

			var index = 0,
				chapterLen,
				loadingOrder = [],
				pointer = 0,
				chapters = this.options.chapters;

			if (!chapters) {
				// Make two different chapters
				if (this.options.minFrameToLoad) {
					this.options.chapters = [0, this.options.minFrameToLoad, this.collection.length];
				} else {
				// Make one
					this.options.chapters = [0, this.collection.length - 1];
				}
			}

			// Set chapters loading sequence according start point
			var chaptersLoadingOrder = this.getChaptersLoadingOrder(chapters.length - 1, this.options.start);

			for (var i = 0; i < chapters.length - 1; i++) {

				var start = chapters[chaptersLoadingOrder[i]];
				var len = chapters[chaptersLoadingOrder[i] + 1] - start;
				var chapterLoadingOrder = this.getChapterLoadingOrder(start, len);

				loadingOrder = loadingOrder.concat(chapterLoadingOrder);
			}

			return loadingOrder;
		},

		getChaptersLoadingOrder: function (length, current) {
			var chaptersLoadingOrder = [];
			var pointer = current;
			var dir = -1;

			//console.log(current);
			chaptersLoadingOrder.push(current);

			while (chaptersLoadingOrder.length < length) {
				var next = dir === -1 ? findPrev(current) : findNext(current);
				dir = -dir;
			}

			function findNext(start) {

				if (start < length) {
					if (chaptersLoadingOrder.indexOf(start) === -1) {
						chaptersLoadingOrder.push(start);
					} else {
						findNext(start + 1);
					}
				}
			}

			function findPrev(start) {

				if (start >= 0) {
					if (chaptersLoadingOrder.indexOf(start) === -1) {
						chaptersLoadingOrder.push(start);
					} else {
						findPrev(start - 1);
					}
				}
			}

			return chaptersLoadingOrder;
		},

		// Get loading order for a chapter.
		// If there's no chapter, the result of getLoadingOrder() is equal the one of getChapterLoadingOrder()
		getChapterLoadingOrder: function (startIndex, len) {

			// Set temporary array of N size
			var tmpArr = new Array(len);
			// Set final array (empty at the begining)
			var ordenedArr = [];
			
			// Fill first and last index of temporary array
			tmpArr[0] = ordenedArr[0] = startIndex;
			tmpArr[startIndex + len - 1] = ordenedArr[1] = startIndex + len - 1;

			while(ordenedArr.length < len) {
				var pairArr = [];
				
				for(var i = 0; i < tmpArr.length; i++) {
					if(tmpArr[i] != undefined) {
						pairArr.push(tmpArr[i]);
					}
				}
				
				for(i = 0; i < pairArr.length; i++) {
					if(typeof pairArr[i+1] != 'undefined') {
						var newVal = pairArr[i] + Math.round((pairArr[i+1] - pairArr[i])/2);

						if(typeof tmpArr[newVal] === 'undefined') {
							ordenedArr.push(newVal);
							tmpArr[newVal] = newVal;
						}
					}

					if(ordenedArr.length === len) break;
				}
			}

			return ordenedArr;
		},

		loadAssetsBeforeStart: function (collection, $el, cb) {

			// On instancie la vue du loader en lui passant la collection d'assets
			this.loaderView = new LoaderView({collection: collection});
			$el.append(this.loaderView.render());

			// On demande au loader de charger notre collection d'assets
			this.load(collection, _.bind(function() {
				
				// On supprime le loader ainsi que sa vue
				this.loaderView.$el.fadeOut(_.bind(function() {

					this.loaderView.remove();
					delete this.loaderView;
					
					if(typeof cb === 'function') cb();

				}, this));
			}, this));
		},

		load: function (collection, cb) {
			var that = this;
			
			collection.each(function (model, index) {
				if(model.get('type') === 'image') {

					var img = new Image(),
						url = model.get('path');
					
					img.onload = (function (m, i){
						return function() {
							onLoaded(m, i);
						}
					})(model, img)
					img.src = url;
					
				}
			}, this);
			
			function onLoaded(model, tag) {
				that.count++;
				model.set({
					loaded: true,
					tag: tag
				});
				
				if(that.count === collection.length && typeof cb === 'function') {
					cb();
				}
			}
		}
    });

    return Loader;
});