---
layout: post
title:  "Install free SSL certificates using LetsEncrypt on GoDaddy"
date: 2019-07-16
description: "Learn how to install free SSL certificates on GoDaddy using LetsEncrypt"
img: "/assets/img/foss/godaddy.jpg"
permalink: /blog/install-free-ssl-godaddy/
---

This is a straight-forward guide to installing free SSL certificates on GoDaddy. There's no need to pay when LetsEncrypt provides them for free. Here's a list of things you need to have before we get started:

* [A GoDaddy account](https://in.godaddy.com/hosting/web-hosting) - I have a Deluxe Hosting plan with access to cPanel
* [SSLForFree](https://www.sslforfree.com/) - A site to create your SSL certificates
* [DNSChecker](https://dnschecker.org/) - A DNS Check Propagation Tool

## Step 1

Visit SSLForFree and enter your domain on the homepage. I would recommend adding support for sub-domains along with the main domain just in case you plan on going down this path in the future.

{% include components/lightbox-img.html src="https://i.imgur.com/AfhLxJ5.png" %}

Click on Create and you'll go to a page where you need to Manually Verify your Domain

## Step 2

You'll receive a set of instructions to modify the domain DNS.

{% include components/lightbox-img.html src="https://i.imgur.com/nvTDcK3.png" %}

Open your GoDaddy account, navigate to the Domain DNS settings and follow the TXT record.

**Note:** Instead of entering the entire ```_acme-challenge.yourdomain.com```, just use ```_acme-challenge``` in the name/host box. This is how one of the entries should look like:

{% include components/lightbox-img.html src="https://i.imgur.com/jFH0vFP.png" %}

## Step 3

Once the TXT records are added, visit the DNSChecker site, add your name/host value in the box, choose TXT and hit Search.

{% include components/lightbox-img.html src="https://i.imgur.com/sbu69oL.png" %}

You'll have to wait about 5-10 minutes for the DNS to finish propgating and once it's finished you'll see the following success shot:

{% include components/lightbox-img.html src="https://i.imgur.com/BXUJlrg.png" %}

## Step 4

After you see all green checks, go back to SSLForFree and click on the link in Step 3 to verify that the DNS settings have taken effect. You'll see a screen like the following:

{% include components/lightbox-img.html src="https://i.imgur.com/9MIElfe.png" %}

If you see this screen, you're halfway there. Click on the "Download SSL Certificate link" and you'll be presented with the following textareas:

*

## Step 5

Open GoDaddy and go to your cPanel dashboard > _SSL settings_ > _Manage SSL sites_. Choose the domain for which you want to install the SSL for. Enter the above three keys in the textboxes and click on _Install Certificate_.

{% include components/lightbox-img.html src="https://i.imgur.com/W6UcB4G.png" %}

When your certificate is successfully installed, you'll see it in the Manage section of the SSL page and you're ready to go. Visit the domain with the HTTPS prefix and you should see your secured website!

{% include components/lightbox-img.html src="https://i.imgur.com/IsEbaDz.png" %}

If you'd like to know more about what LetsEncrypt is doing to provide free SSL to the world, check out this video:

{% include components/yt.html id="ksqTu7TX83g" %}
