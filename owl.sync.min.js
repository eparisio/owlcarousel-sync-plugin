/**
 * @author Luiz Filipe Machado Barni <luizfilipe2557@gmail.com> <@luizfilipe2557>
 * 
 * Inspired by @tonykiefer's script in http://vertx.com/edc-transit-sling
 *
 * @license Copyright (c) 2016 Luiz Filipe Machado Barni
 *
 * @see https://github.com/OwlCarousel2/OwlCarousel2/issues/1350
 * @see https://github.com/OwlCarousel2/OwlCarousel2/issues/1377
 *
 * @description This function was made to supply the need to synchronize two OwlCarousels. E.g.: embed product gallery.
 *
 * @usage Just follow the steps:
 *      1. Construct your exhibition carousel and your nav carousel the way you want.
 *      2. Use jQuery selector (or variable with the carousel Object) and plug the plugin on it, the plugin has an Object parameter.
 *      3. In the Object parameter, put the $(selector) of the nav carousel in the key 'target' or 'syncWith'. See example below:
 *
 *      @example $('.owl-exhibition').owlSync({
 *                   target: $('.owl-nav')
 *               });
 *
 *      4. You can still pass the duration (in milliseconds) of the slide transition and the index of first slide: 
 *
 *      @example $('.owl-exhibition').owlSync({
 *                   syncWith: $('.owl-nav'),
 *                   duration: 200, // this is an int variable that represents time in milliseconds (ms)
 *                   startIndex: 3 // will link the carousels on the fourth slide.
 *               });
 *
 * @param Object options has the $('.owl-nav') jQuery object and duration of slide transition. (example above)
 *
 * @version 1.0
 *
 */

"use strict";

(function ($) {
    $.fn.owlSync = function (options) {

        var src = $(this);

        var defaults = {
            target: false,
            syncWith: false,
            duration: 300,
            startIndex: 0,
            debug: false
        };

        // DEEP COPY:
        var settings = $.extend(true, {}, defaults, options);

        if (settings.debug) {
            console.log(src);
            console.log(settings);
        }

        return src.each(function () {
            var $thisSrc = $(this);
            var $thisNav = settings.target || settings.syncWith;

            if (!$thisNav) {
                console.error('Error 001: não achei seu carousel de navegação.');
                return false;
            }

            $thisSrc.on('changed.owl.carousel', function (e) {
                runOwlSync({
                    owlSrc: $thisSrc,
                    owlTarget: $thisNav,
                    index: e.item.index
                });
            });

            $thisNav.on('changed.owl.carousel', function (e) {
                runOwlSync({
                    owlSrc: $thisNav,
                    owlTarget: $thisSrc,
                    index: e.item.index
                });
            }).find('.owl-item').on('click', function () {
                // Sync two times: 1st to slide to index in $thisSrc and 2nd to slide to index in $thisNav.
                runOwlSync({
                    owlSrc: $thisNav,
                    owlTarget: $thisSrc,
                    index: $(this).index()
                });
                runOwlSync({
                    owlSrc: $thisSrc,
                    owlTarget: $thisNav,
                    index: $(this).index()
                });
            });

            runOwlSync({
                owlSrc: $thisNav,
                owlTarget: $thisSrc,
                index: settings.startIndex
            });

            $thisSrc.trigger('sync.owl.carousel');
        });
    };

    var flag = false;

    function runOwlSync(settings) {
        if (!flag) {
            //console.info('Linking slides.');
            flag = true;
            settings.owlTarget.trigger('to.owl.carousel', [settings.index, settings.duration, true]);
            // Remove actual link between and links the slides who have the same index.
            settings.owlTarget.find('.owl-item').removeClass('linked').eq(settings.index).addClass('linked');
            settings.owlSrc.find('.owl-item').removeClass('linked').eq(settings.index).addClass('linked');
            flag = false;
        } else {
            //console.warn('Blocking link overflow.');
        }
    }
})(jQuery);
