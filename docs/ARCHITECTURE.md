# Architecture

This document explains what the SaferAI Policy Tracker is and why it is built the way it is. Read this first if you are trying to decide whether to extend it, replace it, or copy the pattern for something else.

## The problem

SaferAI's policy team tracks EU AI regulation, relevant newsletters, and fast-moving research. Until now, Chloé Touzet kept this going through a Claude Cowork scheduled task that produced a legislative digest each Monday. That worked, but it was tied to one person's seat, not versioned, not auditable by teammates, and not extensible to the other two digest types (newsletters, papers) the team also wanted.

The Policy Tracker replaces that single scheduled task with three weekly digests that are reviewable, versioned, and survive personnel changes.

## The three layers

```
Claude Code Routines  →  GitHub repo (this one)  →  Static site (GH Pages)
      (weekly)             (markdown in content/)        (policy.safer-ai.org)
```

1. **Generation.** Three [Claude Code Routines](https://code.claude.com/docs/en/routines) run weekly on Anthropic's cloud. Each Routine clones this repo, reads `sources/*.yaml` and the last four digests in `content/`, then opens a PR on a `claude/*` branch that adds a new file under `content/YYYY-MM-DD/`.
2. **Storage.** Markdown files in `content/`, one dated folder per week, three files per folder. Source configs live in `sources/*.yaml`. Everything is plain text in git.
3. **Delivery.** An [Astro](https://astro.build) site in `site/` reads `content/` at build time and ships a static HTML bundle to GitHub Pages. Search is handled by [Pagefind](https://pagefind.app), which indexes the static output.

## Why Claude Code Routines

Routines are billed against the SaferAI Claude Team subscription and run inside Anthropic's cloud, not on our infrastructure. There is no Anthropic API bill, no server to keep alive, no key to rotate. They are the successor to Claude Cowork's scheduled tasks — same pattern, better tooling, and a direct GitHub integration so the Routine can clone, commit, and open a PR without glue code.

Announcement and docs: <https://code.claude.com/docs/en/routines>. Dashboard: <https://claude.ai/code/routines>.

## Why Astro and GitHub Pages

The output is markdown; the audience is a handful of SaferAI teammates. A static site generator is the right fit. Astro is markdown-native, has good defaults, and does not pull in a React runtime we do not need. GitHub Pages is free, CDN-backed, and rebuilds automatically on push to `main`. There is no database, no auth layer, and no deploy pipeline to maintain beyond a single GitHub Action.

## Why markdown in git for content

The digests are the product. Keeping them as plain markdown in version control means:

- teammates can read them without the site (directly on GitHub, or in a local clone);
- every change has an author, a timestamp, and a diff;
- the content survives the Routines feature being renamed, repriced, or deprecated — the only thing we would need to replace is the generator;
- it plays well with future exports (email, RSS, Slack) because the source of truth is already text.

## What this is explicitly NOT

- **Not a CMS.** There is no admin UI. Edits happen through PRs.
- **Not a newsroom.** No editorial workflow, no multi-author scheduling, no drafts.
- **Not a server-side app.** Nothing runs between the site build and the reader.
- **Not a PAI dependency.** The tracker runs entirely inside SaferAI infrastructure (Claude Team + GitHub). Simon's personal PAI setup is not in the loop.

## Trade-offs

The honest limits. Routines are a research-preview product, so we expect the UI and capabilities to shift; we rely on them anyway because the alternative is a paid API bill we do not want. A Routine runs under a single Claude seat, which creates a bus-factor problem that `docs/MIGRATION.md` addresses by moving to a service account. The minimum scheduling cadence is roughly one hour, which is more than enough for a weekly digest but rules out reactive "breaking news" flows. These are acceptable costs for the current goal: give the policy team a reliable, versioned, low-maintenance weekly view.
