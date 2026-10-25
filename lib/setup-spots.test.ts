import assert from "node:assert/strict";
import test from "node:test";
import { parseClaimedEnv, spotsFromClaimed } from "./setup-spots.ts";

test("a missing count means nobody has claimed a setup", () => {
  assert.deepEqual(spotsFromClaimed(parseClaimedEnv(undefined) ?? -1), {
    claimed: 0,
    total: 200,
    remaining: 200,
  });
});

test("remaining spots are the real count subtracted from 200", () => {
  assert.equal(spotsFromClaimed(37).remaining, 163);
  assert.equal(spotsFromClaimed(200).remaining, 0);
  assert.equal(spotsFromClaimed(240).remaining, 0);
});

test("a non-numeric claimed value is rejected", () => {
  assert.equal(parseClaimedEnv("12"), 12);
  assert.equal(parseClaimedEnv("nope"), null);
  assert.equal(parseClaimedEnv("-3"), null);
});
