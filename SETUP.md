# Setup & Troubleshooting Guide

## ✅ Fixed Issues

### 1. Tailwind CSS PostCSS Error

**Error:**
```
Error: It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin.
```

**Solution:**
Tailwind CSS v4 menggunakan package terpisah untuk PostCSS plugin.

```bash
npm install -D @tailwindcss/postcss
```

**Updated Files:**
- `postcss.config.mjs` - Changed from `tailwindcss: {}` to `'@tailwindcss/postcss': {}`
- `app/globals.css` - Changed from `@tailwind` directives to `@import "tailwindcss"` with `@theme` block

### 2. Tailwind v4 CSS Configuration

Tailwind CSS v4 uses CSS-first configuration instead of JavaScript config file.

**Old (v3):**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**New (v4):**
```css
@import "tailwindcss";

@theme {
  --color-primary-500: #3b82f6;
  /* ... */
}
```

Theme customization now done in CSS using `@theme` directive instead of `tailwind.config.ts`.

## 📝 Current Status

✅ **Next.js 16.0.0** - Running on Turbopack
✅ **Tailwind CSS v4.1.16** - PostCSS plugin configured
✅ **TypeScript** - Path aliases configured (`@/*`)
✅ **Dev Server** - http://localhost:3000

## ⚠️ Required: Environment Variables

Before the app can run properly, you MUST fill `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-key-here
SUPABASE_SERVICE_ROLE_KEY=your-actual-key-here
```

Get these from:
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Settings → API
4. Copy `anon/public` key and `service_role` key

**⚠️ IMPORTANT:** These keys MUST be the same as used in SIAKAD for shared authentication!

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Fill environment variables
# Edit .env.local and add your Supabase keys

# Run development server
npm run dev

# Open browser
# http://localhost:3000
```

## 🔍 TypeScript Errors

The 23 TypeScript errors you see are **module resolution errors** that appear before the build completes. These are false positives from VS Code's TypeScript server and will disappear after:

1. Filling environment variables in `.env.local`
2. Restarting the dev server
3. Reloading VS Code window (Cmd/Ctrl + Shift + P → "Reload Window")

The actual runtime error is:
```
Error: Missing Supabase environment variables
```

This is expected and will be resolved once you add the Supabase keys.

## 📦 Package Versions

- next: 16.0.0
- react: 19.0.0
- tailwindcss: 4.1.16
- @tailwindcss/postcss: 4.1.16
- @supabase/supabase-js: 2.49.2
- typescript: 5.7.3

## 🆘 Need Help?

Check `PROJECT_CONTEXT.md` for complete documentation about:
- Shared authentication system
- Database schema
- PPDB auto-create account flow
- Deployment to Vercel
