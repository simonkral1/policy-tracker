# Email Delivery

This repo can send an email update whenever new digest markdown lands on `main`.

The flow is:

```
content/*/*.md merged to main
        ↓
GitHub Actions workflow: .github/workflows/email-digest.yml
        ↓
scripts/send-digest-email.ts renders a short HTML + text email
        ↓
SMTP relay sends it to the configured recipient list
```

This is intentionally SMTP-based rather than tied to a single API vendor. Per Nodemailer’s SMTP docs, SMTP is broadly supported and avoids vendor lock-in while keeping the config simple. Source: [Nodemailer SMTP transport](https://nodemailer.com/smtp).

## What the email contains

- One email per push to `main` that changes `content/**`
- If one digest changed, the subject is that digest title
- If multiple digests changed in one push, they are grouped into one email
- Each digest block includes:
  - title
  - digest type
  - coverage period
  - `sources_cited`
  - `editor_note`
  - up to three `###` item headings as highlights
  - a link to the live site
  - a link to the markdown file on GitHub

## Required GitHub configuration

### Repository variable

Create this repository variable under **Settings → Secrets and variables → Actions → Variables**:

- `POLICY_TRACKER_EMAIL_ENABLED` = `true`

Optional but recommended:

- `POLICY_TRACKER_SITE_URL` = your public site URL, for example `https://policy.safer-ai.org`

If `POLICY_TRACKER_SITE_URL` is omitted, the script falls back to the standard GitHub Pages project URL pattern: `https://<owner>.github.io/<repo>`.

### Repository secrets

Create these repository secrets under **Settings → Secrets and variables → Actions → Secrets**:

- `POLICY_TRACKER_SMTP_HOST`
- `POLICY_TRACKER_SMTP_PORT`
- `POLICY_TRACKER_SMTP_SECURE`
- `POLICY_TRACKER_SMTP_USER`
- `POLICY_TRACKER_SMTP_PASS`
- `POLICY_TRACKER_EMAIL_FROM`
- `POLICY_TRACKER_EMAIL_TO`

Optional:

- `POLICY_TRACKER_EMAIL_REPLY_TO`

## Example SMTP setups

The workflow is provider-agnostic. Typical values look like:

### STARTTLS relay on port 587

- `POLICY_TRACKER_SMTP_HOST` = `smtp.example.com`
- `POLICY_TRACKER_SMTP_PORT` = `587`
- `POLICY_TRACKER_SMTP_SECURE` = `false`

### Implicit TLS relay on port 465

- `POLICY_TRACKER_SMTP_HOST` = `smtp.example.com`
- `POLICY_TRACKER_SMTP_PORT` = `465`
- `POLICY_TRACKER_SMTP_SECURE` = `true`

`POLICY_TRACKER_EMAIL_FROM` should usually be a full mailbox identity such as:

```text
SaferAI Policy Tracker <policy@safer-ai.org>
```

`POLICY_TRACKER_EMAIL_TO` can be a comma-separated list:

```text
simon@example.com,chloe@example.com
```

## Manual test

The workflow supports manual runs from the GitHub Actions UI:

1. Open **Actions → email-digest**
2. Click **Run workflow**
3. Leave `dry_run=true` for the first test
4. Optionally set `files` to one or more digest paths such as:

```text
content/2026-04-23/legislative-digest.md
```

If you leave `files` empty on a manual run, the workflow uses the three most recent digest files.

## Local preview

You can preview the generated email locally without sending anything:

```bash
bun install
bun run email:preview content/2026-04-23/legislative-digest.md
```

Or preview multiple files:

```bash
bun run email:preview \
  content/2026-04-23/legislative-digest.md \
  content/2026-04-23/newsletter-digest.md
```

## Operational notes

- The workflow triggers only on pushes to `main` that touch `content/**`
- It does not block deploys or validation
- A manual `workflow_dispatch` run is allowed even if `POLICY_TRACKER_EMAIL_ENABLED` is still unset, so you can dry-run before turning it on
