---
layout: post
title:  "Fix Google Drive Dark Mode Icon"
date:   2015-02-11
description: "Learn how to fix the Google Drive Icon in Dark Mode on OS X Yosemite"
thumbfb: "/img/blog/fix-google-drive-dark-mode-icon/fb-fix-google-drive-dark-mode-icon.jpg"
thumbtwitter: "/img/blog/fix-google-drive-dark-mode-icon/twitter-fix-google-drive-dark-mode-icon.jpg"
permalink: /blog/fix-google-drive-dark-mode-icon/
---

If you are using Dark Mode for the Dock in OS X Yosemite, then you will notice that the Google Drive icon is hardly visible. In fact, some of you might not even notice it and think that Google Drive isn’t working at all.

Here is a simple script that you can download and run from your terminal. Right-Click and save the file on your Desktop. Make sure to keep the file extension as **.sh**

{% highlight shell %}
#!/bin/bash

function switch_files {
    mv $1.png $1.tmp.png
    mv $1-inverse.png $1.png
    mv $1.tmp.png $1-inverse.png
    mv $1@2x.png $1@2x.tmp.png
    mv $1-inverse@2x.png $1@2x.png
    mv $1@2x.tmp.png $1-inverse@2x.png
}

RUNNING=`ps aux | grep '/Google Drive' | grep -v grep | wc -l | bc`
if [ "$RUNNING" = "1" ]; then
    killall 'Google Drive'
    while [ "$RUNNING" = "1" ]; do
        sleep 1
        RUNNING=`ps aux | grep '/Google Drive' | grep -v grep | wc -l | bc`
    done
fi
sleep 3

cd '/Applications/Google Drive.app/Contents/Resources/'
switch_files mac-animate1
switch_files mac-animate2
switch_files mac-animate3
switch_files mac-animate4
switch_files mac-animate5
switch_files mac-animate6
switch_files mac-animate7
switch_files mac-animate8
switch_files mac-error
switch_files mac-inactive
switch_files mac-normal
switch_files mac-paused
open '/Applications/Google Drive.app'
{% endhighlight %}

Then, run the following command:

{% highlight shell %}
bash ~/Desktop/fix-google-drive-dark-mode-icons.sh
{% endhighlight %}

It might take a while for the prompt to respond, but when you are done, your Google Drive Icon in the Menu Bar will be visible.
