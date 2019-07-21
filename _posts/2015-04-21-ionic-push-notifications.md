---
layout: post
title:  "Ionic Push Notifications"
date:   2015-04-21
description: "Learn how to set up Push Notifications in Ionic"
img: "/assets/img/foss/notification.png"
permalink: /blog/ionic-push-notifications/
---

Setting up push notifications in a hybrid mobile app can be a challenging task if you don’t know the mechanics of it. Fortunately, Ionic’s [ngCordova][ng-cordova] service allows us to handle push notifications easily. This article assumes that you have a basic understanding of [Hybrid Mobile Applications][hybrid-mobile-apps] and how to deploy them to an Android device. If not, I will try and mention the steps explicitly when I can. Please also note that this is not a [Getting Started Tutorial for Ionic][getting-started-ionic] and you need to have a development environment setup beforehand with the Android SDK. In this article, we will mostly be discussing how to send Ionic Push Notifications.

## How does it work?

We will be using a PHP script to send a push notification to our Ionic app. Our app will be running on an Android Device and it will use [Google Cloud Messaging (GCM)][gcm] to handle notifications.

### Step 1

Create a new Ionic App using the Get Started Tutorial on Ionic’s website.

### Step 2

Add the Android Platform to our app using:

```
ionic platform add android
```

### Step 3

Build out the app using the process described here so that we can get the SHA1 key. To generate the .keystore file, use this:

```
keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
```

To get the SHA1 from the keystore, use this:

```
keytool -list -v -keystore my-release-key.keystore -alias androiddebugkey -storepass android -keypass android
```

You will get something like this:

```
Alias name: androiddebugkey
Creation date: 17 Feb 12
Entry type: PrivateKeyEntry
Certificate chain length: 1
Certificate[1]:
Owner: CN=Android Debug, O=Android, C=US
Issuer: CN=Android Debug, O=Android, C=US
Serial number: 4f3dfc69
Valid from: Fri Feb 17 15:06:17 SGT 2012 until: Sun Feb 09 15:06:17 SGT 2042
Certificate fingerprints:
MD5: 11:10:11:11:11:11:11:11:11:11:11:11:11:11:11:11
SHA1: 11:11:11:11:11:11:11:11:11:11:11:11:11:11:11:11:11:11:01:11
Signature algorithm name: SHA1withRSA
Version: 3
```

We need the SHA1 key to register our Google App in the next step.

### Step 4

Register a Google App in the [API Console][api-console]. Use any package name and enter the SHA1 that we extracted in our previous step.

{% include components/lightbox-img.html src="/assets/img/blog/ionic-push-notifications/api-console.png" %}

After you save, you will get a screen with the following information. Copy the Client ID as we need it for future reference.

{% include components/lightbox-img.html src="/assets/img/blog/ionic-push-notifications/api-console-2.png" %}

Once that is done, you also need to create a Public API Access Key that will be used in the PHP script to authorise our app.

{% include components/lightbox-img.html src="/assets/img/blog/ionic-push-notifications/public-api-access.png" %}

Enable the GCM API in the APIs tab on the left. In my case, I have already activated it which is why it shows Disable API.

{% include components/lightbox-img.html src="/assets/img/blog/ionic-push-notifications/enable-gcm.png" %}

Last but not the least, copy your Project ID from the Overview tab. This is called the SENDER ID and we will use this in our Ionic App Controller.

{% include components/lightbox-img.html src="/assets/img/blog/ionic-push-notifications/project-details.png" %}

### Step 5

Now that our Google app is all setup, we can begin writing a PHP script that will accept a GET parameter of the registration ID to send a push notification. You can include multiple IDs that are comma-separated, but in this case we will be using just one. But how do we get a Registration ID?

Before our PHP script can send push notifications, we need to register our Android Device to receive notifications. This is done with the help of the [Push Notification plugin from ngCordova][push-plugin-ngcordova] that we will discuss i Step 6.

Here is the PHP script:

```
<?php

// API access key from Google API's Console
define( 'API_ACCESS_KEY', 'ENTER_PUBLIC_API_ACCESS_KEY_FROM_API_CONSOLE' );

$registrationIds = array( $_GET['id'] );

// prep the bundle
$msg = array
(
	'message' 	=> 'New Message',
	'title'		=> 'Title',
	'subtitle'	=> 'Subtitle',
	'tickerText'	=> 'Ticker Text',
	'vibrate'	=> 1,
	'sound'		=> 1,
	'largeIcon'	=> 'large_icon',
	'smallIcon'	=> 'small_icon'
);

$fields = array
(
	'registration_ids' 	=> $registrationIds,
	'data'			=> $msg
);

$headers = array
(
	'Authorization: key=' . API_ACCESS_KEY,
	'Content-Type: application/json'
);

$ch = curl_init();
curl_setopt( $ch,CURLOPT_URL, 'https://android.googleapis.com/gcm/send' );
curl_setopt( $ch,CURLOPT_POST, true );
curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
$result = curl_exec($ch );
curl_close( $ch );

echo $result;

?>
```

### Step 6

Now that our PHP script is ready, install the Push Notifications plugin from ngCordova and then we need to write Ionic code to register our device:

```
angular.module('starter').controller('TestCtrl', function($rootScope, $scope, $cordovaPush, $cordovaDevice) {
    var androidConfig = {
        "senderID": "ENTER_PROJECT_ID_FROM_API_CONSOLE_OVERVIEW",
    };
    document.addEventListener("deviceready", function() {
        $cordovaPush.register(androidConfig).then(function(result) {
            console.log(result);
            // Success
        }, function(err) {
            console.log(err);
            // Error
        })
        $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
            console.log(event);
            console.log(notification);
            switch (notification.event) {
                case 'registered':
                    if (notification.regid.length > 0) {
                        alert('registration ID = ' + notification.regid);
                    }
                    break;
                case 'message':
                    // this is the actual push notification. its format depends on the data model from the push server
                    alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
                    break;
                case 'error':
                    alert('GCM error = ' + notification.msg);
                    break;
                default:
                    alert('An unknown GCM event has occurred');
                    break;
            }
        });
    }, false);
});
```

The above controller allows us to register the device when the app loads and it will give us a registration ID. This is the ID we need to provide to our PHP script to send a push notification to this device. In later stages, you might want to automate all this stuff but in this article, we are only covering the basics of Push Notifications.

When you run your PHP script, pass in the Registration ID as a GET parameter like:

```
http://localhost/script.php?id=ENTER_REGISTRATION_ID_HERE
```

Before you hit Enter, minimise the app on your Android Device and return to the Home Screen so that you can see the proper effect of the Push Notification arriving. Trust me, it feels good.

[ng-cordova]: http://ngcordova.com
[hybrid-mobile-apps]: http://developer.telerik.com/featured/what-is-a-hybrid-mobile-app/
[getting-started-ionic]: http://ionicframework.com/getting-started/
[gcm]: https://developer.android.com/google/gcm/index.html
[api-console]: https://console.developers.google.com/
[push-plugin-ngcordova]: http://ngcordova.com/docs/plugins/pushNotifications/
