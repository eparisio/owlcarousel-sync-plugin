/**
 * Sync Plugin
 * @version 2.1.0
 * @author Emanuele parisio
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {
	'use strict';

	/**
	 * Creates the navigation plugin.
	 * @class The Navigation Plugin
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
		 * Indicates whether the plugin is initialized or not.
		 * @protected
		 * @type {Boolean}
		 */
		this._initialized = false;

		/**
		 * The carousel element.
		 * @type {jQuery}
		 */
		this.$element = this._core.$element;

		/**
		 * All event handlers.
		 * @TODO dataTarget of the target for sync event
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'change.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name == 'position') {
					var settings = this._core.settings,
						targetData;
					this._core.trigger('syncBefore', {
						syncTarget: { 
							name: settings.syncTarget,
							elements: $(settings.syncTarget),
							position: e.item.index,
							data: targetData
						},
					});
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.namespace && e.property.name == 'position') {
					this.update(e.item.index);
					var settings = this._core.settings;
					this._core.trigger('syncAfter', { 
						syncTarget: { 
							name: settings.syncTarget,
							elements: $(settings.syncTarget),
							position: e.item.index
						},
					});
				}
			}, this),
		};

		// set default options
		this._core.options = $.extend({}, Sync.Defaults, this._core.options);

		// register event handlers
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
	 * Initializes the plugin and extends the carousel.
	 * @protected
	 */
	Sync.prototype.initialize = function() {
		
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
