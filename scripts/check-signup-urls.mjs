// Pre-merge check. Not part of unit tests or Playwright: the register pages
// depend on Embed My Reviews settings outside this repo.
import { defaultGrowthSignupUrl, defaultStarterSignupUrl } from "../lib/signup-url.ts";

const urls = [defaultStarterSignupUrl, defaultGrowthSignupUrl];
let failed = false;

for (const url of urls) {
  try {
    const response = await fetch(url, { redirect: "follow" });
    if (response.status !== 200) {
      console.error(`${url} returned ${response.status}`);
      failed = true;
      continue;
    }
    console.log(`${url} returned 200`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`${url} failed: ${message}`);
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}
