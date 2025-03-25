import { config } from "dotenv";

config();
type envKey = "ORVAL_API_URL" | "NEXT_PUBLIC_APP_BASE_URL";
export const getOrThrowEnv = (key: envKey): string => {
  const env = process.env[key];

  console.log("envh", env)

  if (typeof env === "undefined" && process.env.NODE_ENV === "development") {
    throw new Error(`${key} is not defined`);
  }
  return process.env[key] as string;
};
