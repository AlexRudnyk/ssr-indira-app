import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "simple-import-sort": eslintPluginSimpleImportSort,
    },
    rules: {
      "prefer-const": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // React and libraries
            ["^react", "^@?\\w"],
            // Locale
            ["^.+locale"],
            // Components: both relative and absolute
            ["^.+/components"],
            // Redux: both relative and absolute
            ["^.+/redux"],
            // Functions: both relative and absolute
            ["^.+/functions"],
            // const, enums, mock data: both relative and absolute
            ["^.+(/consts|/BadgeEnums|/DummyContents)"],
            // Other absolute paths
            ["^src"],
            // Other relative paths, including parent imports.
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // One level relative paths
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Side Effects
            ["^\\u0000"],
            // Styles
            ["^.+\\.?(scss)$"],
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
