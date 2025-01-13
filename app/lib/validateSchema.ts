import { ZodSchema } from "zod";

export const validateSchema = (schema: ZodSchema, data: unknown) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: {
        errors: result.error.flatten().fieldErrors,
        message: "failure",
      },
    };
  }

  return { success: true, data: result.data };
};
