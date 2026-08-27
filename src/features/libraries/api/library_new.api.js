// Library API contract: all dashboard HTTP shapes live here; set VITE_API_MODE=remote and VITE_API_BASE_URL to swap mock transport for a real backend.
import {
  attendanceRecords as seedAttendance,
  books as seedBooks,
  libraries as seedLibraries,
  monthlyData as seedMonthlyData,
  payrollRecords as seedPayroll,
  rentals as seedRentals,
  staffMembers as seedStaff,
  transactions as seedTransactions,
} from "@/data/libraryData";

const API_MODE = import.meta.env.VITE_API_MODE || "mock";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const MOCK_NETWORK_DELAY = 180;
const AUTH_TOKEN_STORAGE_KEY =
  import.meta.env.VITE_AUTH_TOKEN_STORAGE_KEY || "access_token";
let authTokenResolver = null;

export const libraryEndpoints = Object.freeze({
  libraries: "/api/libraries",
  books: "/api/books",
  rentals: "/api/rentals",
  staff: "/api/staff",
  transactions: "/api/transactions",
  monthlyData: "/api/analytics/monthly",
  payroll: "/api/payroll",
  attendance: "/api/attendance",
});

function clone(data) {
  return typeof structuredClone === "function"
    ? structuredClone(data)
    : JSON.parse(JSON.stringify(data));
}

const mockDatabase = {
  libraries: clone(seedLibraries),
  books: clone(seedBooks),
  rentals: clone(seedRentals),
  staff: clone(seedStaff),
  transactions: clone(seedTransactions),
  monthlyData: clone(seedMonthlyData),
  payroll: clone(seedPayroll),
  attendance: clone(seedAttendance),
};

function createId(prefix) {
  const suffix =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID().slice(0, 8)
      : `${Date.now()}-${Math.random().toString(16).slice(2, 6)}`;
  return `${prefix}-${suffix}`;
}

function filterByLibrary(records, libraryId) {
  return libraryId
    ? records.filter(
        record => record.libraryId === libraryId || record.id === libraryId
      )
    : records;
}

function findAndPatch(collection, id, changes) {
  const index = mockDatabase[collection].findIndex(record => record.id === id);
  if (index === -1)
    throw new Error(`${collection} record "${id}" was not found.`);
  const updated = { ...mockDatabase[collection][index], ...changes };
  mockDatabase[collection][index] = updated;
  return updated;
}

function createRecord(collection, prefix, defaults, input) {
  const record = { ...defaults, ...input, id: input.id || createId(prefix) };
  mockDatabase[collection].unshift(record);
  return record;
}

function removeRecord(collection, id) {
  const index = mockDatabase[collection].findIndex(record => record.id === id);
  if (index === -1)
    throw new Error(`${collection} record "${id}" was not found.`);
  return mockDatabase[collection].splice(index, 1)[0];
}

function requestMock(execute) {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      try {
        resolve(clone(execute()));
      } catch (error) {
        reject(error);
      }
    }, MOCK_NETWORK_DELAY);
  });
}

/** Configure a custom token source when the application auth provider does not use localStorage. */
export function configureLibraryApiAuth({ getAccessToken } = {}) {
  authTokenResolver =
    typeof getAccessToken === "function" ? getAccessToken : null;
}

async function resolveAccessToken() {
  if (authTokenResolver) return authTokenResolver();
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

async function requestRemote(endpoint, { method, body } = {}) {
  const token = await resolveAccessToken();
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const responseData =
    response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok)
    throw new Error(
      responseData?.message ||
        responseData?.error ||
        `API request failed: ${method} ${endpoint} (${response.status})`
    );
  return responseData;
}

function request(endpoint, { method = "GET", body, mock } = {}) {
  return API_MODE === "remote"
    ? requestRemote(endpoint, { method, body })
    : requestMock(mock);
}

function resourceEndpoint(base, id) {
  return id ? `${base}/${id}` : base;
}

/** GET /api/libraries?libraryId=:libraryId */
export function getLibraries({ libraryId } = {}) {
  const endpoint = libraryId
    ? `${libraryEndpoints.libraries}?libraryId=${encodeURIComponent(libraryId)}`
    : libraryEndpoints.libraries;
  return request(endpoint, {
    mock: () =>
      libraryId
        ? mockDatabase.libraries.filter(library => library.id === libraryId)
        : mockDatabase.libraries,
  });
}

/** POST /api/libraries */
export function createLibrary(input) {
  return request(libraryEndpoints.libraries, {
    method: "POST",
    body: input,
    mock: () =>
      createRecord(
        "libraries",
        "lib",
        {
          name: "New Library",
          branch: "Main Library",
          libraryType: "main",
          parentLibraryId: null,
          city: "New York",
          state: "NY",
          members: 0,
          totalBooks: 0,
          staffCount: 0,
          status: "active",
          subscriptionPlan: "basic",
          monthlyRevenue: 0,
        },
        input
      ),
  });
}

/** PATCH /api/libraries/:libraryId */
export function updateLibrary(libraryId, changes) {
  return request(resourceEndpoint(libraryEndpoints.libraries, libraryId), {
    method: "PATCH",
    body: changes,
    mock: () => findAndPatch("libraries", libraryId, changes),
  });
}

