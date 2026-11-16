import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function withExtension(filePath) {
  if (/\.(?:ts|tsx|js|mjs|cjs|json|node)$/.test(filePath)) return filePath;
  if (existsSync(`${filePath}.ts`)) return `${filePath}.ts`;
  if (existsSync(`${filePath}.tsx`)) return `${filePath}.tsx`;
  return `${filePath}.ts`;
}

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    return nextResolve(pathToFileURL(withExtension(join(root, specifier.slice(2)))).href, context);
  }
  if (
    (specifier.startsWith("./") || specifier.startsWith("../")) &&
    !/\.(?:ts|tsx|js|mjs|cjs|json|node)$/.test(specifier)
  ) {
    return nextResolve(`${specifier}.ts`, context);
  }
  return nextResolve(specifier, context);
}
