# opendatateam/udata-front-kit context
> refreshed 2026-09-04 | upstream default: main @ 570b504bd53d90f35ad0a15e6649e5e429a27b6f

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
- `2026-09-04` self-found trivial cleanup (typos + 1 dead link) — outcome: pr-opened (https://github.com/olitreadwell/udata-front-kit/pull/1) — lesson: packed 12 genuine meaning-preserving fixes across 10 files (README, CONTRIBUTING, code comments, config comment, cypress comment). No upstream PR touches these strings (gh search prs empty).

## Mined gaps (discovered, not yet attempted)
- none
