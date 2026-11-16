<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- The five main destinations live in `src/lib/navigation.ts` (`NAV_ITEMS`); the mobile tab bar and desktop side rail both render from it, so add or rename tabs only there. Why: one source keeps both navs in sync.
- Every page renders inside `AppShell` (mounted in `__root.tsx`); pages compose `PageHeader`, `SectionCard`, `EmptyState`/`LoadingState`/`ErrorState` and `FormField` from `src/components` instead of bespoke markup. Why: consistent look and reuse.
- Router-level `defaultPendingComponent`/`defaultErrorComponent` in `src/router.tsx` supply page loading and error states. Why: every route gets them for free.
- Brand colours are named tokens in `src/styles.css` (pine, sage, leaf, terracotta, cedar, mist, cream) mapped onto shadcn variables; components use tokens only. Why: palette stays approved and themeable.
- The logo is rendered only through `src/components/brand/Logo.tsx` from its asset pointer. Why: the mark must never be altered.
- Unfinished features are shown with the `ComingSoon` badge, never as working. Why: simulated features must be clearly labelled.
- Use `pageMeta()` from `src/lib/seo.ts` in each route's `head()`. Why: unique titles/descriptions per page.
