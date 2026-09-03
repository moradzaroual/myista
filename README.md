# MYISTA

A static resource library — no database, no backend, no login. All
content lives in `data/studyData.ts`.

## Setup

```
pnpm install
pnpm dev
```

That's it — no `.env.local`, no Supabase project needed.

## Adding resources

Open `data/studyData.ts`:

1. **Add a department** to the `departments` array (or use an existing one).
2. **Add a module** to the `modules` array, pointing at a department via
   `department_id`.
3. **Add a resource** to the `resources` array, pointing at a module via
   `module_id`. Set `type` to `"pdf"`, `"slides"`, `"video"`, or `"blog"`.

## Linking a Google Drive file

1. Upload the file to Google Drive.
2. Right-click → **Share** → **Anyone with the link** → **Viewer**.
3. Copy the link.
4. Paste it into the resource's `file_url` (for PDFs/slides) or
   `external_url` (for videos/articles), replacing
   `"PASTE_GOOGLE_DRIVE_LINK_HERE"`.

Any resource still showing the placeholder text displays a disabled
"Link not added yet" badge instead of a broken button, so you can see
at a glance what's left to fill in.

## Deploying

Since there's no backend, this deploys anywhere that hosts a Next.js
app — Vercel, Netlify, etc. Push to GitHub and import the repo on
Vercel; no environment variables required.
