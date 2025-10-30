# Vue Whop App Template

A Vue 3 template for building Whop iframe apps with TypeScript and Tailwind CSS.

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Configure your environment variables in `.env`:
```env
WHOP_API_KEY=your_api_key_here
WHOP_APP_ID=your_app_id_here  
WHOP_COMPANY_ID=your_company_id_here
WHOP_USER_ID=user_id_from_iframe_params
```

Get your API key and App ID from your [Whop Developer Dashboard](https://whop.com/dashboard/developer).

## Development

Run the dev server:
```bash
pnpm dev
```

Run with Whop dev proxy:
```bash
pnpm whop-proxy
```

## Build

```bash
pnpm build
```

## SDK Usage

This template uses `@whop/sdk` for:
- Fetching user data
- Checking membership/access
- Gating content based on Whop memberships

See `src/composables/useWhop.ts` for the SDK implementation.

## Project Structure

```
src/
├── components/
│   └── MembershipGate.vue  # Example membership gating component
├── composables/
│   └── useWhop.ts          # Whop SDK composable
├── App.vue                 # Main app component
└── main.ts                 # App entry point
```

## License

MIT
