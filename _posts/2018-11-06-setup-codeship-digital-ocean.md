---
layout: post
title:  "How I use Codeship and DigitalOcean to deploy websites"
date:   2018-11-06
description: "Learn how to deploy a static site using Codeship and a DigitalOcean droplet"
permalink: /blog/deploy-sites-codeship-digital-ocean/
---

Services like GitHub and Gitlab allow users to deploy static sites with a push commit. You can even add a custom domain and have the site served from it instead of the standard ```*.github.io``` and ```*.gitlab.io``` domains. But what if you have your own VPS and want the same experience?

I have been a long-time user of Codeship. I, initially started using it to deploy coding challenges when applying to various companies but then, one weekend, I realised I could do the same with this site as well.

This article will guide you through my way of deploying static sites. I want to be able to do a push commit, and the site should automatically be live in a few minutes. If you want a similar experience, read on.

### Ingredients

* I use [Jekyll](https://jekyllrb.com/) on this site, just because it's simple and works out of the box. I used [Hugo](https://gohugo.io/) for a while but I could never figure out how permalinks and URLs work there.

* I use [Bitbucket](https://bitbucket.org/) to store this site's code in a private repository.

* I have a DigitalOcean [droplet](https://www.digitalocean.com/products/droplets/) which serves my [Nextcloud](https://nextcloud.com/) instance and this site.

* As mentioned, I use [Codeship](https://codeship.com/) to make the magic happen. I highly recommend checking them out. Their free tier works for most scenarios.

### Recipe

At this point, I'm assuming that you have a static site that you want to deploy stored in a repository somewhere. I'll be using Bitbucket in this case, but any ```git``` provider will do.

#### Setting up Codeship

* Log in to Codeship and create a new project

* In the free tier (at least), you can only create a new project from GitHub, Bitbucket or GitLab.

* Make sure you have your repository SSH URL handy. It looks like:
<pre>git@&lt;provider&gt;:&lt;username&gt;/&lt;repository&gt;.git</pre>

* For project type, select Codeship Basic. Although I would highly recommend checking out their Pro plans in case you need more control.

* You will land on the Tests page. Click on Deploy where you will have to give a branch name that Codeship will watch and do subsequent builds from. In my case, if any commits are pushed to ```master``` (including pull requests), a build is triggered.

* Once done, click Save and go to Dashboard. Codeship is all set to watch your master branch for changes and trigger a build.

#### Deployment

Once a build is triggered and successfully finished, you want to deploy your site to a VPS. As mentioned previously, I will be using a DigitalOcean droplet.

* Every project on Codeship has a public SSH key. Go to project > General settings and you should find it there. Make sure this key is [authorized](https://www.ssh.com/ssh/authorized_keys/) on your DigitalOcean droplet as it will be used to automatically push code to your droplet.

* To push code from Codeship to your droplet, we will use [Secure Copy or scp](https://kb.iu.edu/d/agye). Add the following command as a Custom Script under the Deployment Settings of your Codeship project.
<pre>scp -rp ~/clone/* user@droplet:/var/www/html/&lt;folder&gt;</pre>


* The above command will deploy your built code to a folder on your droplet.

* For Jekyll sites, the final code lives in the ```public``` directory by default. Point the ```.htaccess``` file on your droplet to the public folder and you should be set!

Helpful links:
* [Deploy to DigitalOcean](https://documentation.codeship.com/basic/continuous-deployment/deployment-to-digitalocean/)
* [Deploy with Custom Scripts](https://documentation.codeship.com/basic/continuous-deployment/deployment-with-custom-scripts/)
