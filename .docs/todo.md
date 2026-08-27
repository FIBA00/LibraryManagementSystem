# TanStack Query API-Layer Checklist

- [x] Review the dashboard’s current mock-data imports and resource shape.
- [x] Add the TanStack Query dependency and a shared query client provider.
- [x] Create `library.api.js` with one request function for every mock-data resource.
- [x] Replace direct dashboard data reads with TanStack Query resource queries.
- [x] Build, test resource loading and branch scoping, then save a checkpoint.

# Mutation API-Layer Checklist

- [x] Review the existing request functions and dashboard controls that need write actions.
- [x] Add centralized POST, PATCH, and action mutation helpers to `library.api.js`.
- [x] Connect create, update, return, and process controls through TanStack Query mutations.
- [x] Verify local mutation updates and document the real-backend replacement boundary.

# Authenticated Mutation UX Checklist

- [x] Review the uploaded client, API, and query-hook prototypes for reusable patterns.
- [x] Add a safe JWT token resolver and authorization header interceptor to the remote request transport.
- [x] Add reusable validated form, modal, and mutation-feedback primitives.
- [x] Replace generic book and user creation actions with validated forms.
- [x] Verify invalid submissions, successful mutations, loading states, and error feedback.

# Record Management and Activity Checklist

- [x] Review current API mutation coverage, table actions, and top-bar notification control.
- [x] Add delete endpoints and reusable edit and confirmation dialogs.
- [x] Connect book and user search, filter, edit, and protected deletion workflows.
- [x] Add an activity source and notification dropdown to the top bar.
- [x] Verify edits, deletion confirmation, discovery controls, and notification interactions.

# Final Creation Forms and Context Actions Checklist

- [x] Review current create-action payloads and identify every empty three-dot control.
- [x] Add validated forms for libraries, rentals, and financial entries.
- [x] Add reusable context-menu controls for operational record actions.
- [x] Connect the new forms and all three-dot controls to the correct dashboard workflows.
- [x] Verify submissions, menus, mutation feedback, and query refreshes.

# Receipts, Profiles, Settings, and Search Checklist

- [x] Review current record models and top-level navigation controls.
- [x] Add client-side PDF receipt, member-profile, persisted-settings, and global-search foundations.
- [x] Connect receipt downloads, profile drill-downs, editable settings, and cross-dashboard search interactions.
- [x] Verify receipt generation, profile data, settings persistence, global results, and production build.

# Dark Mode, Profile Discovery, and JavaScript Cleanup Checklist

- [x] Audit current theme controls, member-profile fields, and all `.ts` or `.tsx` sources.
- [x] Add a persistent dark-mode setting and sortable, filterable rental history controls.
- [x] Convert required TypeScript sources to JavaScript/JSX and remove unimplemented template-only files.
- [x] Verify the theme toggle, history controls, JavaScript-only source tree, and production build.

# Final Archive Checklist

- [ ] Package source, configuration, and documentation while excluding generated dependencies and build output.
- [ ] Validate ZIP contents and deliver the archive.
