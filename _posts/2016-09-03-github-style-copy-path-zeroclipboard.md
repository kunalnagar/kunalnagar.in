---
layout: post
title:  "GitHub Copy Path Widget using ZeroClipboard"
date:   2016-09-03
description: "Learn how to create a copy to Clipboard Widget like GitHub uses for their Cloning Paths using ZeroClipboard."
img: "/assets/img/foss/copy-paste.jpg"
permalink: /blog/github-style-copy-path-zeroclipboard/
---

In this article, we will be creating the Clone Widget on GitHub that allows you to copy a Repo URL by clicking a button. It works natively in Chrome and falls back to Flash in Firefox & Safari. If Flash is not installed, the Copy button is not shown, but the user can still select the path and copy it manually.

{% include components/lightbox-img.html src="/assets/img/blog/github-style-copy-path-zeroclipboard/zeroclipboard-1.png" %}

Here is how the widget looks natively in Chrome (Copy button enabled)

{% include components/lightbox-img.html src="/assets/img/blog/github-style-copy-path-zeroclipboard/zeroclipboard-2.png" %}

Here is how the widget looks natively in Safari (Copy button disabled since Flash is not installed)

We are going to be creating a similar widget with just the input text box and the copy button. Let's see how it's done.

## Dependencies

* [ZeroClipboard][zeroclipboard-github] For the actual copy task
* [Bootstrap][bootstrap-site] For Visual Flair
* [FontAwesome][fontawesome-site] For the Copy Icon

## Step 1

Here is the HTML that contains two copy widgets. We're going to write code that works across multiple instances of the Widget.

