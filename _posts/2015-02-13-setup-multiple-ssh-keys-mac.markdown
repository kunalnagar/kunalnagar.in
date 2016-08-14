---
layout: post
title:  "Setup Multiple SSH Keys on a Mac"
date:   2015-02-13
description: "Learn how to set up multiple SSH keys on a Mac."
thumbfb: "/img/blog/setup-multiple-ssh-keys-mac/fb-setup-multiple-ssh-keys-mac.jpg"
thumbtwitter: "/img/blog/setup-multiple-ssh-keys-mac/twitter-setup-multiple-ssh-keys-mac.jpg"
permalink: /blog/setup-multiple-ssh-keys-mac/
---

Learn how to setup multiple SSH keys on your mac. This can be useful when you need multiple accounts (may be for personal use or work) to be setup on a single mac.

<p>
	<iframe width="100%" height="400" src="https://www.youtube.com/embed/9u4QPEMFK4A?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
</p>

#### Video Notes

[Generating SSH Keys (Github Article)][generating-ssh-keys]

Boilerplate Text for Config file:
{% highlight shell %}
Host testgithub
 HostName github.com
 User git
 IdentityFile ~/.ssh/id_rsa_testgithub
{% endhighlight %}

[generating-ssh-keys]: https://help.github.com/articles/generating-an-ssh-key/
