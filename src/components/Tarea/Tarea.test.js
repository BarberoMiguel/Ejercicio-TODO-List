import React from "react";
import { shallow } from "enzyme";
import Tarea from "./Tarea";

describe("Tarea", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Tarea />);
    expect(wrapper).toMatchSnapshot();
  });
});
