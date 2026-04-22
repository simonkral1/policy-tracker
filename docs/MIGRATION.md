# Migration

How to move ownership of the Policy Tracker from Simon's personal Claude seat and GitHub account to a SaferAI service account. Do this once a service seat is provisioned; until then, personal-seat operation is fine.

## Why migrate

- **Bus factor.** The tracker should not stop because Simon is on leave.
- **Identity on commits.** Automated PRs and Routine runs should be attributable to `policy-tracker@safer-ai.org`, not to an individual.
- **Shared review.** The `saferai` GitHub org gives the whole team review access by default.
- **No schedule lock-in.** Avoids "Simon's holiday" becoming "the Routine is paused".

## Prerequisites

A SaferAI admin provisions a new Claude Team seat — suggested address `policy-tracker@safer-ai.org` — with Claude Code enabled.

## Steps

| # | Action |
|---|--------|
| 1 | Log in to <https://claude.ai> as the service account and accept the Team seat. |
| 2 | Transfer the GitHub repo into the `saferai` org (Settings → Transfer), or create a fresh `saferai/policy-tracker` repo and push this history to it. |
| 3 | Reinstall the Claude GitHub App on the repo at its new location (the app grant does not follow a transfer). |
| 4 | Under the service account, recreate each of the three Routines by pasting the prompts from `routines/<type>/prompt.md`. Routines are not transferable between Claude accounts today, so this step is manual. |
| 5 | Rotate the API trigger tokens; store the new ones in the shared SaferAI password manager. |
| 6 | Update any bookmarks, doc links, and `README.md` references to point at the new repo URL. |
| 7 | Delete the old Routines under Simon's seat so they do not double-run. |
| 8 | Run each new Routine once via **Run now** and confirm the PR opens, the content is sensible, and the site redeploys after merge. |

Only call the migration done after step 8 succeeds for all three Routines. Until then, leave the old Routines disabled rather than deleted, so you have a rollback option.
