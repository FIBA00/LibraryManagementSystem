import { z } from "zod";

const bookSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(2, "Enter a title of at least 2 characters.")
      .max(140, "Keep the title under 140 characters."),
    author: z
      .string()
      .trim()
      .min(2, "Enter the author’s name.")
      .max(100, "Keep the author under 100 characters."),
    isbn: z
      .string()
      .trim()
      .min(10, "Enter a valid ISBN or catalogue identifier.")
      .max(32, "Keep the identifier under 32 characters."),
    genre: z.string().trim().min(2, "Select or enter a genre."),
    shelfLocation: z
      .string()
      .trim()
      .min(2, "Enter a shelf location.")
      .max(20, "Keep the shelf code under 20 characters."),
    totalCopies: z.coerce
      .number()
      .int()
      .min(1, "At least one copy is required.")
      .max(9999, "Enter fewer than 10,000 copies."),
    availableCopies: z.coerce
      .number()
      .int()
      .min(0, "Available copies cannot be negative."),
    condition: z.enum(["excellent", "good", "fair"]),
    libraryId: z.string().min(1, "Choose a library branch."),
  })
  .refine(values => values.availableCopies <= values.totalCopies, {
    path: ["availableCopies"],
    message: "Available copies cannot exceed total copies.",
  });

export default bookSchema;
