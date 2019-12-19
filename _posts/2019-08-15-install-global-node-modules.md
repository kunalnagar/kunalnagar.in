---
layout: post
title:  "Install Global Node Modules without Sudo"
date: 2019-08-15
description: "Learn how to install global node modules without running into permission issues (sudo)"
img: "/assets/img/foss/node.png"
permalink: /blog/install-global-node-modules/
---

If you're on Linux or macOS and have tried installing a node module globally, you might run into permission issues like the following:

{% include components/lightbox-img.html src="http://i.imgur.com/i4hiG88.png" alt="Screenshot showing invalid permissions on Linux when installing an NPM package globally" %}

By default, Node installs global modules to your bin directory: ```/usr/bin/node_modules``` which may require elevated privileges to access. Instead, you could tell Node to install these modules in your home directory. This way you don't need to use sudo since you already own the directory. In this case, we'll be installing all global npm modules to ```~/.npm-global```

## Steps to follow

1. Create a new directory in your home folder
```
mkdir ~/.npm-global
```

2. Tell npm to use the newly created directory to install global modules
```
npm config set prefix ~/.npm-global
```

3. Add this to your ```~/.profile``` or ```~/.bash_profile``` depending on whether you're on Linux/macOS respectively
```
 export PATH=~/.npm-global/bin:$PATH
```

4. Update your current terminal session by reloading the profile
```
source ~/.profile
```

5. Try and install a sample module globally and it should work
```
npm install -g @vue/cli
```

{% include components/lightbox-img.html src="http://i.imgur.com/bkSOL0p.png" alt="Screenshot showing valid permissions on Linux when installing an NPM package globally" %}

And you're done! Of course, you could skip all this and just use ```sudo```, but it's not recommended and highly discouraged. Do things the right way and get the basics right.

## References
* [A note on permissions (Official NPM)](http://npm.github.io/installation-setup-docs/installing/a-note-on-permissions.html)
