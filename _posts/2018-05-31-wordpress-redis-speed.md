---
layout: post
title:  "Speed up WordPress using Redis"
date: 2018-05-31
description: "Learn how to use Redis as an Object Cache to Speed Up Your WordPress Installation"
img: "/assets/img/foss/wp.png"
permalink: /blog/wordpress-redis-speed/
---

Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker. It can be combined with other databases like MySQL to provide a mechanism to cache your queries.

## How does this work?

{% include components/lightbox-img.html src="https://scalegrid.io/blog/wp-content/uploads/2018/05/Capture2.png" %}

When a user requests a WordPress page for the first time, a MySQL query is performed on the server. Redis caches this query, so when another user requests the same WordPress page, the results are provided from Redis without the need to query the database again.

**For the full post , check out the** [ScaleGrid blog](https://scalegrid.io/blog/using-redis-object-cache-to-speed-up-your-wordpress-installation/).
