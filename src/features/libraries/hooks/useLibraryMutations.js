// Swap-ready mutation hooks: each named write maps to library.api.js and invalidates only the affected resource caches.
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { libraryApi } from "@/api/library.api";

export default function useLibraryMutations() {
  const queryClient = useQueryClient();
  const invalidate = (...resources) =>
    Promise.all(
      resources.map(resource =>
        queryClient.invalidateQueries({ queryKey: [resource] })
      )
    );
  const mutation = (mutationFn, resources) =>
    // ? this is raising some bugs :
    // fix-me: React Hook "useMutation" is called in function "mutation" that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter. React Hook names must start with the word "use".
    useMutation({
      mutationFn,
      onSuccess: () => invalidate(...resources),
      onError: error =>
        toast.error("Could not complete the library update", {
          description: error?.message || "Please retry the action.",
        }),
    });

  return {
    createLibrary: mutation(libraryApi.createLibrary, ["libraries"]),

    updateLibrary: mutation(
      ({ libraryId, changes }) => libraryApi.updateLibrary(libraryId, changes),
      ["libraries"]
    ),

    createBook: mutation(libraryApi.createBook, ["books"]),

    updateBook: mutation(
      ({ bookId, changes }) => libraryApi.updateBook(bookId, changes),
      ["books"]
    ),

    deleteBook: mutation(bookId => libraryApi.deleteBook(bookId), ["books"]),

    createRental: mutation(libraryApi.createRental, ["rentals", "books"]),

    updateRental: mutation(
      ({ rentalId, changes }) => libraryApi.updateRental(rentalId, changes),
      ["rentals"]
    ),

    returnRental: mutation(
      ({ rentalId, input }) => libraryApi.returnRental(rentalId, input),
      ["rentals", "books"]
    ),

    renewRental: mutation(
      ({ rentalId, input }) => libraryApi.renewRental(rentalId, input),
      ["rentals"]
    ),

    createStaffMember: mutation(libraryApi.createStaffMember, ["staff"]),

    updateStaffMember: mutation(
      ({ staffId, changes }) => libraryApi.updateStaffMember(staffId, changes),
      ["staff"]
    ),

    deleteStaffMember: mutation(
      staffId => libraryApi.deleteStaffMember(staffId),
      ["staff"]
    ),

    createTransaction: mutation(libraryApi.createTransaction, ["transactions"]),

    updateTransaction: mutation(
      ({ transactionId, changes }) =>
        libraryApi.updateTransaction(transactionId, changes),
      ["transactions"]
    ),

    updatePayrollRecord: mutation(
      ({ payrollId, changes }) =>
        libraryApi.updatePayrollRecord(payrollId, changes),
      ["payroll"]
    ),

    processPayroll: mutation(libraryApi.processPayroll, ["payroll"]),

    createAttendanceRecord: mutation(libraryApi.createAttendanceRecord, [
      "attendance",
    ]),

    updateAttendanceRecord: mutation(
      ({ attendanceId, changes }) =>
        libraryApi.updateAttendanceRecord(attendanceId, changes),
      ["attendance"]
    ),
  };
}
