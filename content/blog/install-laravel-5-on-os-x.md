---
layout: post
title:  "Install Laravel 5 on OS X"
date:   2015-04-14
description: "Learn how to install Laravel 5 on OS X using the dev-develop branch."
thumbfb: "/img/blog/install-laravel-5-on-os-x/fb-install-laravel-5-on-os-x.jpg"
thumbtwitter: "/img/blog/install-laravel-5-on-os-x/twitter-install-laravel-5-on-os-x.jpg"
permalink: /blog/install-laravel-5-on-os-x/
---

**Note:** I originally wrote this article on [Medium][medium-link].

If you're like me, you've probably spent countless hours on the web trying to figure out how to install the dev-develop version of Laravel on your machine. As of today, the latest Laravel version 4.2 but if you want to see the awesome Laravel 5 features, you need to upgrade.

In this article, you will learn how to setup Laravel 5 from scratch on OS X.

#### Requirements

Here are some things you must have:

* A Terminal
* XAMPP / MAMP (I will show you how to set it up using both of them)

#### Step 1: Installing Composer

Composer is a tool for dependency management in PHP. It allows you to declare the dependent libraries your project needs and it will install them in your project for you.

It allows you to scaffold out a Laravel project and you also have the flexibility of specifying which version of Laravel your want.

To install composer, run the following commands in the terminal:

<pre><code class="shell">
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
</code></pre>

This will install Composer globally for you. To verify that your composer installation is successful, try running:

<pre><code class="shell">
composer
</code></pre>

...and you'll see a bunch of composer commands flow down your terminal screen. Hurray!

You can also update composer by running:

<pre><code class="shell">
composer self-update
</code></pre>

For more information, check out the in-depth guide on their website for [Getting Started with Composer][getting-started-composer].

#### Step 2: Configuring XAMPP/MAMP

When installing Laravel for the first time, more than 90% of the people face this dreaded PHP error:

<pre><code class="shell">
MCrypt PHP extension not installed.
</code></pre>

…and then they spend countless hours on the internet trying to figure out how to solve this and most of them will tell you to install MAMP. But what if you have XAMPP installed?

##### For XAMPP users

I'm using XAMPP 1.8.3–2 on my Mac and it comes with the MCrypt extension out of the box. All you need is to include it’s path in your .bash_profile

Open your .bash_profile by running:

<pre><code class="shell">
vim ~/.bash_profile
</code></pre>

...and paste the following line at the end:

<pre><code class="shell">
export PATH="/Applications/XAMPP/xamppfiles/bin:$PATH"
</code></pre>

Save the file by pressing : and typing wq and then press enter to quit out.

Remember to reload the .bash_profile by running:

<pre><code class="shell">
source ~/.bash_profile
</code></pre>

##### For MAMP users

The procedure is pretty much the same. You start out by opening your .bash_profile and pasting the following line at the end:

<pre><code class="shell">
export PATH=/Applications/MAMP/bin/php/php5.6/bin:$PATH
</code></pre>

Important note: This assumes that you have PHP 5.6 installed on your machine.

Remember to reload the .bash_profile by running:

<pre><code class="shell">
source ~/.bash_profile
</code></pre>

#### Step 3: Installing Laravel 5

To create a new Laravel 5 project, run the following:

<pre><code class="shell">
composer create-project laravel/laravel dev-develop
</code></pre>

This will pull in the latest dev branch from the Github repo. If you want the latest stable version, run the following:

<pre><code class="shell">
composer create-project laravel/laravel --prefer-dist
</code></pre>

If everything goes well, try running:

<pre><code class="shell">
php artisan -V
</code></pre>

and if it says:

<pre><code class="shell">
Laravel Framework version 5.0-dev
</code></pre>

then you're good to go!

To see your new shiny Laravel installation in action visit the public directory in the project to see the awesome new Laravel 5 home page.

![Laravel 5 Home Page](/img/blog/install-laravel-5-on-os-x/laravel-1.png)

#### Step 4: Installing Laravel Homestead

If you have XAMPP/MAMP installed, you can actually browse to your project’s public directory to see the app in action.

To be honest, I've moved on from software like XAMPP and MAMP. They are good if you are just getting started, but for you to get better at deploying apps via the command line and really understand how things work, you need to [let it go][let-it-go].

Laravel Homestead is an official, pre-packaged Vagrant “box” that provides you a wonderful development environment without requiring you to install PHP, HHVM, a web server, and any other server software on your local machine.

In other words, Laravel Homestead provides a complete environment for your Laravel project. It’s like having your own Rackspace or Digital Ocean server.

It uses Vagrant which allows you to create lightweight, reproducible, and portable development environments locally.

Before installing Laravel Homestead, you need to install 2 things:

* Vagrant [(Download)][vagrant-download]
* Oracle VirtualBox [(Download)][oracle-vbox-download]

Once you have installed Vagrant on your machine, it is time to install Homestead.

<pre><code class="shell">
vagrant box add laravel/homestead
</code></pre>

It might take some time to install depending on your internet connection.

What it is essentially doing is installing a copy of the latest Ubuntu version with a complete LAMP stack setup so you have your own server that you can SSH into.

In fact, the files on your local machine are synced with the VM so essentially, if you make any change on your local machine, it is synced back to the VM. Note that everything is happening locally.

Once the installation completes, you need to create a Homestead.yaml file that will hold all the configuration for our VM.

<pre><code class="shell">
homestead init
</code></pre>

By default, this will create a Homestead.yaml file in your root directory.

<pre><code class="shell">
~/.homestead/Homestead.yaml
</code></pre>

Open up the file and let’s discuss what’s relevant:

<pre><code class="shell">
authorize: ~/.ssh/id_rsa.pub
</code></pre>

You need to setup an SSH key on your machine that will allow you to SSH into your VM.

<pre><code class="shell">
folders:
  — map: ~/path/to/project
    to: /home/vagrant/project-name
</code></pre>

The above code maps the project on your machine to the project on the VM. For example, if your project directory is:

<pre><code class="shell">
~/Documents/LaravelProjects/laravel-test
</code></pre>

It’s going to map to the following in the VM:

<pre><code class="shell">
/home/vagrant/laravel-test
</code></pre>

Let’s look at the most important part:

<pre><code class="shell">
sites:
  — map: project.app
    to: /home/vagrant/project-name/public
</code></pre>

The above code provides you with a handy alias to enter in the browser that points to your project’s public directory which is how Laravel serves your app.

For example, you can enter something like:

<pre><code class="shell">
http://personal.app
</code></pre>

...and see your Laravel project. You can also use the following:

<pre><code class="shell">
http://localhost:8000
</code></pre>

Okay, so we are ready to start Homestead. To do that, run the following:

<pre><code class="shell">
homestead up
</code></pre>

It will spit out a bunch of commands in your terminal. Once it’s done, you can SSH into your shiny new server by:

<pre><code class="shell">
homestead ssh
</code></pre>

...and if everything is setup correctly, you'll see the following prompt:

<pre><code class="shell">
vagrant@homestead:~/project-name
</code></pre>

Congratulations! You just set up a new Laravel 5 project from scratch.

[medium-link]: https://medium.com/@kunalnagar/install-laravel-5-on-os-x-23f3578386f1#.j78hmfoxh
[getting-started-composer]: https://getcomposer.org/doc/00-intro.md
[let-it-go]: https://www.youtube.com/watch?v=kHue-HaXXzg
[vagrant-download]: https://www.vagrantup.com/downloads.html
[oracle-vbox-download]: https://www.virtualbox.org/wiki/Downloads
