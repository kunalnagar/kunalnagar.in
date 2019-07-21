---
layout: post
title:  "An Introduction to Vue Base Components"
date: 2019-04-21
description: "A collection of Vue Base Components to jumpstart your development"
img: "/assets/img/foss/vue.png"
permalink: /blog/vue-base-components/
---

{% include components/lightbox-img.html src="https://i.imgur.com/wB8Tk90.png" %}

Every front-end project needs a collection of UI components that look and feel consistently across the product. Branding and design play an important role and it's important that your product feels cohesive to your customers.

## Inspiration

This project takes inspiration from [Vuetify](https://vuetifyjs.com/en/) which is an excellent Material Component Framework.

But you don't necessarily want to use Material design for every project that you use. Sometimes, you'd prefer a set of minimally styled components that work consistently across browsers at the very least with an ability to add a theming layer that relates to your product/brand. That's exactly what this project aims to do.

## What are Vue Base Components?

Vue Base Components (or any custom components) essentially wrap basic HTML elements like Inputs, Selects, Buttons etc with a little more functionality use in everyday UI/UX patterns. Most of the time, they're available as [Single File Components](https://vuejs.org/v2/guide/single-file-components.html) (ideally) and can be easily imported in your own project.

Let's take an example of a simple button.

## Example: BaseButton

When developing a custom button, here's a basic checklist of things you'd like the button to do:

* Base button (works out of the box)
* Add a link and navigate on click
* Icon Support
* Loading states
* Enabled/Disabled states
* Multiple themes (for e.g. link view where the button looks like a link instead of a button)

When you use the ```<BaseButton />``` component out of the box, it will look something like:

{% include components/lightbox-img.html src="https://i.imgur.com/F2p7Kl9.png" %}

If you want to add an icon, it's as simple as doing:

```
<BaseButton icon="save" />
```

{% include components/lightbox-img.html src="https://i.imgur.com/qqyZQFz.png" %}

If you want to change the text:

```
<BaseButton icon="download" text="Download" />
```

{% include components/lightbox-img.html src="https://i.imgur.com/DnQZHND.png" %}

If you want to add a link:

```
<BaseButton href="https://google.com" />
```

**Note:** This project ships with the [free version of Font Awesome icons](https://fontawesome.com/icons?d=gallery&s=solid&m=free) (solid styles only) by default but there will be an option to add your Subscription key so you can use the entire suite.

## Advantages

There are a number of advantages to using Base Components - the most important being consistent.

**If you have** a primary button in your product, you'd like that button to look the same and function everywhere, no matter what context it's used in.

**Secondly**, if you make any updates to your primary button, you would only need to update the Base Button file and all the changes would be propagated to multiple instances throughout your project.

**Note:** It's important to make sure that the API remains consistent. For example, if the ```prop``` for providing a link in a Base Button is changed from ```href``` to ```link```, the functionality of the button breaks and the Button is useless.

**Thirdly**, Base Components contain event hooks. For example, if you want custom code to be run when your ```<BaseInput />``` is focused, you can hook into the ```base:input:focus``` event.

## Links

This project is Open Source and under active development. Feel free to submit ideas/PRs!

* [GitHub](https://github.com/kunalnagar/vue-base-components)
