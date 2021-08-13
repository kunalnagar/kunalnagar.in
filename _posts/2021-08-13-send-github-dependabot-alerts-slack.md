---
layout: post
title: 'Send GitHub Dependabot Alerts to Slack'
date: 2021-08-13
description: 'An open source GitHub action to send Dependabot alerts to Slack'
permalink: /blog/send-github-dependabot-alerts-slack/
---

## @kunalnagarco/action-cve

An Open Source GitHub action that sends [Dependabot Security Alerts](https://docs.github.com/en/code-security/supply-chain-security/managing-vulnerabilities-in-your-projects-dependencies/configuring-dependabot-security-updates) to [Slack](https://api.slack.com/messaging/webhooks).

[Source code](https://github.com/kunalnagarco/action-cve)

![image](https://user-images.githubusercontent.com/2741371/129387647-f5fdead5-a002-4e3d-9d55-cb7ebe988ff1.png)

## Inspiration

GitHub has a webhook event called [repository_vulnerability_alert](https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#repository_vulnerability_alert) that is triggered when a vulnerability is discovered on a repository/organization. Unfortunately, there's no documentation (that I could find) to watch for this event in a GitHub action and send it to alerting platforms.

I created this GitHub action that can be run on a CRON schedule (every 6 hours is recommended) and sends the Dependabot alerts to Slack.

## Installation

There are a few things you need to setup on the repository before this action can be used:

1. [Enable Dependabot Alerts](https://docs.github.com/en/code-security/supply-chain-security/managing-vulnerabilities-in-your-projects-dependencies/configuring-dependabot-security-updates#managing-dependabot-security-updates-for-your-repositories).

2. Create a [GitHub Personal Access Token](https://github.com/settings/tokens).

3. Ideally, you'd want to send these alerts to a dedicated Slack channel. Create a [Webhook URL](https://api.slack.com/messaging/webhooks) for the channel. You may also use the [Incoming Webhooks Slack app](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks?tab=more_info) that makes it a lot easier.

3. Create a new GitHub action:

    ```yaml
    name: 'Check for Vulnerabilities'

    on:
      schedule:
        - cron: '0 */6 * * *' # every 6 hours

    jobs:
      main:
        runs-on: ubuntu-latest
        steps:
          # X.X.X - Latest version available at:
          #         https://github.com/kunalnagarco/action-cve/releases
          - uses: kunalnagarco/action-cve@vX.X.X
            with:
              token: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
              # Create a Slack Incoming Webhook URL:
              #     https://slack.com/apps/A0F7XDUAZ-incoming-webhooks
              slack_webhook: ${{ secrets.SLACK_WEBHOOK }}
    ```

After these steps, any Dependabot Alerts on the repository will be sent to the Slack channel every 6 hours.

## Support

If you find a bug, please [open an issue](https://github.com/kunalnagarco/action-cve/issues).