/** GET /api/books?libraryId=:libraryId */
export function getBooks({ libraryId } = {}) {
  const endpoint = libraryId
    ? `${libraryEndpoints.books}?libraryId=${encodeURIComponent(libraryId)}`
    : libraryEndpoints.books;
  return request(endpoint, {
    mock: () => filterByLibrary(mockDatabase.books, libraryId),
  });
}

/** POST /api/books */
export function createBook(input) {
  return request(libraryEndpoints.books, {
    method: "POST",
    body: input,
    mock: () =>
      createRecord(
        "books",
        "bk",
        {
          isbn: "Pending cataloguing",
          title: "New acquisition",
          author: "To be catalogued",
          genre: "General",
          totalCopies: 1,
          availableCopies: 1,
          shelfLocation: "INTAKE",
          condition: "excellent",
          libraryId: mockDatabase.libraries[0]?.id || null,
        },
        input
      ),
  });
}

/** PATCH /api/books/:bookId */
export function updateBook(bookId, changes) {
  return request(resourceEndpoint(libraryEndpoints.books, bookId), {
    method: "PATCH",
    body: changes,
    mock: () => findAndPatch("books", bookId, changes),
  });
}

/** DELETE /api/books/:bookId */
export function deleteBook(bookId) {
  return request(resourceEndpoint(libraryEndpoints.books, bookId), {
    method: "DELETE",
    mock: () => removeRecord("books", bookId),
  });
}

/** GET /api/rentals?libraryId=:libraryId */
export function getRentals({ libraryId } = {}) {
  const endpoint = libraryId
    ? `${libraryEndpoints.rentals}?libraryId=${encodeURIComponent(libraryId)}`
    : libraryEndpoints.rentals;
  return request(endpoint, {
    mock: () => filterByLibrary(mockDatabase.rentals, libraryId),
  });
}

/** POST /api/rentals */
export function createRental(input) {
  return request(libraryEndpoints.rentals, {
    method: "POST",
    body: input,
    mock: () => {
      const book = input.bookId
        ? mockDatabase.books.find(record => record.id === input.bookId)
        : null;
      if (input.bookId && !book)
        throw new Error("The selected book was not found in the collection.");
      if (book && book.availableCopies < 1)
        throw new Error(`${book.title} has no copies currently available.`);
      if (book)
        findAndPatch("books", book.id, {
          availableCopies: book.availableCopies - 1,
        });
      return createRecord(
        "rentals",
        "rnt",
        {
          memberName: "New member",
          bookTitle: "New loan",
          rentedDate: new Date().toISOString().slice(0, 10),
          dueDate: "To be assigned",
          status: "active",
          renewalCount: 0,
          fineAmount: 0,
          libraryId: mockDatabase.libraries[0]?.id || null,
        },
        { ...input, bookTitle: input.bookTitle || book?.title || "New loan" }
      );
    },
  });
}

/** PATCH /api/rentals/:rentalId */
export function updateRental(rentalId, changes) {
  return request(resourceEndpoint(libraryEndpoints.rentals, rentalId), {
    method: "PATCH",
    body: changes,
    mock: () => findAndPatch("rentals", rentalId, changes),
  });
}

/** POST /api/rentals/:rentalId/return */
export function returnRental(rentalId, input = {}) {
  const endpoint = `${resourceEndpoint(libraryEndpoints.rentals, rentalId)}/return`;
  return request(endpoint, {
    method: "POST",
    body: input,
    mock: () =>
      findAndPatch("rentals", rentalId, {
        status: "returned",
        returnedDate:
          input.returnedDate || new Date().toISOString().slice(0, 10),
        fineAmount: input.fineAmount ?? 0,
      }),
  });
}

/** POST /api/rentals/:rentalId/renew */
export function renewRental(rentalId, input = {}) {
  const endpoint = `${resourceEndpoint(libraryEndpoints.rentals, rentalId)}/renew`;
  return request(endpoint, {
    method: "POST",
    body: input,
    mock: () => {
      const record = mockDatabase.rentals.find(item => item.id === rentalId);
      if (!record)
        throw new Error(`rentals record "${rentalId}" was not found.`);
      return findAndPatch("rentals", rentalId, {
        renewalCount: record.renewalCount + 1,
        dueDate: input.dueDate || record.dueDate,
      });
    },
  });
}

/** GET /api/staff?libraryId=:libraryId */
export function getStaffMembers({ libraryId } = {}) {
  const endpoint = libraryId
    ? `${libraryEndpoints.staff}?libraryId=${encodeURIComponent(libraryId)}`
    : libraryEndpoints.staff;
  return request(endpoint, {
    mock: () => filterByLibrary(mockDatabase.staff, libraryId),
  });
}

/** POST /api/staff */
export function createStaffMember(input) {
  return request(libraryEndpoints.staff, {
    method: "POST",
    body: input,
    mock: () =>
      createRecord(
        "staff",
        "st",
        {
          name: "New team member",
          role: "Library Assistant",
          department: "Circulation",
          salary: 0,
          status: "active",
          libraryId: mockDatabase.libraries[0]?.id || null,
          initials: "NT",
          avatarColor: "#2457D6",
        },
        input
      ),
  });
}

