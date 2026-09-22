

I have my own uncommitted (not-yet-pushed) button work staged locally — let me set that aside cleanly so I get your actual pushed state without conflicts.The last commit `be1e894 - refactor: updated the routing system in the library dashboard!` is the one to inspect. Let's see what changed:Two real problems jump out already, unrelated to your freeze issue but worth flagging immediately: there's a stray `` `` `` (literal backtick pair) sitting as a bare text node between routes, and the owner-role `ProtectedRoute` wrapper around `/owner/library` is commented out — meaning that whole dashboard currently has **zero auth protection**. Now let's find the freeze cause.Now the sidebar — this is where the "second SPA navigation" likely lives:Let's check `useLibraryMutations.js` too, since that's part of the same shell and affects the recommendation:One more check — whether these are hitting a real backend (network latency) or an in-memory mock (meaning any freeze is CPU-bound render thrashing, not waiting on network):That effect is clean — empty dependency array, not a loop risk. I have enough now to give you the full picture.

## What I found

**The core problem, confirmed:** `LibraryDashboardPage` is a single "god component" that owns *all* data and *all* mutations for *all nine* dashboard views, then broadcasts everything downward through one shared `Outlet` context. This is the exact opposite of how `AdminLayout` works, where the layout owns only `user` (its own genuinely layout-level concern) and each admin page calls its own scoped hook.

**Three concrete things stacked on top of each other, all in `libraryDashboard.jsx`:**

1. **`useLibraryDashboardQuery` fires up to 8 queries — twice.**
   ```javascript
   const { libraries, data, isLoading, isError, refetch } = useLibraryDashboardQuery(selectedLibraryId);
   const { data: globalSearchData } = useLibraryDashboardQuery(null);
   ```
   Every single view — even Settings, which needs zero library data — waits on `books`, `rentals`, `staff`, `transactions`, `payroll`, `attendance`, `monthly`, and `libraries` to all resolve before `isLoading` clears and the `<Outlet>` even renders. The second call duplicates nearly the same 8 queries again for global search. The moment a library is selected, these two calls stop sharing a cache key (`{libraryId: "lib_1"}` vs `{libraryId: "all"}`), so you end up with **up to 14 live query subscriptions** parked inside one component, all the time, regardless of which single view is on screen.

2. **`useLibraryMutations` instantiates 17 separate `useMutation` calls, every render, unconditionally** — one for every write operation across every resource. Visiting Settings still spins up mutation hooks for books, rentals, payroll, attendance, etc. that view will never touch. There's already a comment in the code flagging this:
   ```javascript
   // fix-me: React Hook "useMutation" is called in function "mutation" that is neither
   // a React function component nor a custom React Hook function.
   ```
   It "works" today only because the 17 calls happen in the same fixed order every render with no conditionals around them — but it's fragile, and it's evidence this file already knows it's built wrong.

3. **The freeze mechanism:** `outletContext` is a brand-new plain object, rebuilt on every render:
   ```javascript
   const outletContext = { data, selectedLibrary, onViewChange: handleViewChange, onNotice: showNotice, mutations, ... };
   ```
   Since `LibraryDashboardPage` calls `useLocation()`, it re-renders on *every navigation*. Every navigation re-creates this object, which every currently-mounted view receives as "changed" context regardless of whether the data it cares about actually changed. Combine that with up to 14 queries settling at staggered ~180ms intervals (confirmed — `library.api.js` is currently a mock layer with `MOCK_NETWORK_DELAY = 180`, real backend wiring is commented out) each triggering their own re-render of this same top-level component, and you get a burst of cascading re-renders through the whole tree right around navigation time. That's very plausibly what you're feeling as a freeze.

## Your proposed fix is correct — here's the concrete plan

**Layout should keep only genuinely cross-cutting state**, mirroring what `AdminLayout` already does correctly:
- `selectedLibraryId` + setter (every view needs to know the active branch)
- `onNotice` (toast trigger)
- `settings` / `updateSettings` / `resetSettings`
- Sidebar/menu-open, search-modal-open — pure UI state

