---
layout: post
title: 'Automatic Resume generation in PDF and text from JSON'
date: 2022-06-25
description: 'A process to store Resume data in JSON and generate PDF and text versions'
permalink: /blog/resume-generator/
---

**TL;DR** - Store Resume data as JSON and write node scripts to generate dynamic versions like PDF and text. Source [here](https://github.com/kunalnagar/kunalnagar.in/tree/master/scripts/resume)

- [Source JSON](https://github.com/kunalnagar/kunalnagar.in/blob/master/_data/resume.json)
- [PDF version](https://www.kunalnagar.in/assets/downloads/Resume-KunalNagar.pdf)
- [Text version](https://www.kunalnagar.in/assets/downloads/Resume-KunalNagar.txt)
- [Jekyll version](https://github.com/kunalnagar/kunalnagar.in/blob/master/index.md?plain=1)

---

My website is geared towards recruiters and folks to get to know me professionally. One of the things everyone looks at is the Resume. I offer my Resume as a PDF or a Text file as downloads on this site. When a recruiter reaches out, I just redirect them to my website and they can choose the format that works for them.

## Inspiration

Over the years, I've found myself updating my Resume and tweaking it's format. The issue is that I have to do it twice - one for the PDF and another for the text. I'm a lazy developer and thought to myself - let's automate this such that if there's an update, I can only update it once and the PDF/text versions would be generated automatically. Another advantage with this approach is the ability to write a generator for a new format - like `.docx` that I plan on doing soon.

Please note that this is something that works for me, and may not be the best implementation.

## JSON - single source of truth

Here's why I decided to use JSON to store the data:

* Easy to read and understand
* Self-describing syntax. By looking at the structure of a JSON document, it is possible to interpret the context
* Stored as simple text and can be easily parsed in multiple environments

The source file can be found [here](https://github.com/kunalnagar/kunalnagar.in/tree/master/scripts/resume).

### Creating a PDF

After looking at the libraries available in the ecosystem, I decided to go with [pdfkit](https://pdfkit.org/) as it was the easiest to get started and offered a simple enough syntax.

The source code can be found [here](https://github.com/kunalnagar/kunalnagar.in/blob/master/scripts/resume/create_pdf_file.js)

Essentially, here's what is happening:

* Get resume data as a JSON object
* Create an empty PDF document with margins
* Set the output path
* Render the different sections of the Resume

### Creating a text file

Writing this generator was a breeze as there is no third-party library required. All you need is to generate a template string and output it to a file using the [fs](https://nodejs.org/api/fs.html#fswritefilesyncfile-data-options) module.

### Auto-generation during deployment

Now that we have our node scripts that generate PDF and text versions of our resume, it's time to write a command to do so dynamically in the CI environment when this website gets generated.

We could also check-in these files into the git repo by manual generation. However, this is a problem for me as I tend to forget things unless enforced by a rule. When merging a PR, it is possible that I forget to run the node scripts locally. Hence, I decided to do this part in CI.

I created a dedicated `package.json` [script](https://github.com/kunalnagar/kunalnagar.in/blob/master/package.json#L14) to generate these files, but integrated it in the same `build` command that generates the website. This way, I didn't have to change any of my CI/CD scripts.

### Can I use this to generate my own Resume?

Absolutely! As long as you are using [Node.js](https://nodejs.org/en/), you should be able to copy the source JSON format, tweak it to add your own data/work experience and run the respective generator to generate the file.

---

And that's it! Any time I make a change to the source JSON data, all formats are regenerated and deployed automatically.


