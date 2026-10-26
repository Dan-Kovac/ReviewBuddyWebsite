/** Pure spots maths. No network, no env, no fake increments. */
export const SETUP_TOTAL = 200;

export const starterPriceId = "price_1UUJke2VeLXnEu5vfFWYnp0Y";
export const growthPriceId = "price_1UUJlp2VeLXnEu5vB6hQdpL0";

export type SetupSpots = {
  claimed: number;
  total: number;
  remaining: number;
};

export function spotsFromClaimed(claimed: number): SetupSpots {
  const safe = Number.isFinite(claimed) ? Math.max(0, Math.floor(claimed)) : 0;
  return {
    claimed: safe,
    total: SETUP_TOTAL,
    remaining: Math.max(0, SETUP_TOTAL - safe),
  };
}

/** A blank value is not a count. Anything that is not a whole number is rejected. */
export function parseClaimedEnv(value: string | undefined): number | null {
  if (value === undefined || value.trim() === "") {
    return null;
  }
  if (!/^\d+$/.test(value.trim())) {
    return null;
  }
  return Number(value.trim());
}
