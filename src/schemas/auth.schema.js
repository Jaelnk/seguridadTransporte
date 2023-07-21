const { z } = require("zod");

const registerSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),
  email: z
    .string()
    .email({ message: "Email is not valid" })
    .refine((value) => value.trim().length > 0, {
      message: "Email is required",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .refine((value) => value.trim().length > 0, {
      message: "Password is required",
    }),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

module.exports = {
  registerSchema,
  loginSchema,
};
