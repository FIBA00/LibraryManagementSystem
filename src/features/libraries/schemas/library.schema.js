import { z } from "zod";


const librarySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Enter a library name.")
      .max(100, "Keep the name under 100 characters."),
    libraryType: z.enum(["main", "branch"]),
    parentLibraryId: z.string().optional(),
    branch: z
      .string()
      .trim()
      .min(2, "Enter a branch designation.")
      .max(80, "Keep the branch name under 80 characters."),
    city: z.string().trim().min(2, "Enter the city."),
    state: z.string().trim().min(2, "Enter the state or region."),
    subscriptionPlan: z.enum(["basic", "pro", "enterprise"]),
  })
  .superRefine((values, context) => {
    if (values.libraryType === "branch" && !values.parentLibraryId)
      context.addIssue({
        code: "custom",
        path: ["parentLibraryId"],
        message: "Select the main library that this branch belongs to.",
      });
  });
  
export default librarySchema