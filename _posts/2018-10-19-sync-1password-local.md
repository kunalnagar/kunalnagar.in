---
layout: post
title: 'Sync 1Password Locally'
date: 2018-10-19
description: 'Learn how to Sync 1Password locally'
img: '/assets/img/foss/1password.png'
permalink: /blog/sync-1password-local/
---

I love [1Password](https://1password.com/). It is by far the best Password Manager I have used. I bought the Standalone version back in November 2014 and connected it to my Dropbox account.

I recently figured out that the 1Password vault can be synced locally as well. No need for Dropbox.

So here's my setup:

- I have a folder on my Nextcloud that stores my 1Password data. This is because I [don't](https://www.davidculley.com/dropbox-privacy-concerns/) [trust](https://techcrunch.com/2014/10/11/edward-snowden-new-yorker-festival/) [Dropbox](https://cloudmounter.net/dropbox-privacy.html) anymore.
- I run a WLAN server from the 1Password app on my Mac that syncs with my iPhone

### Setup 1Password on your computer

Go to the `1Password app` > `Preferences` > `Sync` and choose `Folder` from the drop-down list where you might have Dropbox/iCloud etc. You'll get a warning to delete the data on Dropbox, I didn't do that. Once my Vault was transferred successfully to my Nextcloud folder, I deleted the 1Password Vault manually from my Dropbox.

Next step, we need to figure out how to sync the vault with the iOS app. It was easy when it was stored on Dropbox. Apparently, 1Password [does not want to provide support for WebDAV](https://discussions.agilebits.com/discussion/86142/nextcloud-owncloud-webdav-syncing).

Go to the `1Password app` > `WLAN Server` and check the box saying `Run a WLAN server...`. It will give you a code, hold on to that.

### Setup 1Password on your phone

Open the 1Password app on your phone, go to Settings and Erase all data. Remember, your iPhone is still syncing data from your Dropbox folder and we need to change that.

<b>Note:</b> Doing this will only erase the data on your phone, not on Dropbox.

Once your data is deleted, restart the app and choose the option to sync via WLAN Server. Make sure you are on the same network as your computer and you will see the WLAN server. Tap on it, enter the code you were presented before, enter your master password and you should be set!

By following this guide, you should successfully moved your Vault away from Dropbox, and onto a local folder or Nextcloud and also setup syncing on your phone. The only caveat is that you can't sync your phone when you're not on the same network as your computer. I think I can live with that.

Helpful links:

- [How to keep a copy of a standalone vault updated in a folder](https://support.1password.com/local-folder/)
- [How to use the WLAN server](https://support.1password.com/wlan-server/)
