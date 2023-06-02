//@ts-ignore

import Wrapper from "./Wrapper.vue";
import TextInputVue from "../TextInput.vue";
import { mount } from "@vue/test-utils";

describe("input", () => {
  it("changes value", async () => {
    const wrapper = mount(Wrapper, {});

    const input = wrapper.find("input");

    await input.setValue("123");

    const span = wrapper.find("span");

    expect(span.text()).toBe("123");
  });

  it("works with props", () => {
    const wrapper = mount(TextInputVue, {
      attrs: {
        placeholder: "placeholder",
        defaultValue: "defaultValue",
      },
    });

    const input = wrapper.find("input");

    expect(input.element.defaultValue).toBe("defaultValue");
    expect(input.element.placeholder).toBe("placeholder");
  });
});
