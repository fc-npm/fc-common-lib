import { fromObject } from "../src/index";

describe("index", () => {
  // toBe: address or shallow compare
  // toEqual: value and deep compare

  test("fromObject", () => {
    expect(fromObject({ a: 1, b: 2, c: 3 })).toBe("a=1&b=2&c=3");
    expect(fromObject({})).toBe("");

    // you have to wrap a function here when testing exception
    expect(function() {
      fromObject();
    }).toThrow();
    expect(function() {
      fromObject(null);
    }).toThrow();
  });
});
