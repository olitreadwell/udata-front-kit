# opendatateam/udata-front-kit context

> refreshed 2026-09-09 | upstream default: main @ 2180fa710600d3eab21b6c224a0be861f5273a3a

## Identity & policies

- upstream: opendatateam/udata-front-kit, default branch `main`, primary language Vue/TypeScript.
- English-first? No — communication/docs are French (CONTRIBUTING: "Communication is in French"); code + code documentation are English (BR). Fix typos in the repo's own dialect: French in docs/UI, English (BR) in code comments.
- CLA/DCO: none (no CLA bot, no DCO in CONTRIBUTING).
- AI-assisted PR policy: unstated (no ban, no disclosure requirement).
- signed commits required: no.
- PR template: none (repo or org `opendatateam/.github`).
- external tracker: github.

## Conventions (verified from merged PRs)

- branch naming: mixed; dominant Conventional-Commits style (`feat/...`, `fix/...`, `chore/...`, `release(...)`), plus site-merge branches (`{site}-preprod-merge`). Use `fix/...` or `chore/...` for a trivial cleanup.
- commit style: Conventional Commits (`type(scope): subject`).
- test/lint commands: `pnpm run type-check`, `pnpm run lint`, `pnpm run format:check`, `pnpm run test:single`, `pnpm run build`.
- CI: GitHub Actions `.github/workflows/tests.yml` — lint-and-type-check, unit-tests, e2e-tests (matrix of site_ids). Runs on PRs.
- outside PRs: mostly maintainer-authored (abulte, eudespeyre, agarrone); occasional external merges.

## Maintainer picture

- active maintainers: abulte, eudespeyre, agarrone; responsive (recent merges within days).

## Issue-area health

- No contested/redesign signals relevant to a docs/typo cleanup pass.

## Gap ledger (dedupe — READ FIRST, never re-pick)

- `2026-09-04` self-found trivial cleanup (typos + 1 dead link) — outcome: pr-opened (https://github.com/olitreadwell/udata-front-kit/pull/1) → promoted + MERGED upstream 2026-09-05 as https://github.com/opendatateam/udata-front-kit/pull/1375 — lesson: packed 12 genuine meaning-preserving fixes across 10 files; upstream merged cleanly, so the packed-trivial approach is accepted by this repo.

## Mined gaps (discovered, not yet attempted)

- none
- `2026-09-09` self-found trivial cleanup (dead links + typo) — outcome: pr-opened (https://github.com/olitreadwell/udata-front-kit/pull/4) — 5 meaning-preserving fixes in 4 files: CONTRIBUTING.md Vutest→Vitest (dead link + wrong framework); doc/a11y/svg.md cited-year 2021→2019 (matches linked URL); configs/defis/config.yaml + configs/hackathon/config.yaml add missing `/guides/` path segment to 3 404ing guides.data.gouv.fr links. Fork CI all green (lint/type-check, unit, 8× e2e success), mergeable_state clean.
- `2026-09-09` self-found trivial cleanup (typos) — outcome: pr-opened (https://github.com/olitreadwell/udata-front-kit/pull/5) — 12 meaning-preserving typo fixes in 5 files: TopicFormView.vue comment ipnuts→inputs; ecospheres accessibility.md conforimté→conformité + st-elle→est-elle; ArticleAnticiperParcoursUsager.vue altenratifs→alternatifs (×2); ArticleQuestCeQuUneAPI.vue + ArticleGuideBasePetitesCollectivites.vue Dîtes-le nous une fois→Dites-le-nous une fois (official gov term, matches other articles). Fork CI all green (lint/type-check, unit, 8× e2e success), mergeable_state clean.
