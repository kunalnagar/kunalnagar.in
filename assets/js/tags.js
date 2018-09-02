(function() {

    'use strict';

    var getUrlParameter = function (sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('#'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    var url = window.location.href;
    console.log(url);

    // var tag = url.substring(0, url.indexOf('#'));
    var tag = url.split('#').pop();
    console.log(tag);

    var _checkHashChange = function() {
        $('.container-tag-single').each(function() {
            var $that = $(this);
            var id = $that.find('h3').attr('id');
            $that.removeClass('active');
            if(id === tag) {
                $that.addClass('active');
            }
        });
    };

    _checkHashChange();

    $(window).on('hashchange', function() {
        _checkHashChange();
    });

})();
