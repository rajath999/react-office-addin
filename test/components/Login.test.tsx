import React from "react";
import { Login } from "../../src/components/Login";
import renderer from "react-test-renderer";

describe("Testing the Login component", () => {
  test("test 1 equal to 1", () => {
    expect(1).toBe(1);
  });
  test("enter username and password", () => {
    const component = renderer.create(<Login />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
