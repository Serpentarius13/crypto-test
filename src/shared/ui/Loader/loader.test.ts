import BaseLoaderVue from "./BaseLoader.vue";
import { mount } from "@vue/test-utils";

describe("loader", () => {
  it("has basic styles", () => {
    const wrapper = mount(BaseLoaderVue);

    const styles = window.getComputedStyle(wrapper.element);

    //@ts-expect-error
    expect(styles._values["--width"]).toBe("24");
    //@ts-expect-error
    expect(styles._values["--color"]).toBe("#000");
  });
  it("works with size and color", async () => {
    const wrapper = mount(BaseLoaderVue, {
      props: { size: 48, color: "#fff" },
    });

    const styles = window.getComputedStyle(wrapper.element);

    //@ts-expect-error
    expect(styles._values["--width"]).toBe("48");
    //@ts-expect-error
    expect(styles._values["--color"]).toBe("#fff");
  });
});
