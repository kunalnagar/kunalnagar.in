---
layout: post
title:  "Export multiple Highcharts graphs as PDF"
date: 2019-04-18
description: "Learn how to export multiple Highcharts graphs to a PDF"
img: "/assets/img/foss/highcharts.png"
permalink: /blog/highcharts-export-pdf/
---

Most recently, I was tasked to convert a page containing multiple graphs to a single PDF without using server-side technologies. The graphs were rendered using Highcharts and the final PDF needed to have really good quality.

If you want to skip to the code, there's a fiddle at the end of the post. Knock yourself out.

## Default Export

By default, Highcharts has exporting functionality built in to the hamburger menu available on the top right of every graph. Of course, you need the [exporting module](https://www.highcharts.com/docs/export-module/export-module-overview) to be included for that to show up.

![](https://i.imgur.com/D8hmB7I.png)

While it works pretty well out of the box, the problem is that you can only download one graph at a time. What if you need to add multiple graphs (like a dashboard) to a PDF?

## Setup

You'll need the following libraries:

* Highcharts - Core
* Highcharts - Exporting Plugin
* Highcharts - Offline Exporting Plugin
* jsPDF

```
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/offline-exporting.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
```

**Note:** If you want offline exporting and don't want to send graph data to Highsoft's servers (for privacy reasons), yo need to add the following option to the Highcharts graph options:

```
exporting: {
    enabled: false,
    fallbackToExportServer: false
}
```

## Adding graphs to PDF

The way this works is that we need to export the Highcharts graph as an image and then slap it on the PDF. After a lot of testing, I've come to a conclusion that exporting a chart as SVG on the PDF gives best results and quality.

In this example, we'll be using two charts - one scatter and one pie chart. Let's assume that their respective Highchart objects are ```chart1``` and ```chart2```

We will also need an instance of jsPDF:

```
var pdf = new jsPDF('p', 'mm', [1000, 1400]);
```

If you look at the Highcharts API, it has a method called [```exportChartLocal```](https://api.highcharts.com/class-reference/Highcharts.Chart#exportChartLocal) that allows you to export a chart in a specific format (JPEG, PNG, SVG and PDF). The problem is that calling the method triggers a download popup in the browser. We don't really want that - instead we want the ```dataURL``` (a base64 encoded string) of the image that we can put on the PDF using [```addImage```](http://raw.githack.com/MrRio/jsPDF/master/docs/module-addImage.html).

```
chart1.exportChartLocal('image/svg+xml');
chart2.exportChartLocal('image/svg+xml');
```

To stop the download popup and get the ```dataURL```, we need to hook into the ```downloadURL``` method on the base Highcharts object that will give us the ```dataURL``` and the ```filename``` of the image.

```
Highcharts.downloadURL = function (dataURL, filename) {
    pdf.addImage(dataURL, 'SVG', 10, 10);
};
```

Yet another problem here is that there is no callback to the ```exportChartLocal``` method so we'll have to use a counter and an array to store the dataURLs in an array.

```
var counter = 0;
var imageURLs = [];
Highcharts.downloadURL = function (dataURL, filename) {
    imageURLs.push(dataURL);
    counter++;
};
```

To check if all the dataURLs are added to the array, we need to poll continuously. Once the array is prepared, we loop over it and add the image URLs to the PDF:

```
var interval = setInterval(function() {
    if(counter === 2) {
        clearInterval(interval);
        imageURLs.forEach(function(img) {
            pdf.addImage(img, 'SVG', 10, 10);
            pdf.addPage();
        });
        pdf.save('test.pdf');
    }
}, 100);
```

And it's done! Here's a demo of the entire process. Switch to the **Result** tab and click on the **Export** button to download the PDF. The code contains comments so it's easy to follow.

<iframe width="100%" height="500" src="//jsfiddle.net/kunalnagar/aku06o24/53/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