**Layout should stop owning:**
- All resource data (`books`, `rentals`, `staff`, `transactions`, `payroll`, `attendance`, `monthly`) — delete both `useLibraryDashboardQuery` calls from the shell entirely.
- The `isLoading`/`isError` gate around the whole `<Outlet>` — this is why Settings waits on Payroll.
- The 17-mutation god-hook — split by resource.

**Each view fetches only its own data,** the same shape as the Admin pattern (`useAdminLibraries()` called directly inside `AdminOverviewPage`):
- `BooksView` → `useBooks(selectedLibrary?.id)`, `useBookMutations()`
- `StaffView` → `useStaff(selectedLibrary?.id)`, `useStaffMutations()`
- `RentalsView` → `useRentals(selectedLibrary?.id)`, `useRentalMutations()`
- etc. — one hook pair per resource, split out of the current `useLibraryDashboardQuery`/`useLibraryMutations` files (the query functions in `library.api.js` already exist per-resource — `libraryApi.getBooks`, `libraryApi.getStaffMembers`, etc. — so this is mostly reorganizing existing pieces, not writing new fetch logic).
- `SettingsView` already gets exactly this treatment in `libraryRoutes.jsx` (`SettingsRoute` only pulls `settings`/`onNotice` from context) — that's the pattern to copy for every other view, not the exception.

**`GlobalSearch`'s cross-resource data** is a legitimate special case — it genuinely needs a summary across resources — but it shouldn't reuse the full per-view query shape. Give it its own lean hook (or, longer-term, a dedicated search endpoint) rather than double-firing the same 8 queries a second time.

## Before you refactor — two unrelated bugs I found while reading `App.jsx`

Fix these regardless of the data-flow work, since I saw them along the way:
1. **`/owner/library` has no auth protection right now** — the `ProtectedRoute` wrapper is commented out:
   ```jsx
   {/* <Route element={<ProtectedRoute allowedRoles={["owner"]} />}> */}
     <Route path="/owner/library" element={<LibraryDashboardPage />}>
   ```
   Anyone, logged in or not, can currently hit this dashboard.
2. There's a stray `` `` `` (bare backtick pair) sitting as a text node directly inside `<Routes>` on the line right before that — dead leftover, harmless to React Router but worth deleting.

Want me to start pulling `useLibraryDashboardQuery`/`useLibraryMutations` apart into per-resource hooks, starting with one view as the worked example the same way we did with `Button`?

```
thank you for the suggestions i will get on with that the wrapper for auth is to easy the dev and navigation with out login , 
before we apply those , am sorry but you didnt provide me with the button CVA diff changes for the few buttons you added , that means i dont have any reference to follow the pattern , and we can continue to the dashboard issue,
```

No blame at all — genuinely, wanting to see "industry standard" and getting handed something this tangled is a completely normal outcome, and picking it apart like this is exactly how you learn to spot it next time. Let's slow down and trace both things concretely.Confirmed — `memberProfile.jsx` line 60: `if (!memberName || !history.length) return [fallback]`. If you refresh the browser while on `/owner/library/member`, `selectedMember` (plain React state) resets to `null`, `memberName` becomes `undefined`, and you land on the empty-state fallback instead of the member you were looking at. That's a real, demonstrable bug from this pattern, not a hypothetical.

## Part 1 — dissecting `LibrariesView`'s props

Trace the full chain, start to finish:

```
LibraryDashboardPage (the shell)
  → builds ONE big object: outletContext = { data, selectedLibrary, onViewChange, onNotice, mutations, onMemberSelect, ... }
  → renders <Outlet context={outletContext} />

libraryRoutes.jsx → LibrariesRoute()
  → const context = useOutletContext()   // grabs the ENTIRE object above, unfiltered
  → <LibrariesView {...context} />        // spreads EVERY key onto LibrariesView as a prop

LibrariesView({ data, onNotice, mutations }) {...}
  // only picks 3 keys out of the ~13 it was handed
```

