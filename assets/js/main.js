/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

    var $window = $(window),
        $main = $('#main'),
        $body = $('body');

    // Breakpoints.
    breakpoints({
        xlarge: ['1281px', '1680px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: ['481px', '736px'],
        xsmall: ['361px', '480px'],
        xxsmall: [null, '360px']
    });

    // Play initial animations on page load.
    $window.on('load', function () {
        window.setTimeout(function () {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Touch?
    if (browser.mobile)
        $body.addClass('is-touch');

    // Forms.
    var $form = $('form');

    // Auto-resizing textareas.
    $form.find('textarea').each(function () {

        var $this = $(this),
            $wrapper = $('<div class="textarea-wrapper"></div>'),
            $submits = $this.find('input[type="submit"]');

        $this
            .wrap($wrapper)
            .attr('rows', 1)
            .css('overflow', 'hidden')
            .css('resize', 'none')
            .on('keydown', function (event) {

                if (event.keyCode == 13 &&
                    event.ctrlKey) {

                    event.preventDefault();
                    event.stopPropagation();

                    $(this).blur();

                }

            })
            .on('blur focus', function () {
                $this.val($.trim($this.val()));
            })
            .on('input blur focus --init', function () {

                $wrapper
                    .css('height', $this.height());

                $this
                    .css('height', 'auto')
                    .css('height', $this.prop('scrollHeight') + 'px');

            })
            .on('keyup', function (event) {

                if (event.keyCode == 9)
                    $this
                    .select();

            })
            .triggerHandler('--init');

        // Fix.
        if (browser.name == 'ie' ||
            browser.mobile)
            $this
            .css('max-height', '10em')
            .css('overflow-y', 'auto');

    });

    // Menu.
    var $menu = $('#menu');

    $menu.wrapInner('<div class="inner"></div>');

    $menu._locked = false;

    $menu._lock = function () {

        if ($menu._locked)
            return false;

        $menu._locked = true;

        window.setTimeout(function () {
            $menu._locked = false;
        }, 350);

        return true;

    };

    $menu._show = function () {

        if ($menu._lock())
            $body.addClass('is-menu-visible');

    };

    $menu._hide = function () {

        if ($menu._lock())
            $body.removeClass('is-menu-visible');

    };

    $menu._toggle = function () {

        if ($menu._lock())
            $body.toggleClass('is-menu-visible');

    };

    $menu
        .appendTo($body)
        .on('click', function (event) {
            event.stopPropagation();
        })
        .on('click', 'a', function (event) {

            var href = $(this).attr('href');

            event.preventDefault();
            event.stopPropagation();

            // Hide.
            $menu._hide();

            // Redirect.
            if (href == '#menu')
                return;

            window.setTimeout(function () {
                window.location.href = href;
            }, 350);

        })
        .append('<a class="close" href="#menu">Close</a>');

    $body
        .on('click', 'a[href="#menu"]', function (event) {

            event.stopPropagation();
            event.preventDefault();

            // Toggle.
            $menu._toggle();

        })
        .on('click', function (event) {

            // Hide.
            $menu._hide();

        })
        .on('keydown', function (event) {

            // Hide on escape.
            if (event.keyCode == 27)
                $menu._hide();

        });

    // Where I added code     
    settings = {

        // Keyboard shortcuts.
        keyboardShortcuts: {

            // If true, enables scrolling via keyboard shortcuts.
            enabled: true,

            // Sets the distance to scroll when using the left/right arrow keys.
            distance: 50

        }
    };
    
    // Items.

    // Assign a random "delay" class to each thumbnail item.
    $('.item.thumb').each(function () {
        $(this).addClass('delay-' + Math.floor((Math.random() * 6) + 1));
    });

    // IE: Fix thumbnail images.
    if (browser.name == 'ie')
        $('.item.thumb').each(function () {

            var $this = $(this),
                $img = $this.find('img');

            $this
                .css('background-image', 'url(' + $img.attr('src') + ')')
                .css('background-size', 'cover')
                .css('background-position', 'center');

            $img
                .css('opacity', '0');

        });

    // Poptrox.
    $main.poptrox({
        onPopupOpen: function () {
            $body.addClass('is-poptrox-visible');
        },
        onPopupClose: function () {
            $body.removeClass('is-poptrox-visible');
        },
        overlayColor: '#1a1f2c',
        overlayOpacity: 0.75,
        popupCloserText: '',
        popupLoaderText: '',
        selector: '.item.thumb a.pimage',
        caption: function ($a) {
            return $a.attr('title');
        },
        usePopupDefaultStyling: false,
        usePopupCloser: false,
        usePopupCaption: true,
        usePopupNav: true,
        windowMargin: 50
    });

    breakpoints.on('>small', function () {
        $main[0]._poptrox.windowMargin = 50;
    });

    breakpoints.on('<=small', function () {
        $main[0]._poptrox.windowMargin = 0;
    });

    // Keyboard shortcuts.
    if (settings.keyboardShortcuts.enabled)
        (function () {

            $window

                // Keypress event.
                .on('keydown', function (event) {

                    var scrolled = false;

                    if ($body.hasClass('is-poptrox-visible'))
                        return;

                    switch (event.keyCode) {

                        // Left arrow.
                        case 37:
                            $main.scrollLeft($main.scrollLeft() - settings.keyboardShortcuts.distance);
                            scrolled = true;
                            break;

                            // Right arrow.
                        case 39:
                            $main.scrollLeft($main.scrollLeft() + settings.keyboardShortcuts.distance);
                            scrolled = true;
                            break;

                            // Page Up.
                        case 33:
                            $main.scrollLeft($main.scrollLeft() - $window.width() + 100);
                            scrolled = true;
                            break;

                            // Page Down, Space.
                        case 34:
                        case 32:
                            $main.scrollLeft($main.scrollLeft() + $window.width() - 100);
                            scrolled = true;
                            break;

                            // Home.
                        case 36:
                            $main.scrollLeft(0);
                            scrolled = true;
                            break;

                            // End.
                        case 35:
                            $main.scrollLeft($main.width());
                            scrolled = true;
                            break;

                    }

                    // Scrolled?
                    if (scrolled) {

                        // Prevent default.
                        event.preventDefault();
                        event.stopPropagation();

                        // Stop link scroll.
                        $main.stop();

                    }

                });

        })();

})(jQuery);
