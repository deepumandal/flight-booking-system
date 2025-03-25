import { config } from "dotenv";
import { defineConfig } from "orval";

config();

export default defineConfig({
  petstore: {
    output: {
      prettier: true,
      mode: "single",
      target: "./src/sdk.ts",
      client: "react-query",
      override: {
        mutator: {
          path: "./src/api-sdk/AxiosService.ts",
          name: "request",
        },
      },
    },
    input: {
      target: process.env.ORVAL_API_URL ?? "",
    },
  },
});
