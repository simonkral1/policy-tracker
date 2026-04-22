# Consuming the Tracker

The SaferAI Policy Tracker publishes three weekly digests — legislative movement, newsletter summaries, and research-paper tracking. Here's how to use it.

## Where to read

The site lives at `<policy-tracker-site-url>`. Each week you will find three new entries dated that week (Monday for legislative, Friday for newsletters and papers).

## Bookmark it

Open the site once, bookmark it, and drop in on your own schedule. It is a static site, so it loads instantly and works offline from cache.

## Request a new source

Two ways, pick whichever is less friction:

- **Open an issue** on the repo with a one-line description and the URL. That is enough.
- **Open a PR** editing the relevant file in `sources/` — `newsletters.yaml`, `papers.yaml`, or `legislative.yaml`. The schema is documented at the top of each file.

## Request a change to a digest format

Format tweaks — sections, headings, the set of emoji used for stage indicators — are owned by Chloé Touzet. Email her or open an issue tagged `format`.

## Report a bad or missing item

Open an issue titled `digest feedback: <date>` and paste in the excerpt. Missing items are as useful to flag as wrong ones; both feed back into prompt iteration.

## What is on the roadmap

Listed so expectations stay grounded. These are **planned, not scheduled**:

- Email delivery of each digest.
- Slack bot that posts the digest in the relevant channel on publish.
- Audio version, delivered as a podcast RSS feed.

If any of these matter to you, say so in an issue — priority follows demand.
