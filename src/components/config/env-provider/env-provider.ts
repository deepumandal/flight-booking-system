import { config } from "dotenv";

config();
type envKey =
  | "ADMIN_EMAIL_ID"
  | "ADMIN_PHONE"
  | "ACCESS_KEY"
  | "GITHUB_URL"
  | "GITHUB_ACCESS_TOKEN"
  | "NODE_MAILER_SECURE"
  | "NODE_MAILER_PORT"
  | "NODE_MAILER_HOST"
  | "NODE_MAILER_PASS"
  | "NEXt_APP_GITHUB_ACCESS_TOKEN"
  | "NODE_MAILER_RECEIVER"
  | "APP_BASE_URL"
  | "REDIS_URL_LOCAL"
  | "UPSTASH_REDIS_URL"
  | "UPSTASH_REDIS_TOKEN"
  | "GITHUB_USER_NAME"
  | "NEXT_PUBLIC_BASE_URL"
  | "GOOGLE_SITE_VERIFICATION";
// | "SMTP_USERNAME"
// | "SMTP_PASSWORD"
// | "SMTP_PORT"
// | "SMTP_HOST";
// | "NEXt_APP_GITHUB_ACCESS_TOKEN";

export const getOrThrowEnv = (key: envKey): string => {
  const env = process.env[key];
  if (typeof env === "undefined" && process.env.NODE_ENV === "development") {
    throw new Error(`${key} is not defined`);
  }
  return process.env[key] as string;
};
