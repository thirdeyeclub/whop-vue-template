# Vue Whop App Template

A production-ready Vue 3 + TypeScript template for building Whop apps with authentication, membership gating, and seamless iframe integration.

## Tech Stack

- **Vue 3** - Composition API with `<script setup>`
- **TypeScript** - Full type safety with strict mode
- **Vite** - Lightning-fast dev server and build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Whop SDK** - Official Whop API integration

## Features

- User authentication via Whop SDK
- Membership status checking
- Automatic membership gating
- Type-safe composables
- Environment variable management
- Dev proxy for local Whop app testing

## Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Whop account with app credentials

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Copy the Environment variables from your Whop app developer dashboard.

Create a `.env` file in the project root:

```env
WHOP_API_KEY=*****
VITE_WHOP_APP_ID=your_app_id_here
VITE_WHOP_API_KEY=your_api_key_here
VITE_WHOP_COMPANY_ID=your_company_id_here
```
Please note when copying over these from Whop you must replace the NEXT_ prefix with VITE_

### 3. Start Development Server

```bash
pnpm dev
```

App runs at `http://localhost:5173`

### 4. Run with Whop Dev Proxy

For testing your app as it would run in Whop's iframe:

```bash
pnpm whop-proxy
```

Then access at `http://localhost:3000`

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Vite dev server |
| `pnpm build` | Type-check with `vue-tsc` and build for production |
| `pnpm preview` | Preview production build locally |
| `pnpm whop-proxy` | Run Whop dev proxy for iframe testing |


## How It Works

### Authentication Flow

The `useWhop` composable initializes the Whop SDK and provides methods for:

- `fetchUser()` - Retrieves current authenticated user
- `checkMembership()` - Checks if user has active membership
- `currentUser` - Reactive ref to user data
- `error` - Reactive ref to error messages

### Membership Gating

The `MembershipGate` component automatically checks membership status and displays appropriate content or upgrade prompts.


## Building for Production

```bash
pnpm build
```

Output is in `dist/` directory, ready to deploy to your hosting provider or Whop platform.

## Customization

### Adding New Components

Create components in `src/components/` and import with relative paths:

```typescript
import MyComponent from './components/MyComponent.vue';
```

### Styling

Tailwind classes work out of the box. Customize theme in `tailwind.config.js`.

### API Calls

Use the Whop SDK instance from `useWhop`:

```typescript
const { sdk } = useWhop();
const data = await sdk.someEndpoint();
```

Whop's official docs are here https://docs.whop.com/get-started

## Troubleshooting

### Type Errors

Run type checking:
```bash
pnpm exec vue-tsc --noEmit
```

### Environment Variables Not Loading

Ensure `.env` file exists and variables are prefixed with `VITE_`.

### Proxy Connection Issues

Verify upstream port (5173) matches your Vite dev server port in the `whop-proxy` script.

## License

MIT
