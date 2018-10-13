---
layout: post
title:  "Deploy Laravel 5 on GoDaddy Shared Hosting"
date:   2015-01-08
description: "Learn how to deploy Laravel 5 on GoDaddy Shared Hosting."
permalink: /blog/deploying-laravel-5-on-godaddy-shared-hosting/
---

**Note:** I originally wrote this article on [Medium][medium-link].

So your awesome project is ready for deployment and you need to set it up on GoDaddy shared hosting servers.

#### Requirements

Here are some things that you need before we get started:

* A GoDaddy shared hosting account
* SSH Access
* Awesome Laravel Project to be deployed

#### Steps

Before we start, let’s assume that your home directory on the server is

<pre><code class="shell">/home/content/kunalnagar/html
</code></pre>

and all your code goes into the html folder.

* Create a folder on the same level as the html folder to hold your future Laravel installations. It’s just good practice.
* Connect via SFTP to your shared hosting server.
* Zip your entire project directory and upload it to the new folder you just created. Unzip it.
* Move the public folder into the html folder and rename it to something like awesome-project.

The approach mentioned above makes all of our application logic safe and our public folder is the one that is exposed.

Open up the index.php file and change the paths to reflect our new directory structure. Here are the following lines you should change:

<pre><code class="shell">require __DIR__.'/../bootstrap/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
</code></pre>

Finally, we modify the main .htaccess file in the html directory. We do this so that you don't have to type:

<pre><code class="shell">http://yoursite.com/awesome-project
</code></pre>

Here are the contents of the .htaccess file:

<pre><code class="shell">RewriteEngine On
RewriteCond %{REQUEST_URI} !^awesome-project
RewriteRule ^(.*)$ awesome-project/$1 [L]
</code></pre>

And you’re done! Try visiting:

<pre><code class="shell">http://yoursite.com
</code></pre>

and enjoy your awesome new project.

*Please note that this article only discusses deploying the project files. If you need to deploy your migrations, there are tons of articles that you can look up. The confusing part is setting up the directory structure and this article covers that point.*

[medium-link]: https://medium.com/@kunalnagar/deploying-laravel-5-on-godaddy-shared-hosting-888ec96f64cd#.lup9tnaqo
