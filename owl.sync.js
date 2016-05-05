/**
 * Sync Plugin
 * @version 2.1.0
 * @author Emanuele parisio
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {
	'use strict';

	/**
	 * Creates the sync plugin.
	 * @class The sync Plugin
	 * @param {Owl} carousel - The Owl Carousel.
	 */
	var Sync = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * The carousel element.
		 * @type {jQuery}
		 */
		this.$element = this._core.$element;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'change.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name == 'position') {
					this.createEvent(e,'syncBefore');
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name == 'position') {
					this.update(e.item.index);
					this.createEvent(e,'syncAfter');
				}
			}, this),
		};

		/* set default options */
		this._core.options = $.extend({}, Sync.Defaults, this._core.options);

		/* register event handlers */
		this.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	Sync.Defaults = {
		syncTarget : false
	};

	/**
	 * Updates target carousel state.
	 * @protected
	 */
	Sync.prototype.update = function(position) {
		var settings = this._core.settings;
		$(settings.syncTarget).trigger('to.owl.carousel', [position, settings.navSpeed, true]);
	};

	/**
	 * create event fof to sync callback
	 * @param  {object} e     carousel
	 * @param  {string} event event name
	 */
	Sync.prototype.createEvent = function(e,event) {
		var settings = this._core.settings,
			targetData;
		this._core.trigger(event, {
			syncTarget: { 
				name: settings.syncTarget,
				elements: $(settings.syncTarget),
				position: e.item.index,
			},
		});
	};

	/**
	 * Destroys the plugin.
	 * @protected
	 */
	Sync.prototype.destroy = function() {
		var handler, property;

		for (handler in this._handlers) {
			this.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Sync = Sync;

})(window.Zepto || window.jQuery, window, document);
