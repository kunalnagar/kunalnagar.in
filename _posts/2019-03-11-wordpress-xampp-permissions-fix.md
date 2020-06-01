---
layout: post
title: 'Permissions fix for WordPress development on XAMPP (Mac)'
date: 2019-03-11
description: 'Fix permissions on XAMPP for Mac for WordPress Development'
img: '/assets/img/foss/wp.png'
permalink: /blog/wordpress-xampp-permissions-fix/
---

I use XAMPP for WordPress Development on my mac. It's easy, fast and doesn't require too much setup. If you've used XAMPP on Mac before, it has permissions issues by default. I noticed this when I tried to installing WordPress plugins from the Admin dashboard. Also, when you do a fresh WordPress setup, the `wp-config.php` file is not automatically created because of permissions issues.

## Identifying the issue

After a bit of research I realized that the Apache server that is installed with the XAMPP package has the following User and Group set by default:

```
User: daemon
Group: xampp
```

You can find this under `/Applications/XAMPP/etc/httpd.conf`

This means that there must be a `daemon` user on your Mac that's part of the `xampp` group to allow writes.

## The Fix

Just change the user to your `mac_username` and the group to `staff`. My Mac's username is `kunalnagar`, and so my config looks like the following:

{% include components/lightbox-img.html src="https://i.imgur.com/DEMPMFo.png" %}

And that's it. Restart the Apache server from the XAMPP console and you should be able to install plugins, themes directly from the WP Admin Dashboard because your Mac user can now write to the `htdocs` directory.

If you set up a new WordPress install, the `wp-config.php` file will be automatically written for you.

---

**Side note:** I have an open-source WordPress plugin for managing 404 errors on your site. It allows you to set any page on your WordPress site as a default 404 page. You can even redirect users to a custom URL. [Check it out!](https://wordpress.org/plugins/custom-404-pro/)
