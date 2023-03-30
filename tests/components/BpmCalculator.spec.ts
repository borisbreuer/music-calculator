import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";

import { createVuetify } from "vuetify";
import { createI18n, IntlNumberFormat } from 'vue-i18n';
import messages from "@intlify/unplugin-vue-i18n/messages";

// import numberFormats from "../mocks/numberFormats" 
import numberFormats from "@/i18n/numberFormats";

import BpmCalculator from "@/components/BpmCalculator.vue";

const vuetify = createVuetify();
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en",
  fallbackLocale: "en",
  availableLocales: ["en", "de"],
  messages,
  numberFormats,
});

const window = global

const mockTfn = vi.fn((t: string): string => t)
const mockNfn = vi.fn((n: number) => n.toLocaleString('en', numberFormats.en.decimal ))

describe("BPM Comonent", () => {
  let wrapper: VueWrapper<any>;

  const findBpmTabTempoBtn = () => wrapper.find('[data-testid="tabtempo"]');
  const findBpmDecrementBtn = () => wrapper.find('[data-testid="bpm"] > .v-input__prepend > i');
  const findBpmInput = () => wrapper.find<HTMLInputElement>('[data-testid="bpm"] input');
  const findBpmIncrementBtn = () => wrapper.find('[data-testid="bpm"] > .v-input__append > i');
  const findMsTd = (varint: string, i: number) => wrapper.find(`[data-testid="ms${varint}-${i}"]`);

  beforeEach(() => { 
    wrapper = mount(BpmCalculator, {
      global: {
        plugins: [
          vuetify,
          i18n
        ],
        mocks: {
          window,
          $t: mockTfn,
          $n: mockNfn
        }
      },
    })
  });
  afterEach(() => {
    wrapper.unmount()
  });

  it("renders Correctly", async () => {
    expect(BpmCalculator).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot('Initial');
    expect(findBpmInput().element.value).toBe("120");
  });

  it('calculates bpm by tap on btn', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(1000)
    await findBpmTabTempoBtn().trigger('click')
    vi.setSystemTime(1600)
    await findBpmTabTempoBtn().trigger('click')
    expect(findBpmInput().element.value).toBe('100.00')
    expect(wrapper.html()).toMatchSnapshot('tabTempo')
    vi.useRealTimers()
  })

  it('calculates bpm by 5x tap on btn', async () => {
    vi.useFakeTimers()

    vi.setSystemTime(1000)
    await findBpmTabTempoBtn().trigger('click')
    vi.setSystemTime(1600)
    await findBpmTabTempoBtn().trigger('click')

    vi.setSystemTime(1000)
    await findBpmTabTempoBtn().trigger('click')
    vi.setSystemTime(1600)
    await findBpmTabTempoBtn().trigger('click')

    vi.setSystemTime(1000)
    await findBpmTabTempoBtn().trigger('click')
    vi.setSystemTime(1600)
    await findBpmTabTempoBtn().trigger('click')

    vi.setSystemTime(1000)
    await findBpmTabTempoBtn().trigger('click')
    vi.setSystemTime(1600)
    await findBpmTabTempoBtn().trigger('click')

    vi.setSystemTime(1000)
    await findBpmTabTempoBtn().trigger('click')
    vi.setSystemTime(1600)
    await findBpmTabTempoBtn().trigger('click')

    expect(findBpmInput().element.value).toBe('100.00')
    expect(wrapper.html()).toMatchSnapshot('tabTempo5x')
    vi.useRealTimers()
  })

  it('calculates bpm by 5x tap on btn < 2000', async () => {
    vi.useFakeTimers()

    vi.setSystemTime(5000)
    await findBpmTabTempoBtn().trigger('click')
    vi.setSystemTime(5200)
    await findBpmTabTempoBtn().trigger('click')

    vi.setSystemTime(4000)
    await findBpmTabTempoBtn().trigger('click')
    vi.setSystemTime(4200)
    await findBpmTabTempoBtn().trigger('click')

    vi.setSystemTime(3000)
    await findBpmTabTempoBtn().trigger('click')
    vi.setSystemTime(3200)
    await findBpmTabTempoBtn().trigger('click')

    vi.setSystemTime(2000)
    await findBpmTabTempoBtn().trigger('click')
    vi.setSystemTime(2200)
    await findBpmTabTempoBtn().trigger('click')

    vi.setSystemTime(1000)
    await findBpmTabTempoBtn().trigger('click')
    vi.setSystemTime(1200)
    await findBpmTabTempoBtn().trigger('click')

    expect(findBpmInput().element.value).toBe('300.00')
    expect(wrapper.html()).toMatchSnapshot('tabTempo5x<2000')
    vi.useRealTimers()
  })

  it("bpm input is empty on focus", async () => {
    await findBpmInput().trigger('focus')
    expect(findBpmInput().element.value).toBe("120")
  });

  it.each`
    a             | expected
    ${0}          | ${"0.00 ms"}
    ${null}       | ${"0.00 ms"}
    ${undefined}  | ${"0.00 ms"}
    ${'someText'} | ${"0.00 ms"}
  `("renders $expected when bpm is $a", async ({ a, expected }) => {
    await findBpmInput().setValue(a);

    expect(findMsTd("n", 0).text()).toBe(expected);
    expect(findMsTd("d", 0).text()).toBe(expected);
    expect(findMsTd("t", 0).text()).toBe(expected);
  });

  it("decrements bpm", async () => {
    await findBpmDecrementBtn().trigger("click");
    expect(findBpmInput().element.value).toBe("119");
  });

  it("increments bpm", async () => {
    await findBpmIncrementBtn().trigger("click");
    expect(findBpmInput().element.value).toBe("121");
  });

  it("bpm value 60 calculates correct milliseconds", async () => {
    await findBpmInput().setValue(60);

    expect(findMsTd("n", 0).text()).toBe("4,000.00 ms");
    expect(findMsTd("d", 0).text()).toBe("6,000.00 ms");
    expect(findMsTd("t", 0).text()).toBe("2,666.67 ms");
  });

  it("bpm value 100 calculates correct milliseconds", async () => {
    await findBpmInput().setValue(100);

    expect(findMsTd("n", 4).text()).toBe("150.00 ms");
    expect(findMsTd("d", 4).text()).toBe("225.00 ms");
    expect(findMsTd("t", 4).text()).toBe("100.00 ms");
  });
});
