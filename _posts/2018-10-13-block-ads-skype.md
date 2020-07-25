---
layout: post
title: 'Block Ads in Skype'
date: 2018-10-13
description: 'Hate Skype Ads? Learn how to remove them at the source.'
img: '/assets/img/foss/adstomp.png'
permalink: /blog/block-ads-skype/
---

I hate ads. So much so that I've created a [Chrome Extension](https://chrome.google.com/webstore/detail/adstomp/omoobfkabeoablabejdmodnablfjjbch?hl=en) to block them at some sites I visit regularly. But then I realized the best way to stop these things is at the source itself. Enter the hosts file.

<b>Side note:</b> If you're a privacy nut, you might want to check out my [hosts](/assets/downloads/siteblock.txt) file. It will block crypto-miners, google ads, youtube ads and much more. As always, [feedback](mailto:knlnagar@gmail.com) is appreciated.

I figured out a way to block Skype ads using a handful of host file entries. Download a [.txt](/assets/downloads/2018-10-13-block-ads-skype/hosts-skype.txt) version here. I've mentioned them below if you want to take a look. These entries have been tested on the latest Skype version as of today (October 13, 2018).

```
# Block Skype ads (core)
127.0.0.1 *.msads.net
127.0.0.1 *.msecn.net
127.0.0.1 *.rad.msn.com
127.0.0.1 a.ads2.msads.net
127.0.0.1 ac3.msn.com
127.0.0.1 ad.doubleclick.net
127.0.0.1 adnexus.net
127.0.0.1 adnxs.com
127.0.0.1 ads1.msn.com
127.0.0.1 ads2.msads.net
127.0.0.1 aka-cdn-ns.adtech.de

# If you want to see Skype Home, comment the line below
127.0.0.1 apps.skype.com

127.0.0.1 b.ads2.msads.net
127.0.0.1 bs.serving-sys.com
127.0.0.1 cdn.atdmt.com
127.0.0.1 cds26.ams9.msecn.net
127.0.0.1 db3aqu.atdmt.com
127.0.0.1 ec.atdmt.com
127.0.0.1 flex.msn.com
127.0.0.1 g.msn.com
127.0.0.1 live.rads.msn.com
127.0.0.1 msntest.serving-sys.com
127.0.0.1 rad.msn.com
127.0.0.1 sO.2mdn.net
127.0.0.1 secure.flashtalking.com
127.0.0.1 static.2mdn.net
127.0.0.1 static.2mdn.net
```

The above host file entries will not remove the placeholders in the side bar. For that, you need to get technical.

Based on your OS, go to: `%appdata%/skype/YOUR_USER_NAME/config.xml` and set all `Advert` related values to 0.

```
<AdvertEastRailsEnabled>0</AdvertEastRailsEnabled>
<AdvertLargeEastRailCutoff>0</AdvertLargeEastRailCutoff>
<AdvertNorthRailCutoff>0</AdvertNorthRailCutoff>
<AdvertPlaceholder>0</AdvertPlaceholder>
<AdvertSmallEastRailCutoff>0</AdvertSmallEastRailCutoff>
```

Reboot your system and your Skype ads should be gone.