```
<html>
    <head>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" />
        <link href="style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
            <div class="main-container">
                <div class="input-group">
                    <input class="form-control copy-text" type="text" value="I am the copied text!" readonly />
                    <span class="input-group-btn">
                        <button class="btn btn-default btn-copy" type="button">
                            <i class="fa fa-clipboard"></i>&nbsp;Copy
                        </button>
                    </span>
                </div>
                <div class="input-group">
                    <input class="form-control copy-text" type="text" value="I am a different copied text!" readonly />
                    <span class="input-group-btn">
                        <button class="btn btn-default btn-copy" type="button">
                            <i class="fa fa-clipboard"></i>&nbsp;Copy
                        </button>
                    </span>
                </div>
            </div>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
        <script src="lib/ZeroClipboard.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

## Step 2

Let's start writing some JavaScript. Begin by checking if Flash is installed or not.

```
// Check if Flash is installed or not
var _isFlashInstalled = function() {
    var hasFlash = false;
    try {
        var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if (fo) {
            hasFlash = true;
        }
    } catch (e) {
        if (navigator.mimeTypes
            && navigator.mimeTypes['application/x-shockwave-flash'] != undefined
            && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin
        ) {
            hasFlash = true;
        }
    }
    return hasFlash;
};
```

## Step 3

If Flash is installed:

```
// Fires when Flash is installed
var _initFlash = function() {

    // Create a client to work on. In our case, we've created
    // a client out of all the copy buttons
    var client = new ZeroClipboard($('.btn-copy'));

    // Fires when the client is ready
    client.on('ready', function(e) {

        // Create a tooltip that says "Copy to Cliboard"
        // when you hover over the Copy button
        $('.btn-copy').tooltip({
            placement: 'bottom',
            title: 'Copy to clipboard',
            container: 'body',
            trigger: 'manual'
        });

        // Enable the tooltip
        $('.btn-copy').hover(function() {
            $(this).tooltip('toggle');
        });
    });

    // Fires when the button has been clicked and the content
    // of the input box is being copied
    client.on('copy', function(e) {

        // Find the nearest input box and copy it's contents
        var val = $(e.target)
                    .closest('.input-group')
                    .find('.copy-text')
                    .val();
        e.clipboardData.setData('text/plain', val);
    });

    // Fires when the contents of the Input box have been copied
    client.on('aftercopy', function(e) {

        // Change the tooltip to say "Copied!"
        $(e.target)
            .attr('data-original-title', 'Copied!')
            .tooltip('fixTitle')
            .tooltip('show');

        // Reset the tooltip back to the original text
        setTimeout(function() {
            $(e.target)
                .attr('data-original-title', 'Copy to clipboard')
                .tooltip('fixTitle');
        }, 2000);
    });
};
```

If Flash is not insalled:

```
// Fires when Flash is not installed.
var _initNoFlash = function() {

    // Hide the Copy Button
    $('.input-group-btn').hide();

    // Make the input text boxes full width
    $('.input-group').css({
        'width': '100%'
    });

    // Fix their border-radius properties
    $('.copy-text').css({
        'border-radius': '4px'
    });
};
```

Finally, it all comes together in a single file:

```
(function() {

    'use strict';

    var App = function() {

        // Check if Flash is installed or not
        var _isFlashInstalled = function() {
            var hasFlash = false;
            try {
                var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                if (fo) {
                    hasFlash = true;
                }
            } catch (e) {
                if (navigator.mimeTypes
                    && navigator.mimeTypes['application/x-shockwave-flash'] != undefined
                    && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin
                ) {
                    hasFlash = true;
                }
            }
            return hasFlash;
        };

        // Fires when Flash is installed
        var _initFlash = function() {

            // Create a client to work on. In our case, we've created
            // a client out of all the copy buttons
            var client = new ZeroClipboard($('.btn-copy'));

            // Fires when the client is ready
            client.on('ready', function(e) {

                // Create a tooltip that says "Copy to Cliboard"
                // when you hover over the Copy button
                $('.btn-copy').tooltip({
                    placement: 'bottom',
                    title: 'Copy to clipboard',
                    container: 'body',
                    trigger: 'manual'
                });

                // Enable the tooltip
                $('.btn-copy').hover(function() {
                    $(this).tooltip('toggle');
                });
            });

            // Fires when the button has been clicked and the content
            // of the input box is being copied
            client.on('copy', function(e) {

                // Find the nearest input box and copy it's contents
                var val = $(e.target)
                            .closest('.input-group')
                            .find('.copy-text')
                            .val();
                e.clipboardData.setData('text/plain', val);
            });

            // Fires when the contents of the Input box have been copied
            client.on('aftercopy', function(e) {

                // Change the tooltip to say "Copied!"
                $(e.target)
                    .attr('data-original-title', 'Copied!')
                    .tooltip('fixTitle')
                    .tooltip('show');

                // Reset the tooltip back to the original text
                setTimeout(function() {
                    $(e.target)
                        .attr('data-original-title', 'Copy to clipboard')
                        .tooltip('fixTitle');
                }, 2000);
            });
        };

        // Fires when Flash is not installed
        var _initNoFlash = function() {

            // Hide the Copy Button
            $('.input-group-btn').hide();

            // Make the input text boxes full width
            $('.input-group').css({
                'width': '100%'
            });

            // Fix their border-radius properties
            $('.copy-text').css({
                'border-radius': '4px'
            });
        };

        // Main init
        var _init = function() {
            if(_isFlashInstalled) {
                _initFlash();
            } else {
                _initNoFlash();
            }
        };

        return {
            init: _init
        }

    };

    $(function() {

        var app = new App();
        app.init();

    });

})();
```

## Download & Demo

The code is readily available for your perusal on GitHub. Please note that I would have given a CodePen/JSFiddle link, but their sandboxing policies don't allow ZeroClipboard to function at full capacity in all browsers while editing code.

GitHub: [https://github.com/kunalnagar/zeroclipboard-demo](https://github.com/kunalnagar/zeroclipboard-demo)

Demo: [https://kunalnagar.github.io/zeroclipboard-demo/](https://kunalnagar.github.io/zeroclipboard-demo/)

If you have any questions, please fire away in the comments below. Thanks!

[zeroclipboard-github]: https://github.com/zeroclipboard/zeroclipboard
[bootstrap-site]: http://getbootstrap.com/
[fontawesome-site]: http://fontawesome.io/
