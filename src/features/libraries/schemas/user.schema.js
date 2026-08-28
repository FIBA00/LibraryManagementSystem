import { z } from "zod";

const userSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter the user’s name.")
    .max(80, "Keep the name under 80 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  role: z.string().trim().min(2, "Enter a role."),
  department: z.string().trim().min(2, "Enter a department."),
  salary: z.coerce
    .number()
    .int()
    .min(0, "Salary cannot be negative.")
    .max(1_000_000, "Enter a realistic annual salary."),
  libraryId: z.string().min(1, "Choose a library branch."),
});

export default userSchema;
