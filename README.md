# htmx-todo

A proof of concept project to utilize Bun, htmx, Hono, Supabase in creating a full-stack application with Supabase Auth to be deployed on a Cloudflare Worker.

## Usage

> Anywhere `npm` is used, you can use `bun` for a faster development experience.

```bash
git clone https://github.com/Luzefiru/htmx-todo.git
cd htmx-todo
npm install
cp wrangler.toml.example wrangler.toml
```

### `wrangler.toml` Configuration

We have to edit your `wrangler.toml` file to have the proper variables for development & deployment.

- you can get your `SUPABASE_URL` and `SUPABASE_ANON_KEY` from [your Supabase Project Dashboard](https://supabase.com/dashboard/projects) > Project Settings on the Sidebar > Configuration > API.
- the `BASE_URL` under your deployment configuration `[vars]` should match the Cloudflare deployment URL, try deploying first with `npm run deploy`.

```bash
name = "htmx-todo-v2"
compatibility_date = "2023-12-01"
main = "src/index.tsx"

[vars]
SUPABASE_URL = "your-supabase-url"
SUPABASE_ANON_KEY = "your-supabase-anon-key"
BASE_URL = "https://your-cloudflare-deployment-url"

[env.dev.vars]
SUPABASE_URL = "your-supabase-url"
SUPABASE_ANON_KEY = "your-supabase-anon-key"
BASE_URL = "http://127.0.0.1:8787/" # this should be the URL your `wrangler dev -e dev` uses
```

### Setting Up Google OAuth Authentication

First, follow [the Supabase documentation](https://supabase.com/docs/guides/auth/social-login/auth-google#configuration-web) to get your Google Credentials including your ClientID and Client Secret before enabling your [Supabase Google Auth Provider](https://supabase.com/dashboard/project/_/auth/providers) under Project Dashboard > Authentication > Configuration > Providers.

Next, go to your Project Dashboard > Authentication > Configuration > URL Configuration to create **Redirect URLs** to enable your `supabase.auth.signInWithOAuth` function to `redirectTo` your deployed or development server URLs.

Add these two Redirect URLs for dev & prod:

- `<your-cloudflare-prod-url>/**`
- `http://127.0.0.1:8787/**`

> These are needed to access the `/auth/callback` endpoint once you login with the OAuth provider.

### Developing & Deploying to Cloudflare Workers

```bash
npm run dev    # runs your local dev server on http://127.0.0.1:8787
npm run deploy # deploys to a Cloudflare Worker and shows your deployment URL
```

> when we run any of the commands, we run the `"build:css": "tailwindcss -i ./public/style.css -o ./dist/_tailwind.css"` script to make TailwindCSS scan your `content` in `tailwind.config.js` to build any classes used into `/dist/_tailwind.css` for static serving.

## Project Structure

```bash
📦 htmx-todo
├─ .gitignore
├─ README.md
├─ package.json
├─ dist/                  # build artifacts and `wrangler dev --assets` will serve any files ie. `/dist/favicon.ico` becomes `/favicon.ico`
├─ public/                # global styles & TailwindCSS directives
│  └─ style.css
├─ src
│  ├─ components/         # global components
│  ├─ global.d.ts         # global Typescript defintions
│  ├─ index.tsx           # main entrypoint for wrangler dev
│  ├─ middleware/
│  └─ routes/             # routers
│     ├─ index.ts
│     ├─ auth
│     │  ├─ index.tsx
│     │  └─ views
│     │     └─ index.tsx
│     ├─ home
│     │  ├─ index.ts
│     │  └─ views
│     │     └─ index.tsx
│     └─ tasks
│        ├─ handlers      # API handlers
│        │  └─ index.tsx
│        ├─ index.ts
│        └─ views
│           ├─ components # route-specific components
│           └─ index.tsx
├─ tailwind.config.js
├─ tsconfig.json
└─ wrangler.toml.example  # template for Cloudflare wrangler config (required)
```

## References

- [GitHub: kosei28's hono-supabase-auth](https://github.com/kosei28/hono-supabase-auth/tree/main/src)
  - the example repository for using cookie-based Supabase Auth on a Hono server for Edge Runtimes
- [Supabase Docs: Google OAuth Social Login Configuration](https://supabase.com/docs/guides/auth/social-login/auth-google#configuration-web)
  - the guide to setup your Google auth provider _(email auth is rate limited to 3/hr without your own SMTP server)_
