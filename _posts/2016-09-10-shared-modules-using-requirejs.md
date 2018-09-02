---
layout: post
title:  "Shared Modules using RequireJS"
date:   2016-09-10
description: "Learn how to create modules that can be shared across other modules using RequireJS"
thumbfb: "/img/blog/shared-modules-using-requirejs/fb-shared-modules-using-requirejs.jpg"
thumbtwitter: "/img/blog/shared-modules-using-requirejs/twitter-shared-modules-using-requirejs.jpg"
permalink: /blog/shared-modules-using-requirejs/
---

Every application needs a set of modules that are shared across all other modules. Things like String/Array helpers, Loggers etc are used across your application and it makes sense to create wrappers around them and expose them via a Common Module.

Before we start, I'm assuming that you know a bit about RequireJS. If not, I suggest you visit their [website][requirejs-website] and learn about [AMD (Asynchronous Module Definition)][why-amd].

Here is the basic folder structure that we're going to follow. I'll explain this in detail below:

![Folder Structure](/assets/img/blog/shared-modules-using-requirejs/requirejs-1.png)

The common folder contains the individual common modules like Logger, Modal and Tabs.

* <b>logger.js</b> - may contain code to output/log code either to the Console or to a third party tool like [Logentries][logentries] or [Sentry][sentry]
* <b>modal.js</b> & <b>tabs.js</b> - may contain code to initialise, destroy, center, show, hide modals/tabs

Here is an example of <b>logger.js</b> that can be used to log messages. Note the use of the Singleton Pattern.

<pre><code class="javascript">// logger.js
(function() {

    'use strict';

    define([], function() {

        var _logMessage = function(msg) {
            console.log(msg);
        };

        var _warnMessage = function(msg) {
            console.warn(msg);
        };

        var _errorMessage = function(msg) {
            console.error(msg);
        };

        return {
            log: _logMessage,
            warn: _warnMessage,
            error: _errorMessage
        };

    });
})();
</code></pre>

Now, assume that we need to share this across different Modules (<b>module-1</b>, <b>module-2</b>, etc). Here is how we can do it:

<pre><code class="javascript">// module-1.js
(function() {

    'use strict';

    define(['./common/logger/logger'], function(Logger) {

        Logger.log('Hello World!');

        return {};

    });
})();
</code></pre>

If we need to share multiple common modules, we can do something like:

<pre><code class="javascript">// module-2.js
(function() {

    'use strict';

    define([
        './common/logger/logger',
        './common/modal/modal'
    ], function(Logger, Modal) {

        Logger.log('Hello World!');

        Modal.init('INSERT_DIV_ID_HERE');
        Modal.center('INSERT_DIV_ID_HERE');

        return {};

    });
})();
</code></pre>

As you can see, if you have a lot of common modules, the list can grow really big really fast. It helps to consolidate all these modules into a single Common Module. Something like:

<pre><code class="javascript">// common.js
(function() {

    'use strict';

    define([
        './common/logger/logger',
        './common/modal/modal'
    ], function(Logger, Modal) {

        return {
            Logger: Logger,
            Modal: Modal
        };

    });
})();
</code></pre>

And then, you can just import the Common Module file and use the helper functions using the dot notation. Here is a quick example:

<pre><code class="javascript">// module-3.js
(function() {

    'use strict';

    define([
        './common/common',
    ], function(Helpers) {

        Helpers.Logger.log('Hello World!');
        Helpers.Modal.init('INSERT_DIV_ID_HERE');

        return {};

    });
})();
</code></pre>

Thanks for taking the time to read this. Build something awesome!

[requirejs-website]: http://requirejs.org/
[why-amd]: http://requirejs.org/docs/whyamd.html
[logentries]: https://logentries.com/
[sentry]: https://sentry.io/welcome/
