//@ts-ignore

import { mount } from "@vue/test-utils";

import { useExchangerStore } from "../store/useExchangerStore/useExchangerStore";
import ExchangeSenderVue from "./ExchangeSender.vue";

import { createTestingPinia } from "@pinia/testing";

describe("exchange sender", () => {
  it("shows error", async () => {
    const wrapper = mount(ExchangeSenderVue, {
      global: { plugins: [createTestingPinia()] },
    });
    const store = useExchangerStore();

    const strong = wrapper.find("strong");
    const button = wrapper.find("button");

    expect(strong.exists()).toBe(false);
    expect(button.element.disabled).toBe(false);

    store.warning = "somethin";

    await new Promise((r) => setTimeout(r, 1000));

    const newStrong = wrapper.find("strong");
    const newBtn = wrapper.find("button");

    expect(newStrong.text()).toBe("This pair is disabled now");
    expect(newBtn.element.disabled).toBe(true);
  });
});
