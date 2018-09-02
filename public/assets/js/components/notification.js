(function() {

    'use strict';

    console.log('notification.js loaded');

    var $component = $('body').find('.component--notification');

    $component.on('click', '.btn-dismiss', function() {
        $component.removeClass('slide alert-success');
        $('.page').removeClass('op-1');
        $('body').removeClass('o-hidden').trigger('notification:dismiss');
    });

    $('body').on('notification:success', function(e, data) {
        $component.removeClass('alert-danger alert-info alert-success');
        $component.find('.component--notification--main--status').text(data.status);
        $component.find('.component--notification--main--message').text(data.message);
        $component.addClass('slide alert-success');
        $('body').addClass('o-hidden');
        $('.page').addClass('op-1');
    });

    $('body').on('notification:error', function(e, data) {
        $component.removeClass('alert-danger alert-info alert-success');
        $component.find('.component--notification--main--status').text(data.status);
        $component.find('.component--notification--main--message').text(data.message);
        $component.addClass('slide alert-danger');
        $('body').addClass('o-hidden');
        $('.page').addClass('op-1');
    });

})();
