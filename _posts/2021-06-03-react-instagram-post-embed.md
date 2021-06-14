---
layout: post
title: 'InstagramPostEmbed - A React component to embed an Instagram Post'
date: 2021-06-05
description: 'An open source React component that uses the oEmbed API to embed an Instagram Post'
permalink: /blog/react-instagram-post-embed/
---

## TL;DR

`<InstagramPostEmbed />` is an Open Source React component that uses the [oEmbed API](https://developers.facebook.com/docs/instagram/oembed) to embed an Instagram post. View it in [action](https://katiaalamirco.github.io/react-component-library/?path=/story/instagrampostembed--default).

[Source code](https://github.com/katiaalamirco/react-component-library/blob/master/src/components/InstagramPostEmbed/InstagramPostEmbed.tsx)

## Inspiration

I built this component to familiarize myself with the Facebook Developer Network. So if you do like it, feel free to fork or share. You can find more components [here](https://github.com/katiaalamirco/react-component-library/tree/master/src/components).

## Installation

```bash
npm install --save @katiaalamirco/react-component-library
```

## Usage

```jsx

import { InstagramPostEmbed } from '@katiaalamirco/react-component-library';

// Single Post
<InstagramPostEmbed
  clientAccessToken="<token>"
  url="https://www.instagram.com/p/CO_u0wftV4Q/"
/>

// Multiple Posts
<InstagramPostEmbed
  clientAccessToken="<token>"
  url="https://www.instagram.com/p/CORs4wShENX/"
/>
<InstagramPostEmbed
  clientAccessToken="<token>"
  url="https://www.instagram.com/p/CNyrgMsh3a2/"
/>

// Hide Caption
<InstagramPostEmbed
  clientAccessToken="<token>"
  hideCaption
  url="https://www.instagram.com/p/CNxdfcCB8Yb/"
/>

// Max width 320px
<InstagramPostEmbed
  clientAccessToken="<token>"
  maxWidth={320}
  url="https://www.instagram.com/p/CNxdfcCB8Yb/"
/>

// Max width 658
<InstagramPostEmbed
  clientAccessToken="<token>"
  maxWidth={658}
  url="https://www.instagram.com/p/CNxdfcCB8Yb/"
/>
```

## Requirements

At the very minimum, you will need two things to use this component:

* This component requires the `clientAccessToken` which can be obtained by creating a Facebook App. For full requirements, please follow the instructions in the [Requirements section](https://developers.facebook.com/docs/instagram/oembed#requirements) of the documentation.
* You will also need the full link to an Instagram Post.

## Technical Quirk

The component will automatically take care of the quirk for you. I just thought it's an interesting point that folks might tend to miss while developing with the API.

After fetching the post details from the oEmbed API, you'll get a blob of HTML that can be inserted into the DOM. The embed HTML contains a reference to the Instagram [embed.js](https://www.instagram.com/static/bundles/metro/EmbedSDK.js/33cd2c5d5d59.js?fbclid=IwAR1TCV_bYJgZ3k4lAY7p01lJ_XvJP__4rAFmyAaCddmnPoBOgOplo1o1CG0) JavaScript library. Since the `html` is already in the DOM, the embed script needs to scan all the embed code and re-initialize it. This can be done by calling `instgrm.Embeds.process()` function after loading the library.

If this is not done, you'll get an empty Instagram post embed.

## Demo

Watch this component [in action](https://katiaalamirco.github.io/react-component-library/?path=/story/instagrampostembed--default).

## Support

If you find a bug, please [open an issue](https://github.com/katiaalamirco/react-component-library/issues).
