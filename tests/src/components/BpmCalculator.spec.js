import { createVuetify } from "vuetify";
import { describe, it, expect } from "vitest";
// import { mount, expect } from "@vue/test-utils";
import BpmCalculator from "@/components/BpmCalculator.vue";

describe("suite", () => {
  it("serial test", async () => {
    const vuetify = createVuetify();
    expect(BpmCalculator).toBeTruthy();

    // const wrapper = mount(BpmCalculator, {
    //   props: {},
    //   global: {
    //     plugins: [vuetify],
    //   },
    // });
    // expect(wrapper.html()).toMatchSnapshot();
  });
});
