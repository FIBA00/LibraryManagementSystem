# Preview Verification Notes

## Browser checks completed

| Check | Result |
| --- | --- |
| JSX dashboard loads at the preview URL | Passed |
| Overview shows navigation, branch scope control, responsive dashboard shell, circulation metrics, branch list, overdue panel, and staff summary | Passed |
| Book catalog navigation opens from the sidebar | Passed |
| Catalog filtering controls are present, including text search, genre selector, and availability checkbox | Passed |
| Catalog table renders title, author, shelf, availability, condition, and row-action fields | Passed |
| Branch selector opens with all five library options and maintenance marker | Passed |
| Selecting Central Public Library scopes catalog records and metrics from 11 titles / 112 copies to 7 titles / 72 copies | Passed |
| Production build completes | Passed |
| TanStack Query resolves independent local API façade requests for all dashboard resources | Passed |
| Query-backed overview and catalog views render the expected mocked data after navigation | Passed |
| Mutation-enabled loan desk renders create-rental, return, and renew controls for local API endpoint testing | Passed |
| `POST /api/rentals/:id/return` updates a loan to returned, clears its fine, and refreshes dashboard summary counts | Passed |
| `POST /api/rentals` creates a record, inserts it into the local API response, and refreshes dashboard summary counts | Passed |
| Updated catalog view exposes the validated Add book entry point and mutation-aware restock controls | Passed |
| Empty book-form submission is blocked with clear inline validation errors for required catalogue fields | Passed |
| Complete book-form submission adds the record through the mutation API, closes the dialog, and refreshes the collection metrics from 11 / 112 to 12 / 116 | Passed |
| People register exposes a validated team-user form with name, email, role, department, salary, and branch fields | Passed |
| Empty team-user submission is blocked with inline name and email validation errors; a complete user payload is accepted by the form | Passed |
| Complete team-user submission adds the profile through the staff mutation, closes the dialog, and refreshes the directory from 12 to 13 users | Passed |
| Notification bell opens a compact desk-ledger dropdown with task, edit, and information activity items plus a mark-read control | Passed |
| Book discovery controls include text, genre, condition, and availability filters; selecting Edit opens a prefilled validated revision form | Passed |
| Saving a book revision sends the update through the mutation layer, refreshes the matching table record, and creates a desk activity notice | Passed |
| Book deletion requires a confirmation dialog and, after confirmation, removes the record through the DELETE mutation and refreshes collection totals from 11 / 112 to 10 / 104 | Passed |
| User directory now defaults to a searchable table with department and status filters; selecting Edit opens a prefilled profile-revision form | Passed |
| User deletion opens an explicit permanent-removal confirmation dialog before any DELETE request can be made | Passed |
| Overview recent-activity three-dot control opens a menu with loan-desk navigation, reference, and note-review actions | Passed |
| Add library opens a validated registration modal with main-library and branch-library options, location, and plan fields | Passed |
| Selecting Branch library reveals the required main-library selector before a new branch can be registered | Passed |
| New rental opens a validated circulation form with reader details, lending branch, available book, and due date fields | Passed |
| Financial management exposes the Add entry control at the transaction ledger for structured financial intake | Passed |
| Financial-entry modal captures direction, category, description, amount, entry date, and branch for a valid ledger payload | Passed |
| Posting a financial entry creates the transaction through the API layer, refreshes the ledger, income total, net result, and source breakdown | Passed |
| Top-bar search opens a global index for libraries, books, members, rentals, staff, and financial entries | Passed |
| Global member result opens a profile with current borrowings, complete rental history, and outstanding fine total | Passed |
| Rental receipt action generates a downloadable client-side PDF and confirms completion in the dashboard | Passed |
| Settings navigation opens editable institution, receipt, notification, and table-density preferences | Passed |
| Financial ledger receipt action generates a downloadable client-side PDF and confirms completion in the dashboard | Passed |
| Settings includes a persistent Dark mode switch alongside the existing workspace preferences | Passed |
| Enabling Dark mode changes the dashboard, settings, and global-search surfaces to the low-light ledger theme | Passed |
| Member profile rental history provides status filters and newest, oldest, highest-fine, and book-title sort options | Passed |

The current preview is intentionally a **frontend prototype**. The operational controls demonstrate their intended interface behavior; actions that require a real library, HR, finance, or timekeeping data source show a concise in-app readiness message rather than attempting to persist data.
