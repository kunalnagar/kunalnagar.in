---
layout: post
title: 'InstagramPostEmbed - A React component to embed an Instagram Post'
date: 2021-06-03
description: 'A simple middleware that adds a health check endpoint to your Express.js applications.'
permalink: /blog/react-instagram-post-embed/
---

## TL;DR

`<InstagramPostEmbed />` is an Open Source React component that uses the [oEmbed API](https://developers.facebook.com/docs/instagram/oembed) to embed an Instagram post. View it in [action](https://kunalnagarco.github.io/react-component-library/?path=/story/instagrampostembed--default).

[Source code](https://github.com/kunalnagarco/react-component-library/blob/master/src/components/InstagramPostEmbed/InstagramPostEmbed.tsx)

## Inspiration

I built this component to familiarize myself with the Facebook Developer Network. So if you do like it, feel free to fork or share. You can find more components [here](https://github.com/kunalnagarco/react-component-library/tree/master/src/components).

## Installation

```bash
npm install --save @kunalnagarco/react-component-library
```

## Usage

```jsx

import { InstagramPostEmbed } from '@kunalnagarco/react-component-library'

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

* How to create a Facebook app?
* How to create the Access token?
* Quirks about reinitializing after the HTML has loaded
