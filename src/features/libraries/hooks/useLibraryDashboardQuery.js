// Dashboard query hook: independent endpoint reads stay cacheable and branch-scoped through TanStack Query.
import { useQueries, useQuery } from "@tanstack/react-query";
import { libraryApi } from "../api/library.api.js";

const resourceDefinitions = [
  ["books", libraryApi.getBooks],
  ["rentals", libraryApi.getRentals],
  ["staff", libraryApi.getStaffMembers],
  ["transactions", libraryApi.getTransactions],
  ["payroll", libraryApi.getPayrollRecords],
  ["attendance", libraryApi.getAttendanceRecords],
];

export default function useLibraryDashboardQuery(libraryId) {
  const librariesQuery = useQuery({
    queryKey: ["libraries"],
    queryFn: () => libraryApi.getLibraries(),
  });

  const monthlyQuery = useQuery({
    queryKey: ["analytics", "monthly"],
    queryFn: () => libraryApi.getMonthlyData(),
  });
  
  const resourceQueries = useQueries({
    queries: resourceDefinitions.map(([resource, queryFn]) => ({
      queryKey: [resource, { libraryId: libraryId || "all" }],
      queryFn: () => queryFn({ libraryId }),
    })),
  });

  const [
    booksQuery,
    rentalsQuery,
    staffQuery,
    transactionsQuery,
    payrollQuery,
    attendanceQuery,
  ] = resourceQueries;
  const queries = [librariesQuery, monthlyQuery, ...resourceQueries];

  return {
    libraries: librariesQuery.data || [],
    data: {
      libraries: libraryId
        ? (librariesQuery.data || []).filter(
            library => library.id === libraryId
          )
        : librariesQuery.data || [],
      books: booksQuery.data || [],
      rentals: rentalsQuery.data || [],
      staff: staffQuery.data || [],
      transactions: transactionsQuery.data || [],
      payroll: payrollQuery.data || [],
      attendance: attendanceQuery.data || [],
      monthly: monthlyQuery.data || [],
    },
    isLoading: queries.some(query => query.isLoading),
    isFetching: queries.some(query => query.isFetching),
    isError: queries.some(query => query.isError),
    error: queries.find(query => query.error)?.error,
    refetch: () => Promise.all(queries.map(query => query.refetch())),
  };
}
