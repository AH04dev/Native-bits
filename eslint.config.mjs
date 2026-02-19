import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Snippet sources served as raw text in docs
    "src/registry/components/**",
    "src/registry/animations/**",
    "src/registry/shadcn/**",
    // Legacy visual experiments not used by current pages
    "src/components/ColorBends.tsx",
    "src/components/Orb.tsx",
  ]),
]);

export default eslintConfig;
