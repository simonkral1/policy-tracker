# SaferAI Policy Tracker

An AI-generated weekly monitoring system for SaferAI's policy team. Three recurring digests — **legislative movement**, **newsletter summaries**, and **research-paper tracking** — produced by [Claude Code Routines](https://code.claude.com/docs/en/routines) and published to a static website.

No servers. No API bills. Runs on the SaferAI Claude Team subscription.

## How it works

```
Claude Code Routines  →  GitHub repo (this one)  →  Static site (GH Pages)
      (weekly)             (markdown in content/)        (policy.safer-ai.org)
```

Each week, three Routines run on Anthropic's cloud. They clone this repo, summarise sources declared in `sources/*.yaml`, and open a PR adding a new file to `content/YYYY-MM-DD/`. Merging the PR rebuilds and redeploys the site.

## Quickstart (for SaferAI teammates)

1. **Read the latest digest** at the site URL (bookmark it).
2. **Subscribe** — either bookmark the site or enable the optional email-update flow in [`docs/EMAIL-DELIVERY.md`](docs/EMAIL-DELIVERY.md).
3. **Request a source be added** — open an issue, or edit `sources/newsletters.yaml` and open a PR.

## Quickstart (for the tracker owner)

Full setup is in [`docs/SETUP.md`](docs/SETUP.md). Short version:

1. Create a GitHub repo from this directory.
2. Push to `main`.
3. Follow [`docs/ROUTINE-SETUP.md`](docs/ROUTINE-SETUP.md) to create the three Routines at [claude.ai/code/routines](https://claude.ai/code/routines).

## Repository layout

| Path         | What                                                          |
|--------------|---------------------------------------------------------------|
| `content/`   | The digests. One dated folder per week. Written by Routines.  |
| `sources/`   | YAML configs for newsletters, papers, legislative targets.    |
| `routines/`  | The prompts each Routine runs.                                |
| `site/`      | Astro static site that renders the digests.                   |
| `scripts/`   | Validators (RSS reachability, YAML schema, frontmatter).      |
| `docs/`      | Setup, architecture, migration, consuming.                    |

## Docs

- [Architecture](docs/ARCHITECTURE.md) — why Routines, why Astro, the end-to-end flow.
- [Setup](docs/SETUP.md) — creating the repo, installing the Claude GitHub App, DNS.
- [Routine Setup](docs/ROUTINE-SETUP.md) — step-by-step for each of the three Routines.
- [Email Delivery](docs/EMAIL-DELIVERY.md) — send an email whenever new digest content lands on `main`.
- [Migration](docs/MIGRATION.md) — moving ownership from an individual seat to a service seat.
- [Consuming](docs/CONSUMING.md) — how teammates use the tracker day-to-day.

## Licence

MIT. See [`LICENSE`](LICENSE).
