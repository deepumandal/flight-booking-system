import { loginSchema, signupSchema } from "@App/auth/utils/schema";

export const getAuthSchema = (mode: "login" | "signup") =>
  mode === "signup" ? signupSchema : loginSchema;
