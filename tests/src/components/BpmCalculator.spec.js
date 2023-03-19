import { createVuetify } from "vuetify";
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BpmCalculator from "@/components/BpmCalculator.vue";

describe("BPM", () => {
  it("test", async () => {
    const vuetify = createVuetify();
    // expect(BpmCalculator).toBeTruthy();
    expect(1 + 1).toBe(2);

    const wrapper = mount(BpmCalculator, {
      props: {},
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
