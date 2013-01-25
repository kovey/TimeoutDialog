/*global jQuery*/
/**
 * 参数说明：
 *    - options = {
 *          maxSecond: 5 //默认是5秒
 *          url:       '' //默认不跳转
 *          timeTag:   '#time' //显示时间的位置
 *          promptMsg: '该页面将在%s后跳转' //默认提示消息，可以自定义，格式参考这个
 *      }
 * 用法：
 *    - $('#dialog').showTimeoutDialog(options);
 *
 * @author kovey
 */
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
