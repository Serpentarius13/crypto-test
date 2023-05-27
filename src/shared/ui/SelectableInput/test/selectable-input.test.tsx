//@ts-ignore

import { mount } from "@vue/test-utils";
import SelectableInputVue from "../SelectableInput.vue";
import WrapperVue from "./Wrapper.vue";

describe("selectable input", () => {
  it("shows opened", async () => {
    //@ts-expect-error
    const wrapper = mount(SelectableInputVue, {
      props: {
        isOpened: true,
        value: "",
      },
      slots: {
        button: "<div> 213</div>",
        menu: '<div class="menu"> Menu div </div>',
      },
    });

    const search = wrapper.find('input[type="search"]');

    expect(search.exists()).toBe(true);

    const menu = wrapper.find('div[class="menu"]');

    expect(menu.text()).toBe("Menu div");

    await new Promise((r) => setTimeout(r, 150));

    const crossIcon = wrapper.find('[id="cross"]');

    expect(crossIcon.exists()).toBe(true);
  });

  it("shows closed", async () => {
    //@ts-expect-error
    const wrapper = mount(SelectableInputVue, {
      props: {
        isOpened: false,
        value: "",
      },
      slots: {
        button: "<div class='btn'> 213</div>",
        menu: '<div class="menu"> Menu div </div>',
      },
    });

    const button = wrapper.find('[class="btn"]');

    expect(button.exists()).toBe(true);

    const menu = wrapper.find('[class="menu"]');

    expect(menu.exists()).toBe(false);
  });

  it("updates values", async () => {
    const wrapper = mount(WrapperVue);

    // Text value

    const valueInput = wrapper.find('[type="number"]');
    const valueSpan = wrapper.find('[data-test="value"]');

    expect(valueInput.exists()).toBe(true);

    await valueInput.setValue("123");

    expect(valueSpan.text()).toBe("123");

    // Opener

    const button = wrapper.find('[data-test="opener"]');

    expect(button.exists()).toBe(true);

    const openedDiv = wrapper.find('[id="opened"]');

    expect(openedDiv.text()).toBe("closed");

    await button.trigger("click");

    expect(openedDiv.text()).toBe("opened");

    // Search value

    const search = wrapper.find('[type="search"]');
    const searchSpan = wrapper.find('[data-test="search"]');

    expect(search.exists()).toBe(true);

    await search.setValue("Something");

    expect(searchSpan.text()).toBe("Something");
  });
});
