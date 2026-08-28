import { z } from "zod";

const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  category: z.string().trim().min(2, "Enter a transaction category."),
  description: z
    .string()
    .trim()
    .min(3, "Enter a useful ledger description.")
    .max(140, "Keep the description under 140 characters."),
  amount: z.coerce
    .number()
    .positive("Enter an amount greater than zero.")
    .max(1_000_000, "Enter a realistic amount."),
  date: z.string().min(1, "Choose an entry date."),
  libraryId: z.string().min(1, "Choose the affected branch."),
});
export default transactionSchema;
