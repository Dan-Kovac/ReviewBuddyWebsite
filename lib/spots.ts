import { cacheLife } from "next/cache";

if (typeof window !== "undefined") {
  throw new Error("Setup spots may only be read on the server.");
}
import {
  growthPriceId,
  spotsFromClaimed,
  starterPriceId,
  type SetupSpots,
} from "@/lib/setup-spots";

/**
 * Free-setup spots. Cached for about 10 minutes.
 *
 * STRIPE_SECRET_KEY counts active and trialing subscriptions on the Starter
 * and Growth prices. The key never reaches the browser.
 * With no key, or if Stripe cannot be read, this returns null and the page
 * shows nothing. It does not fall back to a default of 200.
 */
type StripeList = {
  data?: { id?: string }[];
  has_more?: boolean;
};

async function subscriptionIds(price: string, status: "active" | "trialing", key: string): Promise<string[]> {
  const ids: string[] = [];
  let startingAfter = "";

  for (let page = 0; page < 20; page += 1) {
    const params = new URLSearchParams({ price, status, limit: "100" });
    if (startingAfter) {
      params.set("starting_after", startingAfter);
    }
    const response = await fetch(`https://api.stripe.com/v1/subscriptions?${params}`, {
      headers: { Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      throw new Error(`Stripe subscriptions returned ${response.status}`);
    }
    const body = (await response.json()) as StripeList;
    const data = body.data ?? [];
    for (const item of data) {
      if (item.id) {
        ids.push(item.id);
      }
    }
    if (!body.has_more || data.length === 0) {
      return ids;
    }
    const last = data[data.length - 1]?.id;
    if (!last) {
      return ids;
    }
    startingAfter = last;
  }

  throw new Error("Stripe subscription list was longer than expected");
}

async function claimedFromStripe(key: string): Promise<number> {
  const batches = await Promise.all(
    [starterPriceId, growthPriceId].flatMap((price) =>
      (["active", "trialing"] as const).map((status) => subscriptionIds(price, status, key)),
    ),
  );
  return new Set(batches.flat()).size;
}

export async function getSetupSpots(): Promise<SetupSpots | null> {
  "use cache";
  cacheLife({ stale: 600, revalidate: 600, expire: 3600 });

  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) {
    return null;
  }
  try {
    return spotsFromClaimed(await claimedFromStripe(key));
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Could not count setup spots");
    return null;
  }
}