So `LibrariesView` is being handed the *entire* shell's state every time, and just quietly ignores what it doesn't destructure. That's the "inheritance" smell you're picking up on — it's not that `LibrariesView` asked for `data`/`onNotice`/`mutations` specifically, it's that it receives *everything* and cherry-picks.

**How to dissect any view — a 3-question sort, applied to `LibrariesView`:**

For every prop the view actually uses, ask "is this global, or is this this-view's-own-data?"

| Prop `LibrariesView` uses | What it actually is | Where it should come from after the fix |
|---|---|---|
| `data.libraries` | Just the libraries array, buried inside a giant object with books/staff/rentals/etc mixed in | its own hook: `useLibraries()` |
| `mutations.createLibrary`, `mutations.updateLibrary` | 2 of the 17 mutations in the god-hook | its own hook: `useLibraryMutations()` (a *smaller*, correctly-named one scoped to just library CRUD — not the current 17-mutation file, which needs splitting) |
| `onNotice` | A toast trigger, genuinely used by every view for the same purpose | stays coming from `Outlet` context — this one's legitimately global |

After the fix, `LibrariesView`'s signature would look like:
```jsx
export default function LibrariesView({ onNotice }) {
  const { data: libraries, isLoading } = useLibraries();
  const { createLibrary, updateLibrary } = useLibraryMutations();
  // ...
}
```
It no longer receives `data.books`, `data.staff`, `mutations.processPayroll`, etc. — none of that ever existed as far as this view is concerned. That's the actual goal: **a view's prop list should tell you exactly what that view needs, nothing more.** Right now every view's real dependency list is hidden inside one shared blob, which is why it "scares you" to look at — you can't tell what `LibrariesView` actually needs just by reading its signature, you have to go trace the whole shell to find out.

## Part 2 — the shell functions, specifically `openMember`

This is the risky one, and it's the actual mechanism behind "the sidebar freezes/breaks navigation":

```javascript
function openMember(memberName) {
  setSelectedMember(memberName);        // ① stash a name in React state
  navigate("/owner/library/member");    // ② go to a URL that doesn't contain that name anywhere
}
```

