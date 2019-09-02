---
layout: post
title: YouTube to Mp3 converter
date: 2018-02-24
description: Building a YouTube to Mp3 converter with Node.js
permalink: /blog/youtube-to-mp3-converter/
img: "/assets/img/foss/youtube.png"
tags: [Open Source, Woot, Blah]
---

So my parents listen to music on YouTube. Because apparently, services like [Saavn](https://www.saavn.com/) or [Gaana](https://gaana.com/) don't make sense to them. And honestly, I can't blame them. They're gonna use what seems familiar to them.

One day they asked me - how can I download this song to my phone and listen to it without opening the YouTube app? And I suggested numerous YouTube to Mp3 converters on the internet. The thing I missed was that my parents cannot differentiate between an actual download button and the one that is loaded with ads. Unfortunately, a lot of these free services have ads loaded on them and that causes popups like this that send my parents into a frenzy.

Hence, I decided to create a converter for them that is ad-free and does the job. You enter a URL, click Convert and you get an mp3 file to download. From here on, I will be discussing how to build such a thing and what is the concept behind these converters and how they work. So if you're not interested, shoo off.

Alright. You're interested in how to build such a thing. You can do this in any technology you want. I will be discussing the business logic first and then suggest doing it in Node.js - because that's how I did it.

## Business Logic
A YouTube to Mp3 converter is quite simple, actually.
* You use the YouTube API to send a URL and it sends you back a list of formats that the video is available in based on the quality when it was uploaded.
* It returns a couple of standard formats like mp4, mov etc and one format called m4a.
* We download that m4a and then use ffmpeg to convert it to mp3
* And we're done.

## Implementing in Node.js
Unless you're really passionate about building this thing out, I would recommend using the already built Node packages out there for downloading and converting YouTube videos. There are node packages for doing this thing entirely as well. But you're here to learn, so let's convert out Business Logic to code. Here are the packages you'll need:

* [node-ytdl-core](https://github.com/fent/node-ytdl-core) for getting the YouTube info for a particular URL
* [node-fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg) to convert the received m4a file to mp3

As far as the backend, we'll be using [ExpressJS](https://expressjs.com/) hosted on [Heroku](https://heroku.com)

You'll need to install [ffmpeg](https://www.ffmpeg.org/) on Heroku first for the node package to work. For that, you'll need a [Heroku Buildpack](https://devcenter.heroku.com/articles/buildpacks). I used [this one](https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest). Basically, Heroku Buildpacks allow you to specify the technologies you will need for a specific project. By default, if you push Node.js code to Heroku, a Node.js Buildpack is automatically applied to your project. You can check out all the Buildpacks in your project on it's Settings page.

If you're working on this locally, you'll need to install ffmpeg on your machine as well. Here's how you [install it on a mac](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg/wiki/Installing-ffmpeg-on-Mac-OS-X).

I'm not going to give away the code here, so that's for you to figure out. I have suggested all the packages you might need and where to host it as well.
