import { describe, expect, test } from "bun:test";
import { recursiveKeyFilter } from "./recursiveKeyFilter";

describe("recursiveKeyFilter", () => {
  test("filters keys from nested objects and arrays", () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: [
          { e: 3, f: 4 },
          { g: 5, h: 6 },
        ],
      },
    };

    const filtered = recursiveKeyFilter(obj, ["a", "e", "g"]);

    expect(filtered).toEqual({
      b: {
        c: 2,
        d: [{ f: 4 }, { h: 6 }],
      },
    });
  });

  test("handles empty objects and arrays", () => {
    const obj = {
      a: {},
      b: [],
      c: {
        d: [],
      },
    };

    const filtered = recursiveKeyFilter(obj, ["a", "c"]);

    expect(filtered).toEqual({
      b: [],
    });
  });

  test("handles primitive values", () => {
    const obj = {
      a: 1,
      b: "test",
      c: true,
      d: null,
    };

    const filtered = recursiveKeyFilter(obj, ["a", "c"]);

    expect(filtered).toEqual({
      b: "test",
      d: null,
    });
  });
});
