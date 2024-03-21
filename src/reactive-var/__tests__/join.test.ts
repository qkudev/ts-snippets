import join from '../join';
import reactiveVar from '../reactive-var';

describe('join', () => {
  it('should join 2 values', () => {
    const $price = reactiveVar(2);
    const $currency = reactiveVar('usd');

    const $priceString = join(
      [$price, $currency] as const,
      (price, currency) => `${price} ${currency}`
    );

    expect($priceString()).toBe('2 usd');
  });

  it('should be sealed', () => {
    const $price = reactiveVar(2);
    const $currency = reactiveVar('usd');
    const $priceString = join(
      [$price, $currency] as const,
      (price, currency) => `${price} ${currency}`
    );

    $priceString('123');

    expect($priceString()).toBe('2 usd');
  });

  it('should handle original updates', () => {
    const $price = reactiveVar(2);
    const $currency = reactiveVar('usd');
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
    const $price = reactiveVar(2);
    const $currency = reactiveVar('usd');
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
    const $var1 = reactiveVar(1);
    const $var2 = reactiveVar('string');
    const $var3 = reactiveVar(true);
    const $var4 = reactiveVar(null);
    const $var5 = reactiveVar({});

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
