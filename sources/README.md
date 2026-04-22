# Sources

The YAML files in this directory declare what the three Routines track. Edit them to add or remove a source.

## Files

| File                | What                                                              |
|---------------------|-------------------------------------------------------------------|
| `newsletters.yaml`  | Substacks, blogs, podcasts the newsletter-digest Routine reads.   |
| `papers.yaml`       | arXiv categories, venues, tracked authors, keywords for papers.   |
| `legislative.yaml`  | EC / EP / national / intergovernmental targets for legislative.   |
| `people.yaml`       | Twitter-X handles to watch (via the legislative + newsletter).    |
| `events.yaml`       | Known future hearings / summits / consultation windows.           |
| `schema.ts`         | Zod schemas. Validators in `scripts/` import from here.           |

## Priority levels

- `core` — read every week, must never be missed.
- `secondary` — scanned, included if relevant.
- `experimental` — trialled for a few weeks, prune if low signal.

## Adding a source

1. Add the entry in the right YAML file.
2. Run `bun run validate:sources` to check schema.
3. Run `bun run verify:rss` if you added a newsletter with an RSS URL.
4. Open a PR titled `sources: add {name}`.

## Removing a source

Delete the entry. Also prune any orphan references in `routines/*/prompt.md`.
