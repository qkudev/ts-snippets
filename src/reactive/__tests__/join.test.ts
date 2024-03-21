import join from '../join';
import reactive from '../reactive';

describe('join', () => {
  it('should join 2 values', () => {
    const $price = reactive(2);
    const $currency = reactive('usd');

    const $priceString = join(
      [$price, $currency] as const,
      (price, currency) => `${price} ${currency}`
    );

    expect($priceString()).toBe('2 usd');
  });

  it('should be sealed', () => {
    const $price = reactive(2);
    const $currency = reactive('usd');
    const $priceString = join(
      [$price, $currency] as const,
      (price, currency) => `${price} ${currency}`
    );

    $priceString('123');

    expect($priceString()).toBe('2 usd');
  });

  it('should handle original updates', () => {
    const $price = reactive(2);
    const $currency = reactive('usd');
    const $priceString = join(
      [$price, $currency] as const,
      (price, currency) => `${price} ${currency}`
    );

    $price(4);

    expect($priceString()).toBe('4 usd');

    $currency('eur');

    expect($priceString()).toBe('4 eur');
  });

  it('should call listener', () => {
    const $price = reactive(2);
    const $currency = reactive('usd');
    const $priceString = join(
      [$price, $currency] as const,
      (price, currency) => `${price} ${currency}`
    );
    const listener = jest.fn();
    $priceString.onChange(listener);

    $price(4);

    expect(listener).toHaveBeenCalledWith('4 usd');
  });

  it('should join 5 variables', () => {
    const $var1 = reactive(1);
    const $var2 = reactive('string');
    const $var3 = reactive(true);
    const $var4 = reactive(null);
    const $var5 = reactive({});

    const $joined = join(
      [$var1, $var2, $var3, $var4, $var5] as const,
      (var1, var2, var3, var4, var5) => ({
        var1,
        var2,
        var3,
        var4,
        var5,
      })
    );

    expect($joined()).toBeDefined();
  });
});
