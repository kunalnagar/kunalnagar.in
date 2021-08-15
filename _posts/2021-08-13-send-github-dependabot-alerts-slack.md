---
layout: post
title: 'Send GitHub Dependabot Alerts to Slack'
date: 2021-08-13
description: 'An open source GitHub action to send Dependabot alerts to Slack'
permalink: /blog/send-github-dependabot-alerts-slack/
---

![marketing](https://user-images.githubusercontent.com/2741371/129468484-bc0cb5f5-1db5-4ea0-96c6-7f1d2d0aa347.png)

## @kunalnagarco/action-cve

An Open Source GitHub action that sends [Dependabot Security Alerts](https://docs.github.com/en/code-security/supply-chain-security/managing-vulnerabilities-in-your-projects-dependencies/configuring-dependabot-security-updates) to [Slack](https://api.slack.com/messaging/webhooks) and [PagerDuty](https://developer.pagerduty.com/docs/events-api-v2/trigger-events/).

[Source code](https://github.com/kunalnagarco/action-cve)

## Inspiration

GitHub has a webhook event called [repository_vulnerability_alert](https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#repository_vulnerability_alert) that is triggered when a vulnerability is discovered on a repository/organization. Unfortunately, there's no documentation (that I could find) to [watch for this event](https://docs.github.com/en/actions/reference/events-that-trigger-workflows) in a GitHub action and send it to alerting platforms.

I created this GitHub action that can be run on a CRON schedule (every 6 hours is recommended).

## Installation

There are a few things you need to setup on the repository before this action can be used:

1. [Enable Dependabot Alerts](https://docs.github.com/en/code-security/supply-chain-security/managing-vulnerabilities-in-your-projects-dependencies/configuring-dependabot-security-updates#managing-dependabot-security-updates-for-your-repositories) for the repository.

2. Create a [GitHub Personal Access Token](https://github.com/settings/tokens) and add it to the [repository's secrets](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository).

3. **For Slack**, you'd want to send these alerts to a dedicated channel. Create a [Webhook URL](https://api.slack.com/messaging/webhooks) for the channel and add it to the repository's secrets. You may also use the [Incoming Webhooks Slack app](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks?tab=more_info) that makes it a lot easier.

    [Screenshot](https://user-images.githubusercontent.com/2741371/129387647-f5fdead5-a002-4e3d-9d55-cb7ebe988ff1.png)

    **For PagerDuty**, the action will send an [Alert Event](https://developer.pagerduty.com/docs/events-api-v2/trigger-events/) which should create a new Incident with an `info` severity.

    [Screenshot](https://user-images.githubusercontent.com/2741371/129468542-33ecda7a-7696-40c8-99e4-76d327fca959.png)

3. Create a new GitHub action:

    <script src="https://gist.github.com/kunalnagar/7e20b7fb4340162b06ad246bcc0a8288.js"></script>

## Support

If you find a bug, please [open an issue](https://github.com/kunalnagarco/action-cve/issues).
