# Setup

First-time setup for the tracker owner (currently Simon). By the end of this guide the repo is on GitHub, the site is serving on Pages, and the three Routines are configured and scheduled.

## Prerequisites

- [ ] A claude.ai **Team plan** seat with Claude Code enabled. Routines require Claude Code on web.
- [ ] A GitHub account (personal is fine for v1).
- [ ] DNS control for `safer-ai.org`. Optional — you can defer custom domain setup and use the default `*.github.io` URL.
- [ ] [Bun](https://bun.sh) installed locally for running validators (`bun --version`).

## 1. Create the GitHub repo

Create an empty repo on GitHub. For v1, a personal account is fine; we will move it to the `saferai` org once a service seat is provisioned (see `docs/MIGRATION.md`).

Name suggestion: `policy-tracker`. Visibility: public (the digests are meant to be readable) or private if the team prefers to start quiet.

## 2. Push this directory to the repo

From the root of this checkout:

```bash
git init
git add .
git commit -m "Initial import"
git branch -M main
git remote add origin git@github.com:<your-username>/policy-tracker.git
git push -u origin main
```

When the repo later moves to the `saferai` org, follow `docs/MIGRATION.md`.

## 3. Enable GitHub Pages

In the GitHub UI:

| Step | Action |
|------|--------|
| 1 | Settings → Pages |
| 2 | Under "Build and deployment", set **Source** to **GitHub Actions** |
| 3 | Commit any change to `main` (or rerun the action) to trigger the first build |

The site will first appear at `https://<your-username>.github.io/policy-tracker/`.

## 4. Install dependencies locally

You only need these for running validators and previewing the site. The Routines install their own dependencies in Anthropic's cloud.

```bash
bun install            # root: validator scripts
cd site && bun install # site: Astro
```

Preview the site with `bun run dev` from inside `site/`.

## 5. Install the Claude GitHub App on the repo

The Routines clone the repo and open PRs through the Claude GitHub App. The simplest path is to let the Routines UI prompt you on first run; detailed instructions are in `docs/ROUTINE-SETUP.md`.

## 6. Create the three Routines

Follow `docs/ROUTINE-SETUP.md`. You will end up with one Routine per digest type (legislative, newsletter, papers), each on its own schedule.

## 7. Optional — custom domain

If you want `policy.safer-ai.org` instead of the `github.io` default:

| Step | Action |
|------|--------|
| 1 | In your DNS provider, add a `CNAME` record: `policy` → `<your-username>.github.io` |
| 2 | In GitHub: Settings → Pages → Custom domain → enter `policy.safer-ai.org` |
| 3 | Wait for DNS to propagate, then tick **Enforce HTTPS** |

## Troubleshooting

| Symptom | One-line fix |
|---------|--------------|
| Pages shows a 404 after first push | Check Settings → Pages "Source" is set to **GitHub Actions**, not a branch. |
| `bun: command not found` | Install Bun: `curl -fsSL https://bun.sh/install \| bash`, then reopen the shell. |
| Routine run fails with a clone error | Reinstall the Claude GitHub App on the repo (Settings → GitHub Apps). |
| A new digest is merged but not visible on the site | Check the Pages deploy action; a failed build holds the last good version. |
