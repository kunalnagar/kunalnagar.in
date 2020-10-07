---
layout: post
title: 'Git Verified Commits'
date: 2019-07-31
description: 'Learn how to sign commits using your GPG key'
img: '/assets/img/foss/check.png'
permalink: /blog/git-verified-commits/
---

Verified or Signed commits act as a source of trust in open-source development. It's a way for people to know that the code came from a trusted source. Popular git hosting providers like GitHub, Bitbucket and GitLab have signed commits built into their interface so people can easily verify the authenticity of the repo. Here's an example of how it looks on GitHub:

{% include components/lightbox-img.html src="https://i.imgur.com/2ohqgII.png" alt="Screenshot showing a verified badge next to commits on GitHub" %}

## Add a GPG key to your account

You can use GPG to sign commits with your GPG key. For more information on GPG, go [here](https://gnupg.org/).

For the sake of this article, we will be dealing with verified commits on GitHub. We will also assume that you have a GPG key.

GitHub uses [OpenPGP](https://www.openpgp.org/) libraries to confirm that your locally signed commits and tags are cryptographically verifiable against a public key that you have added to your GitHub account.

{% include components/lightbox-img.html src="https://i.imgur.com/FvSL0aC.png" alt="Screenshot showing GPG keys section in GitHub settings" %}

## Tell Git to use your GPG key

After adding the public GPG key to your GitHub account, you need to tell `git` on your machine to use that key to sign commits. But first, let's get a list of keys on your account using:

{% highlight shell %}
$ gpg --list-secret-keys --keyid-format LONG

/home/kunal/.gnupg/pubring.kbx
------------------------------
sec   rsa4096/ABD83AC02AAC0953 2019-07-31 [SC] [expires: 2035-07-27]
      xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
uid                 [ unknown] Kunal Nagar <knlnagar@gmail.com>
ssb   rsa4096/xxxxxxxxxxxxxxxx 2019-07-31 [E] [expires: 2035-07-27]
{% endhighlight %}

In the above example, my public key is `ABD83AC02AAC0953` and we'll use that:

{% highlight shell %}
$ git config --global user.signingkey ABD83AC02AAC0953
{% endhighlight %}

## Signing your commit

When you're ready to commit your work, just add the `-S` flag to your commit command:

{% highlight shell %}
$ git commit -m -S "Testing signed commits"
{% endhighlight %}

If your key has a passphrase, you'll be asked to enter it now.

That's it! Push your commit and you can see the verified commit on your git hosting provider.

## References

- [Managing Commit Signature Verification (GitHub Knowledge Base)](https://help.github.com/en/articles/managing-commit-signature-verification)
