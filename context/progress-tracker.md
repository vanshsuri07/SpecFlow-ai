# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- In progress

## Current Goal

- Build the base editor chrome components (navbar and sidebar).

## Completed

- Design system setup (shadcn/ui + core primitives).
- Editor chrome components (navbar, sidebar, layout).
- Clerk authentication wired: `ClerkProvider` (dark theme + CSS variable overrides), middleware/proxy protection, `UserButton` in navbar, sign-in and sign-up pages.
- Editor home screen and project dialogs implemented (Create, Rename, Delete) with mock project data and live slug preview.
- Prisma schema and client added (`prisma/schema.prisma`, `prisma/models/project.prisma`, `lib/prisma.ts`).
- Project APIs: implemented backend REST routes for project list/create/rename/delete (`app/api/projects/route.ts` and `app/api/projects/[projectId]/route.ts`).
  - Auth: uses Clerk `userId` as `ownerId` and returns `401` for unauthenticated requests.
  - Authorization: only project owners may rename or delete projects; non-owners receive `403`.
  - Create behavior: defaults missing or empty project `name` to `Untitled Project` and returns `201` on success.
- Build verification: `npm run build` passes successfully.

## In Progress

- Editor page and routing setup.
  - Root routing: `/` now redirects authenticated users to `/editor` and unauthenticated users to `/sign-in`.
- Database migration: create initial migration and generate Prisma client (requires running `npx prisma migrate dev` locally).

## Recent Progress

- Fixed Prisma client initialization in `lib/prisma.ts` to properly use the generated client with adapter-pg.
- Prisma client generation completed successfully to `app/generated/prisma/`.
- Full build passes: TypeScript type checking, page compilation, and static generation all successful.

## Next Up

- Implement editor canvas and page structure.
- Wire editor canvas and project persistence (mock → API) if desired.

- Run Prisma migration and verify `npm run build` passes.

- Wire the UI to the new project API routes (editor sidebar and dialogs).

## Open Questions

- None at this time.

## Architecture Decisions

- Editor chrome components are standalone and reusable across all editor screens
- Project sidebar floats above content (uses fixed positioning with overlay)
- Dialog pattern uses existing shadcn/ui Dialog component with color tokens from globals.css

## Session Notes

- Unable to run npm install/lint/build because PowerShell (pwsh) is not available in the runtime.
- Components created: editor-navbar.tsx, project-sidebar.tsx, dialog-pattern.ts, editor-layout.tsx
- EditorLayout component manages sidebar state and coordinates navbar + sidebar
- Project dialog state and forms implemented inside `EditorLayout` (create/rename/delete)
- All components use existing shadcn/ui primitives and lucide icons
- Components compile without external dependencies (ready for use)
- Usage guide created in EDITOR_LAYOUT_GUIDE.md
- Auth work done: `ClerkProvider` appearance mapped to CSS variables, `proxy.ts` middleware enforces protection, sign-in/sign-up pages use Clerk components with the two-panel layout, `UserButton` present in `editor-navbar.tsx`.
- Prisma work: added `Project` and `ProjectCollaborator` models, created `prisma/models/project.prisma` (informational copy), appended models to `prisma/schema.prisma`, and added cached client `lib/prisma.ts` that branches on `DATABASE_URL` and caches on `global` in development.
- Migration note: run the following locally to create the migration and generate the client:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

If using a hosted Accelerate database with a `prisma+postgres://` URL, ensure `DATABASE_URL` is set accordingly before running migrations.
