# Routine Setup

This is the load-bearing guide: how to create and configure the three Claude Code Routines that generate the weekly digests. Follow it once per Routine; budget roughly ten minutes per Routine the first time.

## What a Routine is

A Claude Code Routine is a scheduled or API-triggered run of Claude Code in Anthropic's cloud, scoped to a single GitHub repo. It clones the repo, executes against the prompt you give it, and can commit, push, and open a PR. Billing goes against your Claude Team subscription rather than the API. Full docs: <https://code.claude.com/docs/en/routines>. Note that Routines are currently a research preview, so expect the UI to evolve.

## Prerequisites

Before creating the first Routine, confirm:

| Prerequisite | How to check |
|--------------|--------------|
| Claude Code on web is enabled for your seat | Open <https://claude.ai/code>. You should see the Claude Code workspace. |
| Your GitHub account is authorised to Claude Code | From the web workspace, run `/web-setup`, or use the GitHub button in the GUI. |
| The Claude GitHub App is installed on the `policy-tracker` repo | <https://github.com/apps/claude> → Configure → your account → select the repo. |

## The three Routines

You will create one Routine per digest type. Each one follows the same recipe, with different values pulled from `routines/<type>/prompt.md`.

Do this three times, once for each row of the cadence table below.

### Recipe (per Routine)

1. Go to <https://claude.ai/code/routines> and click **New routine**.
2. **Name.** Use the format `SaferAI — <Type> Digest`. So: `SaferAI — Legislative Digest`, `SaferAI — Newsletter Digest`, `SaferAI — Papers Digest`.
3. **Prompt.** Open `routines/<type>/prompt.md` in this repo. Copy the full contents into the Routine's prompt field. The prompt is self-contained; it tells Claude Code which sources to read, which deltas to compute, and where to write the output.
4. **Repository.** Select the `policy-tracker` repo. Leave "Allow unrestricted branch pushes" **off**: we want the Routine to push to `claude/*` branches and open PRs, not to commit straight to `main`.
5. **Environment.** Default is fine for v1. We do not need any environment variables — there is no API key to inject, because generation runs inside the Routine's own Claude Code session.
6. **Connectors.** Enable **Web Fetch** (required for reading RSS and policy pages). Leave Slack, Linear, and other connectors off until we deliberately add them.
7. **Trigger — Schedule.** Set the cron per the cadence table below. The timezone should be `Europe/Paris` so the digest lands when the team is online.
8. **Trigger — API.** Also add an **API trigger** so you can fire the Routine on demand (useful for testing prompt changes). The UI will generate a token; store it in 1Password or Bitwarden under the name `policy-tracker <type> fire token`. Do not commit it.
9. Save the Routine and confirm it appears enabled in the dashboard.

## Recommended cadence

| Routine | Schedule (Europe/Paris) | Reason |
|---------|------------------------|--------|
| Legislative | Monday 08:00 | Matches Chloé's existing rhythm; the team reads it first thing Monday. |
| Newsletter | Friday 17:00 | Captures the week's Substack and newsletter drops. |
| Papers | Friday 17:30 | Right after newsletters, so paper tracking sees whatever the newsletters flagged. |

## Running a Routine manually

Two ways:

- **From the UI.** Open the Routine at <https://claude.ai/code/routines> and click **Run now**.
- **Via the API trigger.** `POST` to the `/fire` endpoint with the token you saved in step 8. The exact curl is shown in the Routine's settings page; copy it from there rather than reconstructing it.

## Iterating on a prompt

The prompts live in `routines/<type>/prompt.md` in this repo, but the Routine holds its own copy in Anthropic's cloud. Today those do not auto-sync, so the loop is:

1. Edit `routines/<type>/prompt.md` locally.
2. Commit and push to `main`.
3. Open the Routine in the UI, go to **Edit**, and paste the new prompt in.
4. Save, then **Run now** to verify.

Flag this reconciliation step when onboarding anyone else: it is the easiest thing to forget.

## Pausing a Routine

For predictable quiet periods — August, end-of-year — toggle the Routine **off** in the dashboard rather than leaving it to generate empty digests. Toggle it back on when you want it running again. No state is lost.
