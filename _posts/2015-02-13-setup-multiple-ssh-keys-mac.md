---
layout: post
title: 'Setup Multiple SSH Keys on a Mac'
date: 2015-02-13
description: 'Learn how to set up multiple SSH keys on a Mac.'
img: '/assets/img/foss/terminal.png'
permalink: /blog/setup-multiple-ssh-keys-mac/
---

Learn how to setup multiple SSH keys on your mac. This can be useful when you need multiple accounts (may be for personal use or work) to be setup on a single mac.

## Notes

[Generating SSH Keys (Github Article)][generating-ssh-keys]

Boilerplate Text for Config file:

{% highlight shell %}
Host testgithub
 HostName github.com
 User git
 IdentityFile ~/.ssh/id_rsa_testgithub
{% endhighlight %}

[generating-ssh-keys]: https://help.github.com/articles/generating-an-ssh-key/
