import { z } from "zod";

const rentalSchema = z.object({
  memberName: z.string().trim().min(2, "Enter the member’s name."),
  memberEmail: z.string().trim().email("Enter a valid member email."),
  libraryId: z.string().min(1, "Choose a lending branch."),
  bookId: z.string().min(1, "Select an available book."),
  dueDate: z.string().min(1, "Choose a due date."),
});

export default rentalSchema;