/** PATCH /api/staff/:staffId */
export function updateStaffMember(staffId, changes) {
  return request(resourceEndpoint(libraryEndpoints.staff, staffId), {
    method: "PATCH",
    body: changes,
    mock: () => findAndPatch("staff", staffId, changes),
  });
}

/** DELETE /api/staff/:staffId */
export function deleteStaffMember(staffId) {
  return request(resourceEndpoint(libraryEndpoints.staff, staffId), {
    method: "DELETE",
    mock: () => removeRecord("staff", staffId),
  });
}

/** GET /api/transactions?libraryId=:libraryId */
export function getTransactions({ libraryId } = {}) {
  const endpoint = libraryId
    ? `${libraryEndpoints.transactions}?libraryId=${encodeURIComponent(libraryId)}`
    : libraryEndpoints.transactions;
  return request(endpoint, {
    mock: () => filterByLibrary(mockDatabase.transactions, libraryId),
  });
}

/** POST /api/transactions */
export function createTransaction(input) {
  return request(libraryEndpoints.transactions, {
    method: "POST",
    body: input,
    mock: () =>
      createRecord(
        "transactions",
        "fin",
        {
          type: "income",
          category: "Uncategorised",
          description: "New transaction",
          amount: 0,
          date: new Date().toISOString().slice(0, 10),
          libraryId: mockDatabase.libraries[0]?.id || null,
        },
        input
      ),
  });
}

/** PATCH /api/transactions/:transactionId */
export function updateTransaction(transactionId, changes) {
  return request(
    resourceEndpoint(libraryEndpoints.transactions, transactionId),
    {
      method: "PATCH",
      body: changes,
      mock: () => findAndPatch("transactions", transactionId, changes),
    }
  );
}

/** GET /api/analytics/monthly */
export function getMonthlyData() {
  return request(libraryEndpoints.monthlyData, {
    mock: () => mockDatabase.monthlyData,
  });
}

/** GET /api/payroll?libraryId=:libraryId */
export function getPayrollRecords({ libraryId } = {}) {
  const endpoint = libraryId
    ? `${libraryEndpoints.payroll}?libraryId=${encodeURIComponent(libraryId)}`
    : libraryEndpoints.payroll;
  return request(endpoint, {
    mock: () => filterByLibrary(mockDatabase.payroll, libraryId),
  });
}

/** PATCH /api/payroll/:payrollId */
export function updatePayrollRecord(payrollId, changes) {
  return request(resourceEndpoint(libraryEndpoints.payroll, payrollId), {
    method: "PATCH",
    body: changes,
    mock: () => findAndPatch("payroll", payrollId, changes),
  });
}

/** POST /api/payroll/process */
export function processPayroll(input = {}) {
  return request(`${libraryEndpoints.payroll}/process`, {
    method: "POST",
    body: input,
    mock: () => {
      mockDatabase.payroll = mockDatabase.payroll.map(record =>
        (!input.libraryId || record.libraryId === input.libraryId) &&
        record.status !== "paid"
          ? { ...record, status: "paid" }
          : record
      );
      return filterByLibrary(mockDatabase.payroll, input.libraryId);
    },
  });
}

/** GET /api/attendance?libraryId=:libraryId */
export function getAttendanceRecords({ libraryId } = {}) {
  const endpoint = libraryId
    ? `${libraryEndpoints.attendance}?libraryId=${encodeURIComponent(libraryId)}`
    : libraryEndpoints.attendance;
  return request(endpoint, {
    mock: () => filterByLibrary(mockDatabase.attendance, libraryId),
  });
}

/** POST /api/attendance */
export function createAttendanceRecord(input) {
  return request(libraryEndpoints.attendance, {
    method: "POST",
    body: input,
    mock: () =>
      createRecord(
        "attendance",
        "att",
        {
          staffId: "unknown",
          staffName: "New team member",
          role: "Library Assistant",
          checkIn: "—",
          checkOut: "—",
          status: "present",
          libraryId: mockDatabase.libraries[0]?.id || null,
        },
        input
      ),
  });
}

/** PATCH /api/attendance/:attendanceId */
export function updateAttendanceRecord(attendanceId, changes) {
  return request(resourceEndpoint(libraryEndpoints.attendance, attendanceId), {
    method: "PATCH",
    body: changes,
    mock: () => findAndPatch("attendance", attendanceId, changes),
  });
}

export const libraryApi = {
  getLibraries,
  createLibrary,
  updateLibrary,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  getRentals,
  createRental,
  updateRental,
  returnRental,
  renewRental,
  getStaffMembers,
  createStaffMember,
  updateStaffMember,
  deleteStaffMember,
  getTransactions,
  createTransaction,
  updateTransaction,
  getMonthlyData,
  getPayrollRecords,
  updatePayrollRecord,
  processPayroll,
  getAttendanceRecords,
  createAttendanceRecord,
  updateAttendanceRecord,
};
