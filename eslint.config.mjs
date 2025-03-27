// eslint.config.mjs
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";
import readableTailwind from "eslint-plugin-readable-tailwind";
import path from "node:path";

const tsProject = path.resolve("./tsconfig.json");

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: tsProject,
        tsconfigRootDir: path.resolve(),
        sourceType: "module",
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      prettier,
      import: importPlugin,
      "readable-tailwind": readableTailwind,
    },
    rules: {
      ...tseslint.configs.strictTypeChecked[1].rules,

      "prettier/prettier": [
        "error",
        {
          printWidth: 80,
          trailingComma: "es5",
          bracketSpacing: true,
          bracketSameLine: false,
          arrowParens: "always",
          endOfLine: "auto",
        },
      ],
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "arrow-body-style": ["error", "as-needed"],
      "no-unused-vars": "error",
      "react/jsx-filename-extension": [
        "warn",
        { extensions: [".jsx", ".tsx"] },
      ],
      "import/no-unresolved": "error",
      "import/no-duplicates": "error",
      "react/prop-types": "off",
      "react/no-this-in-sfc": "error",
      "no-useless-call": "error",
      "no-useless-return": "error",
      "no-nested-ternary": "off",
      "no-console": ["error", { allow: ["log", "warn", "error"] }],
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/require-await": "off",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["sibling", "parent"],
            "index",
            "unknown",
          ],
          pathGroups: [
            {
              pattern: "react|react-dom|react-router-dom",
              group: "external",
              position: "before",
            },
            { pattern: "components/**", group: "internal", position: "after" },
            { pattern: "utils/**", group: "internal", position: "after" },
            { pattern: "const/**", group: "internal", position: "after" },
            { pattern: "redux/**", group: "internal", position: "after" },
            { pattern: "selectors/**", group: "internal", position: "after" },
            { pattern: "images/**", group: "internal", position: "after" },
            { pattern: "style/**", group: "internal", position: "after" },
          ],
          pathGroupsExcludedImportTypes: ["builtin", "external"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: { directory: tsProject },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },
  {
    ignores: ["api.ts", "sdk.ts"],
  },
];
