---
layout: post
title: 'healthie - A health check middleware for Express.js'
date: 2020-11-07
description: 'A simple middleware that adds a health check endpoint to your Express.js applications.'
permalink: /blog/express-health-check-middleware/
---

## TL;DR

`healthie` is a free and open-source Express.js middleware that adds a `/health` endpoint to your Express.js applications and returns it's uptime with a status of `OK`.

Source code and documentation: [https://github.com/kunalnagar/healthie](https://github.com/kunalnagar/healthie)

## Inspiration

I recently stumbled onto [some options recommended by Express.js](https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html) to add health check customization options to your project. While all of them are fantastic and well-maintained, they provide a lot more functionality than I need.

I built this package purely to dive deep into Express.js middleware. So if you do like it, feel free to fork or share. Going forward, I think it would be reasonable to provide an option to customize the health-check route, or the status message.

## Installation

```
npm install --save @kunalnagarco/healthie
```

## Usage

```js
const express = require('express');
const app = express();
const { handleHealthCheck } = require('@kunalnagarco/healthie');

app.use(handleHealthCheck());
```

## Result

Visit `/health` and you should see the following:

```json
{
  "uptime": 36.883064168, // process.uptime
  "status": "OK"
}
```
