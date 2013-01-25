/*global jQuery*/
(function ($) {
    $.fn.showTimeoutDialog = function (options) {
        if (options.timeTag === undefined || options.timeTag === '') {
            throw 'Time tag can not be empty';
        }
        options.maxSecond = options.maxSecond || 5;
        options.url       = options.url || '';
        options.promptMsg = options.promptMsg || '该页面将在%s后跳转';
        $(this).dialog({
            autoOpen: true,
            modal:    true
        });

        $(options.timeTag).text(options.promptMsg.replace('%s', options.maxSecond));
        var dialogObj       = $(this);
        var i               = 0;
        var intervalTimeout = setInterval(function () {
            if (i >= options.maxSecond) {
                dialogObj.dialog('close');
                if (options.url !== '') {
                    location.href = options.url;
                }
                clearInterval(intervalTimeout);
                return;
            }
            i           += 1;
            var lastSecond  = options.maxSecond - i;
            $(options.timeTag).text(options.promptMsg.replace('%s', lastSecond));
        }, 1000);
    };
})(jQuery);
