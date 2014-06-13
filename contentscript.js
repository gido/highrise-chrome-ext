$jq = jQuery.noConflict();

/**
 * Create and trigger raw DOM event on a jQuery object
 * @param jQuery $el
 * @param string type event type
 * @param boolean bubbles
 * @param boolean cancelable
 */
function triggerDOMEvent($el, type, bubbles, cancelable) {

    if (typeof bubbles == "undefined") {
        bubbles = true;
    }
    if (typeof cancelable == "undefined") {
        cancelable = true;
    }

    $el.each(function() {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(type, bubbles, cancelable);
        console.log('dispatchEvent on ');
        console.log(this);
        this.dispatchEvent(evt);
    });
}

;(function($) {
    $('.recording_content .menu_content').each(function() {
        var $this = $(this);
        var $select = $this.find('select');
        var closeDiv = $this.find('div.close');

        $select.chosen({ width: '260px' })
        .bind('change', function(e) {
            e.stopImmediatePropagation();

            $(this).unbind('change');

            triggerDOMEvent($(this), 'change', false, true);
        });

        $('<a class="refresh" href="#">Refresh</a>')
            .on('click', function(e) {
                e.preventDefault();
                $select.trigger("chosen:updated");
            })
            .insertAfter(closeDiv)
        ;
    });
})(jQuery);
