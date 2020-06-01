---
layout: post
title: 'Customize your Bash Prompt'
date: 2019-02-23
description: 'I like to keep my bash prompt clean and simple. Learn how to setup a minimal bash prompt.'
img: '/assets/img/foss/terminal.png'
permalink: /blog/customize-bash-prompt/
---

I like to keep my bash prompt really minimal. I'm not into colours. I'm not into fancy fonts. I want my prompt to show contextual information so I can focus on the work I'm doing.

By default, macOS gives you this terminal:

{% include components/lightbox-img.html src="https://i.imgur.com/n57DPG3.png" %}

I fucking hate it. Why do I need to see my machine name every time I open the terminal? [Phooey](https://www.merriam-webster.com/dictionary/phooey).

Plus, when I navigate to a git repo, it doesn't even show what branch I'm on. Double phooey.

{% include components/lightbox-img.html src="https://i.imgur.com/sNgVmfJ.png" %}

## My setup

Here's what I have and I'm really happy with it.

{% include components/lightbox-img.html src="https://i.imgur.com/3Dwoh1Z.png" %}

## What do I like about it?

Couple of things:

- Shows me what user I'm logged in as (good on unix systems when you want to switch between root and normal user)
- Shows me the full (read FULL) path of where I am. Yes, FULL.
- Shows me the branch I'm on (if I'm in a git repo)

Things I don't need here:

- Machine name
- Date
- 10 billion colours
- Emoji.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<small><small><small>Well...</small></small></small>

## How to set it up

If you're really impressed by it and just want the code, copy paste the following in your `~/.bash_profile` and move on with your life.

```
git_prompt() {

    local branchName="";

    # Check if the current directory is in a Git repository.
    if git rev-parse --git-dir > /dev/null 2>&1; then
        branchName="$(git symbolic-ref --quiet --short HEAD 2> /dev/null || \
	        git rev-parse --short HEAD 2> /dev/null || \
		    echo '(unknown)')";
        echo -e "(${branchName})";
    else
        return;
    fi;

}

PS1="\n[\u] at \w";

PS1+=" \$(git_prompt)";

PS1+="\n=> ";
```

If you're like me and want to understand what this gibberish means, read on.

The `git_prompt()` method spits out the current branch name, if it exists. Let's try to break it down.

## Step 1

Let's run the first half of the command in a git repo and a normal folder and see what happens

```
[kunalnagar] at ~/Documents/Code/personal-main (updates-v3)
=> git rev-parse --git-dir
.git

[kunalnagar] at ~/Documents/Code/personal-main (updates-v3)
=> cd ..

[kunalnagar] at ~/Documents/Code
=> git rev-parse --git-dir
fatal: not a git repository (or any of the parent directories): .git
```

So basically, this command is used to check if our current working directory is a git repo or not.

What's the writing to `/dev/null` and `2>&1` mean? Read more [here](https://askubuntu.com/questions/12098/what-does-outputting-to-dev-null-accomplish-in-bash-scripts)

## Step 2

Once we've figured out that we are, actually, inside a git repo, we need to figure out what branch we're in. Now please note that this can get fairly complicated with detached HEAD states etc. which is where most solutions on the internet fail. This is the best one I've found that works across a wide range of scenarios.

```
[kunalnagar] at ~/Documents/Code/personal-main (updates-v3)
=> git symbolic-ref --quiet --short HEAD 2> /dev/null
updates-v3

[kunalnagar] at ~/Documents/Code/personal-main (updates-v3)
=> cd ..

[kunalnagar] at ~/Documents/Code
=> git symbolic-ref --quiet --short HEAD 2> /dev/null
```

The `git symbolic-ref` allows us to read, modify and delete [symbolic refs](https://stackoverflow.com/a/1526526)

For more information on the flags, check out [`--quiet`](https://git-scm.com/docs/git-symbolic-ref#git-symbolic-ref---quiet) and [`--short`](https://git-scm.com/docs/git-symbolic-ref#git-symbolic-ref---short)

As you can see from the above example, when the above command is run, it spits out the branch name.

The `git rev-parse` is used as a safety net in scenarios like detached heads where we might need to pick out params from a lot of info

```
[kunalnagar] at ~/Documents/Code/personal-main (updates-v3)
=> git symbolic-ref --quiet --short HEAD 2> /dev/null || git rev-parse
updates-v3
```

## Step 3

Cool, now we have the branch name. Now we just need to set the bash variable `PS` to show our minimal prompt

```
PS1="\n[\u] at \w";
```

`\n`: New line

`\u`: Current user (name)

`\w`: Path relative to home (notice the tilda in the path names in the screenshots)

```
PS1+=" \$(git_prompt)";
```

This appends the branch name in parentheses (if it's a git repo)

```
PS1+="\n=> ";
```

Just a new line. With a short arrow.

And we're done! Hope this made sense. Bash scripting is fun. A side project I'm working on is to transition my SCSS compilation to CSS using Makefiles. Will post my findings soon.
