# BaseTimer

BaseTimer is a mobile-first Base Mini App that records a wallet's first usage time onchain exactly once and turns that timestamp into a clean time dashboard.

## Stack

- Next.js App Router
- React 19
- wagmi + viem
- Base mainnet
- Vercel deployment

## Contract

- Address: `0xfdb2512b4d5ad6c4d48a45f7815e65741c8798f3`
- Builder code: `bc_3v0f5uva`
- Builder data suffix: `0x62635f33763066357576610b0080218021802180218021802180218021`
- ABI functions:
  - `firstUse(address) view returns (uint256)`
  - `start()`

## Attribution

`start()` transactions append the Base Builder Code ERC-8021 suffix so onchain activity can be attributed back to this app outside the Base App as well.

## Environment

No runtime environment variables are required for the app itself.

Deployment automation uses:

- `GITHUB_TOKEN`
- `VERCEL_TOKEN`

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

This repo is designed for direct Vercel CLI deployment:

```bash
vercel link --yes --project basetimer-miniapp
vercel deploy --prod --yes
```

## Base Mini App tags

The required tags are rendered directly in `app/layout.tsx`:

- `base:app_id`
- `talentapp:project_verification`

## Routes

- `/` home status dashboard
- `/status` details view with segmented switching and horizontal timeline scrolling
- `/my` wallet summary
