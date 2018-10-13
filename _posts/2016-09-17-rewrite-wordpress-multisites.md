---
layout: post
title:  "Rewrite WordPress Multisites"
date:   2016-09-17
description: "Learn how to rewrite WordPress Multisites to any folder on your server."
permalink: /blog/rewrite-wordpress-multisites/
---

Recently, one of my tasks was to create a Blog and a Knowledge Base and use similar credentials and login-flows for both of their Admin Consoles. Without a doubt, [WordPress Multisite][wordpress-multisite] is the perfect choice for this since you don't have to manage your Auth/Settings/Dashboard in multiple places.

<i><b>Note:</b> Creating WordPress multisites is out of the scope of this article. For more info, check out [this link][wordpress-multisite].</i>

When you set up a WordPress Multisite install, you create one root site and then all other multisites are created as subfolders (children). For example, you may end up with something like:

<pre><code class="shell">http://localhost/blog/ # Root Site
http://localhost/blog/knowledgebase/ # Multisite 1
http://localhost/blog/site/ # Multisite 2
</code></pre>

As you can see, this is not ideal, you would ideally want something like this, i.e. each multisite at the same level as the root site (blog):

<pre><code class="shell">http://localhost/blog/
http://localhost/knowledgebase/
http://localhost/site/
</code></pre>

It turns out – you can easily do this in 3 steps:

## Step 1: Create a root level .htaccess

We need to intercept all request to multisites and then rewrite them to their original URLs.

Please note that this is NOT a redirect, but a rewrite. There's a [difference][rewrite-redirect].

Moving along – create an .htaccess file in the root. If you're using something like XAMPP, create it in the <b>htdocs</b> folder:

<pre><code class="shell"># Root Level .htaccess

RewriteEngine On
RewriteBase /

# Redirect knowledgebase to knowledgebase/
RewriteRule knowledgebase$ knowledgebase/ [R=301,L]

# Intercept all requests coming to http://localhost/knowledgebase
RewriteCond %{REQUEST_URI} /knowledgebase

# Rewrite the intercepted requests to
# /knowledgebase/anything-here from /blog/knowledgebase/anything-here
RewriteRule ^knowledgebase/(.*) blog/knowledgebase/$1 [L]
</code></pre>

## Step 2: Update the Database

Just rewriting in the <b>.htaccess</b> is not going to cut it for us. There are some entries in the Database that we need to change:

<pre><code class="sql">-- Update wp_blogs table to remove /blog from the path
UPDATE wp_blogs SET path="/knowledgebase/" WHERE path="/blog/knowledgebase/";

-- Update wp_SITE_ID_options siteurl to remove /blog in the URL
UPDATE wp_2_options SET option_value="http://localhost/knowledgebase" WHERE option_name="siteurl";

-- Update wp_SITE_ID_options home to remove /blog in the URL
UPDATE wp_2_options SET option_value="http://localhost/knowledgebase" WHERE option_name="home";
</code></pre>

## Step 3: Handle cookies/sessions

Now, we need to handle cookies/sessions since our URLs have changed. Paste the following lines in the <b>wp-config.php</b> file below the multisite lines:

<pre><code class="php">define('ADMIN_COOKIE_PATH', '/');
define('COOKIE_DOMAIN', '');
define('COOKIEPATH', '');
define('SITECOOKIEPATH', '');
</code></pre>

<b>And we're done!</b> Visit your new multisite URL: [http://localhost/knowledgebase]() and you should be good to go!

<b>Note:</b> For adding more multisites, add a necessary rule in <b>Step 1</b> and update the necessary tables in <b>Step 2</b>.

[wordpress-multisite]: https://codex.wordpress.org/Create_A_Network
[rewrite-redirect]: http://weblogs.asp.net/owscott/rewrite-vs-redirect-what-s-the-difference