Somewhere else (some view showing a member's name, e.g. in a rentals table), clicking that name calls `onMemberSelect("Jane Doe")` — which is just `openMember` handed down through the same big context object. Then:

```javascript
// libraryRoutes.jsx
function MemberRoute() {
  const context = useOutletContext();
  return <MemberProfile {...context} memberName={context.selectedMember} />;
}
```

`MemberRoute` reads `selectedMember` back out of that same shared state to figure out *which* member to show. The URL itself — `/owner/library/member` — carries zero information about who you're looking at. The only place "Jane Doe" exists is a JavaScript variable sitting in memory in the shell component.

**Why this is genuinely dangerous, concretely:**
- Refresh the page → `selectedMember` resets to `null` → blank member page (proven above).
- Can't share a link to a specific member — every URL to this page is identical regardless of who you were viewing.
- Can't use the browser back button meaningfully — going back doesn't restore *which* member you were on.

**The fix — compare to what Admin already does correctly:**
```jsx
<Route path="/admin/libraries/:id" element={<AdminLibraryDetailsPage />} />
```
The id lives *in the URL*. Refresh, share, bookmark — all just work, because the page's identity is the URL, not some in-memory variable. Do the same thing here:
```jsx
<Route path="member/:memberName" element={<MemberRoute />} />
```
```jsx
function MemberRoute() {
  const { memberName } = useParams();  // read straight from the URL
  return <MemberProfile memberName={memberName} />;
}
```
Now `openMember` collapses down to just:
```javascript
function openMember(memberName) {
  navigate(`/owner/library/member/${memberName}`);
}
```
No `selectedMember` state needed in the shell at all — one less piece of state to smuggle through the giant context object, and one less thing that breaks on refresh.

**Not everything in the shell is bad, though** — worth being precise here so you don't over-correct. `handleViewChange`:
```javascript
function handleViewChange(view) {
  navigate(routes[view] || "/owner/library");
}
```
This is just a short-name-to-URL lookup table powering sidebar clicks. It's fine, it's not smuggling any data — it's a legitimate small helper, keep it in the shell.

## The actual next step

Want me to do the URL-param fix for the member page first (it's small, self-contained, and directly fixes the refresh-breaks-it bug), then move on to splitting `useLibraryDashboardQuery`/`useLibraryMutations` per-resource the way we discussed for the freeze issue? Those two fixes are independent of each other, so either order works — member-page fix is the faster win if you want a quick concrete result first.


Continuing — building `EntityDialog`, updating `Field`, then converting `bookForm.jsx` as the full worked example.Now `field.jsx` — this one had a wrinkle: `.entity-field input`/`select` styles need to land on the raw `<input>`/`<select>` elements passed in as `children`, which `Field` can't reach directly. Solution: export a shared class string those inputs apply themselves — one string to maintain instead of a CSS selector to keep in sync:Now the full `bookForm.jsx` conversion as the worked example:Let's sanity-check the result compiles structurally (balanced tags/braces) before calling it done:Clean. Now let's commit this batch and give you the recipe for the remaining 5 files, same format as the button conversion:Apply with `git am entity-dialog-conversion.patch` on top of the button patch from before.

## Recipe for the remaining 5 files: `libraryForm.jsx`, `rentalForm.jsx`, `transactionForm.jsx`, `userForm.jsx`, `deleteConfirm.jsx`

**1. Swap imports.** Remove `Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription` — keep only `DialogFooter` from `dialog.jsx`. Add:
```jsx
import EntityDialog from "../entityDialog.jsx";
import { fieldControlClass } from "../field.jsx"; // alongside the existing Field import
```

**2. Replace the outer shell.** Find:
```jsx
<Dialog open={open} onOpenChange={onOpenChange}>
  <DialogContent className="entity-dialog">
    <DialogHeader>
      <p className="form-kicker">...</p>
      <DialogTitle>...</DialogTitle>
      <DialogDescription>...</DialogDescription>
    </DialogHeader>
    {/* form here */}
  </DialogContent>
</Dialog>
```
Replace with:
```jsx
<EntityDialog
  open={open}
  onOpenChange={onOpenChange}
  kicker="..."        {/* whatever the old <p className="form-kicker"> text was */}
  title="..."          {/* old DialogTitle content */}
  description="..."    {/* old DialogDescription content */}
>
  {/* form here, unchanged except step 3 & 4 below */}
</EntityDialog>
```

**3. Form padding + grid.** On the `<form>` tag, add `className="px-[29px] pt-5 pb-[25px]"`. On the grid `<div className="entity-form-grid">`, replace with `className="grid grid-cols-2 gap-x-4 gap-y-[15px] max-[620px]:grid-cols-1"`.

**4. Every raw `<input>`/`<select>` inside a `Field`**, add `className={fieldControlClass}`.

**5. Footer.** Replace `<DialogFooter className="entity-footer">` with `<DialogFooter className="mt-[22px] gap-3 border-t border-[#eee6da] pt-[17px] max-[620px]:gap-2">`. Add `className="min-w-[112px] max-[620px]:w-full"` to the Cancel `<Button variant="secondary">` inside it (the `FormSubmit` button doesn't need this — it's already sized correctly).

**`deleteConfirm.jsx` is the one exception** — it's not a form, and it's the `danger` variant:
- No `<form>`/grid/fields — just the shell.
- Pass `danger` to `EntityDialog`.
- Its `DialogFooter` gets different values (from the original `delete-dialog .entity-footer` override): `className="mt-0 gap-3 bg-[#fcf7f3] px-[29px] pt-[18px] pb-[25px]"`, and its secondary "Keep" button gets `className="min-w-[120px]"` instead of `112px`.

**Verify per file, same as before:**
```bash
grep -n "entity-dialog\|entity-form-grid\|entity-footer\|form-kicker\|delete-dialog" src/features/libraries/components/forms/<FILE>.jsx
```
Should return nothing when done.

**CSS cleanup — only after all 5 are converted:**
```bash
grep -rn "entity-dialog\|entity-form-grid\|entity-footer\|form-kicker\|entity-field\|delete-dialog" src/features
```
Empty result means it's safe to delete the entire `forms.css` file, plus the `.delete-dialog*` rules in `record-management.css`.

**Quick answer on patches:** yes, exactly that — a `.patch` file is just a text description of line-by-line changes (which lines to remove, which to add, in which files). `git apply`/`git am` reads that file and reproduces the exact same edits on your working copy. It doesn't run any code or "do" anything clever — it's the same as if you'd manually made those edits yourself, just automated and exact. `git am` additionally replays the commit message and authorship, `git apply` just changes the files without committing. That's why it only works cleanly if your files still look like what the patch expects to find — if you've since hand-edited the same lines, it'll fail to apply and you'd need `git apply` with `--reject` or just do it by hand.

Now let's look at what you've got:You've already got your own `f0f560d` (own button.jsx + variants applied to views) and `7c72e5e` (overview/dashboard dissection work) pushed. Let me check out this real state and find the TODOs near buttons you mentioned:Good — clean, nothing lost this time since everything's already committed on my end. Now searching for the ternary-button TODOs:Found three. Let's look at each one's actual code:This is exactly the pattern you're describing: `className={\`branch-trigger ${open ? "is-open" : ""}\`}` — a ternary picking between two CSS classes based on a boolean. Let's see what `.branch-trigger`/`.is-open` actually change:Good — all three are the exact same underlying pattern: a boolean state (`open`, `mode === "cards"`, `filter === status`) picking between "has this class" and "doesn't." This is the same concept as the `danger` boolean I already added to the `icon` variant — a **boolean variant** in `cva`, not a string one. Let me show you by fixing all three.Good — you already reorganized my comments into a header block, that's fine. Adding the three new variants plus a shared `active` boolean axis:Now let's update the three consumers. First, `topbar.jsx`:Already imported since it uses `Button` for the search trigger. Converting the branch-trigger:Now `staffView.jsx`:Already imported. Converting:Now `rentalsView.jsx`:Verifying and committing:Clean. Committing and patching properly this time, immediately, no gaps:Apply on top of your current `style-changes` branch with `git am button-ternary-variants.patch`, then push.

**The general rule, so you can spot the next one yourself:** any time you see `className={condition ? "x" : "y"}` or `` className={`base ${condition ? "extra" : ""}`} ``, that's a boolean variant. The recipe is always the same:
1. Add a variant key with `true`/`false` (I used `active` here, but name it for what it means — `open`, `selected`, whatever reads clearly).
2. Add a `compoundVariants` entry: `{ variant: "yourVariant", active: true, class: "..." }` with whatever the CSS's `.is-active`/`.is-open` rule contained.
3. Pass the actual boolean as a prop when you render it: `active={mode === "cards"}`.

There's one more `TODO` I did **not** touch — the `filter-tabs`/`view-toggle` *wrapper divs* (`<div className="filter-tabs">`, `<div className="view-toggle">`) still use raw CSS classes for their container styling (padding, background, border-radius, flex gap). That's fine to leave as-is or convert whenever you get to it — it's just a static container, no ternary, no variant needed, lower priority than the buttons themselves.

Strong confirmation already: `row-action`, `danger-button`, `text-action`, `status-pill` show up as dead in **multiple** files — meaning these were duplicated across up to 4 separate CSS files, not just the ones we already found and fixed. Let's verify these are genuinely dead (not false positives from my regex) before recommending deletion, and figure out what `index_main.css` even is:Found something interesting — `index_main.css` is a **second, completely separate theme system** (different color variable names: `--color-c-pink`, `--color-c-purple`, `--color-orange-edge`) and it's actually imported in `main.jsx`. Let's see the full import picture:Important nuance on that regex scan, so it doesn't mislead you: **the `@theme` color tokens in `index_main.css` (`c-orange`, `c-card`, `ink`, etc.) are NOT dead** — they're actively used, but only by `features/admin/*` and `features/auth/*`, which is a totally different part of the app from the library dashboard. What I found dead are specific old-style raw CSS class rules (`.btn-whatsapp`, `.dot-grid-bg`, `.org`, etc.) sitting unused inside that same file.

This actually reveals something worth knowing: **your app currently has two separate, unrelated color systems** — Admin/Auth uses `c-orange`/`c-card`/`ink` (from `index_main.css`), while the Library dashboard uses `primary`/`danger`/`surface` (from `index.css`). Whether that's intentional (platform chrome vs. tenant workspace, deliberately different) or accidental drift is worth a decision at some point, but it's a separate question from today's cleanup — I'll leave it noted, not touched.

Focusing on `index.css` specifically since that's the 2434-line file backing everything we've been converting:Some of those top counts are false positives from my regex (`.danger` is matching inside Tailwind's `text-danger`/`bg-danger`, not actual literal `.danger` class usage). Let me redo this properly — extract actual `className` string tokens instead of raw substring matching:Much cleaner data. Here's the real picture:

## Dead code you can delete right now (17 classes, verified against actual className usage)
```
danger-text, dot-grid-bg, gold-text, icon-action, icon-cross, ink-text,
metric-detail, mobile-menu, muted-text, ribbon-border, row-action,
sage-text, sidebar-backdrop, sidebar-close, text-action, top-search, wire-orange
```
`row-action`/`text-action`/`icon-action` confirm your button conversion is fully clean — nothing references them anymore. The rest (`dot-grid-bg`, `ribbon-border`, `wire-orange`, `sidebar-backdrop`, `mobile-menu`, `top-search`) look like leftovers from a UI shape that got redesigned and never had its CSS cleaned up — worth just deleting the rule blocks for all 17 from `index.css`.

## Next Tailwind-conversion targets, ranked by actual leverage

**`.data-table` / `.data-table-wrap` — 7 files each, the clear next target.** Same shape as buttons: a table markup pattern (`<div className="data-table-wrap"><table className="data-table">...`) copy-pasted raw across `librariesView`, `booksView`, `staffView`, `rentalsView`, `financeView`, `payrollView`, `attendanceView`. This is a genuine shared component opportunity — a `<DataTable>` wrapper, not just a className swap.

**`.table-toolbar` (5 files) / `.select-box` (3 files)** — the search+filter row sitting above most tables. Worth converting alongside `DataTable` since they always appear together in the same views.

**Everything else is small and low-value right now** — `.cyber-card`, `.page`, `.sparkle`, `.hex-bg` are 1-line utility-ish wrappers (background/padding shorthand), not worth componentizing; just inline the Tailwind directly wherever they appear. The `staff-*`/`topbar-*`/`table-*` single-use classes (1 file each) aren't worth extracting into shared components at all — just convert them to inline Tailwind in place, since there's nothing to consolidate.

Want me to build the `DataTable` wrapper next, same process as `Button` and `EntityDialog`?

Got it — clear picture now:
- `index_main.css` = your original, correct theme (plus some copy-pasted cruft from another project you already know needs deleting).
- `index.css` = the LLM dashboard's raw CSS, needs full Tailwind conversion.
- Eventual end state: one shared theme. Since Tailwind resolves `bg-primary`/`bg-danger`/etc. by just looking for a `--color-primary`/`--color-danger` variable *anywhere* in scope, my components using those token-based utilities won't need any rework when the tokens' definitions move into `index_main.css` — only the **arbitrary hardcoded hex values** I used where no token existed yet (e.g. `text-[#5c4d3e]` on the secondary button, `bg-[#f4efe7]` on icon buttons) will need remapping later. I'll keep flagging those with a comment as I go, same as I already did for the premium badge — that makes the eventual merge a simple grep for `\[#` instead of a re-audit of every component.

Continuing with `DataTable` now, same process as `Button`.Stop — found a real, live-breaking bug while checking these. `searchBox.jsx`:This is unbounded recursion — `SearchBox` renders `<SearchBox size={16} />` inside itself, meaning any of these 5 views mounting this component should crash React with "Maximum update depth exceeded" the moment it renders. Fixing this immediately, separate from the styling work, since it's a functional break, not a style issue:Only one file — this is genuinely broken as written, no duplicate-file explanation this time. Fixing:**Apply this one first, before anything else** — `git am critical-searchbox-fix.patch`. Any of `librariesView`, `staffView`, `booksView`, `payrollView`, `rentalsView` would crash React on mount with "Maximum update depth exceeded" until this lands.

Now continuing with the table/toolbar cluster. `SysPanel` and `TableEmpty` look fine functionally — `SysPanel` uses old-style string concat (`` `panel ${className}` ``) instead of `classNameMerge`, minor debt, not urgent. Building `DataTable`, `TableToolbar`, and `SelectBox`:Now converting `librariesView.jsx` as the worked example — let's see its current full table markup first:Braces balanced (56/56); the `<`/`>` mismatch is expected noise from arrow functions (`=>`) and self-closing tags, not a real issue. Let's view the final result to eyeball it:Clean. Committing and packaging the patch immediately:**Apply order:** `critical-searchbox-fix.patch` → `table-primitives-conversion.patch` (this one doesn't depend on the button/entity-dialog patches from earlier, but apply those too if you haven't yet).

## Recipe for the remaining 6 files: `attendanceView`, `booksView`, `financeView`, `payrollView`, `rentalsView`, `staffView`

**1. Import the new components:**
```jsx
import {
  Table,
  TableRow,
  Th,
  Td,
  TdPrimary,
  TdSecondary,
  TdCode,      // only if that file uses <code> inside a cell
  TableToolbar,
  SelectBox,
} from "../components/table.jsx";
```

**2. Mechanical tag swaps** — same meaning, new names:

| Old | New |
|---|---|
| `<div className="table-toolbar">` | `<TableToolbar>` |
| `<div className="table-toolbar wrap">` | `<TableToolbar wrap>` |
| `<label className="select-box">...</label>` | `<SelectBox>...</SelectBox>` |
| `<div className="data-table-wrap"><table className="data-table">` | `<Table>` (this one component replaces both wrapper + table) |
| `<tr>` (inside thead or tbody) | `<TableRow>` |
| `<th>` | `<Th>` |
| `<td>` | `<Td>` |
| `<td><strong>X</strong><small>Y</small></td>` | `<Td><TdPrimary>X</TdPrimary><TdSecondary>Y</TdSecondary></Td>` |
| `<code>X</code>` inside a `<td>` | `<TdCode>X</TdCode>` |
| Closing `</table></div>` | just `</Table>` |

**3. `TableEmpty` moves outside `<Table>`** — it used to sit inside the `.data-table-wrap` div as a sibling of `<table>`; now it sits as a sibling right after `</Table>` instead (`Table` owns its own wrapper internally). Same visual result, just one level shallower.

**4. Verify each file:**
```bash
grep -n "data-table\|table-toolbar\|select-box" src/features/libraries/views/<FILE>.jsx
```

**CSS cleanup, only after all 6 are converted:**
```bash
grep -rn "data-table\|table-toolbar\|select-box\|inline-strong" src/features
```
Empty → safe to delete `.table-toolbar`, `.select-box`, `.date-control`, `.data-table-wrap`, `.data-table` and everything under it, from `index.css` (roughly lines 1374–1550, but re-check line numbers since they'll have shifted).

**Also delete now, independent of the above** — the 17 confirmed-dead classes from the earlier audit: `danger-text, dot-grid-bg, gold-text, icon-action, icon-cross, ink-text, metric-detail, mobile-menu, muted-text, ribbon-border, row-action, sage-text, sidebar-backdrop, sidebar-close, text-action, top-search, wire-orange`. These have zero references anywhere already, safe to remove right now without waiting on anything.