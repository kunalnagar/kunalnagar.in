(function() {

    'use strict';

    console.log('contact.js loaded');

    var $form = $('#form_contact');

    function stripHtml(value) {
        // remove html tags and space chars
        return value.replace(/<.[^<>]*?>/g, ' ').replace(/&nbsp;|&#160;/gi, ' ')
        // remove punctuation
        .replace(/[.(),;:!?%#$'"_+=\/\-]*/g,'');
    }

    $form.validate({
        rules: {
            name: { required: true, letterswithbasicpunc: true },
            email: { required: true, email: true },
            message: { required: true }
        },
        messages: {
            name: { required: 'Enter a name, my good sir. No? Milady?', letterswithbasicpunc: 'Nice try. No HTML tags allowed.' },
            email: { required: 'I. Won\'t. Spam. Now, give.', email: 'Me thinks you don\'t know what an email looks like.' },
            message: { required: 'Come on. Bring out your inner Shakespeare.' }
        },
        submitHandler: function(form) {
            var $form = $(form);
            var formData = {
                name: $.trim($('#contact_name').val()),
                email: $.trim($('#contact_email').val()),
                message: $.trim(stripHtml($('#contact_message').val()))
            };
            $.ajax({
                url: 'https://personal-main--email-server.herokuapp.com/mail',
                type: 'POST',
                beforeSend: function() {
                    $form.find('.form-control').attr('disabled', true);
                    $form.find('.btn-cta').attr('disabled', true);
                },
                data: formData,
                success: function(data) {
                    $('body').trigger('notification:success', data);
                },
                error: function(err) {
                    $('body').trigger('notification:error', err.responseJSON);
                }
            });
        }
    });

    $('body').on('notification:dismiss', function() {
        $form.find('.form-control').removeAttr('disabled');
        $form.find('.btn-cta').removeAttr('disabled');
    });

    $('body').on('notification:success', function() {
        $form.find('input, textarea').val('');
    });

})();
