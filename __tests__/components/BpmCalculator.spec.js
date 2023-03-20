import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";

import { createVuetify } from "vuetify";
import BpmCalculator from "@/components/BpmCalculator.vue";

describe("BPM Comonent", () => {
  const vuetify = createVuetify();
  let wrapper;
  const createComponent = () =>
    (wrapper = mount(BpmCalculator, {
      global: {
        plugins: [vuetify],
      },
    }));

  const findBpmDecrementBtn = () => wrapper.find('[data-testid="bpm"] > .v-input__prepend > i');
  const findBpmInput = () => wrapper.find('[data-testid="bpm"] input');
  const findBpmIncrementBtn = () => wrapper.find('[data-testid="bpm"] > .v-input__append > i');
  const findMsTd = (varint, i) => wrapper.find(`[data-testid="ms${varint}-${i}"]`);
  
  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders Correctly", async () => {
    expect(BpmCalculator).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
    expect(findBpmInput().element.value).toBe("60");
  });

  it("bpm input is empty on focus", async () => {
    await findBpmInput().trigger('focus');
    expect(findBpmInput().element.value).toBe("");
  });

  it.each`
    a             | expected
    ${0}          | ${"0,00 ms"}
    ${null}       | ${"0,00 ms"}
    ${undefined}  | ${"0,00 ms"}
    ${'someText'} | ${"0,00 ms"}
  `("renders $expected when bpm is $a", async ({ a, expected }) => {
    await findBpmInput().setValue(a);

    expect(findMsTd("n", 0).text()).toBe(expected);
    expect(findMsTd("d", 0).text()).toBe(expected);
    expect(findMsTd("t", 0).text()).toBe(expected);
  });

  it("decrements bpm", async () => {
    await findBpmDecrementBtn().trigger("click");
    expect(findBpmInput().element.value).toBe("59");
  });

  it("increments bpm", async () => {
    await findBpmIncrementBtn().trigger("click");
    expect(findBpmInput().element.value).toBe("61");
  });

  it("bpm value 60 calculates correct milliseconds", async () => {
    expect(findMsTd("n", 0).text()).toBe("4.000,00 ms");
    expect(findMsTd("d", 0).text()).toBe("6.000,00 ms");
    expect(findMsTd("t", 0).text()).toBe("2.666,67 ms");
  });

  it("bpm value 100 calculates correct milliseconds", async () => {
    await findBpmInput().setValue(100);

    expect(findMsTd("n", 4).text()).toBe("150,00 ms");
    expect(findMsTd("d", 4).text()).toBe("225,00 ms");
    expect(findMsTd("t", 4).text()).toBe("100,00 ms");
  });
});
