import capitalize from "../index";

test("if world is capitalized", () => {
  expect(capitalize("test")).toMatch("Test");
});
