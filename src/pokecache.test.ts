import { expect, test } from "vitest";
import { Cache } from "./pokecache.js";

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 100,
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 200,
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  // Wait for two reap ticks so the entry is definitely older than the interval
  await new Promise((resolve) => setTimeout(resolve, interval * 2 + 100));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});

test("get returns undefined for a missing key", () => {
  const cache = new Cache(1000);
  expect(cache.get("nope")).toBeUndefined();
  cache.stopReapLoop();
});
