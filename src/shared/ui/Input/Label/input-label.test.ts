import InputLabel from "./InputLabel.vue";

import { mount } from "@vue/test-utils";

describe("input", () => {
  it("renders", async () => {
    const wrapper = mount(InputLabel, {
      props: {
        label: "123",
      },
    });

    expect(wrapper.find("span").text()).toBe("123");
  });
});
