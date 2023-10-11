import AutocompleteSystem from '../autocomplete-system';

describe('AutocompleteSystem', () => {
  const inputs = ['i love you', 'island', 'iroman', 'i love leetcode'];
  const times = [5, 3, 2, 2];

  it('should return top 3', () => {
    const autocomplete = new AutocompleteSystem(inputs, times);
    let result: string[] = [];

    result = autocomplete.input('i');
    expect(result).toEqual(['i love you', 'island', 'i love leetcode']);

    result = autocomplete.input(' ');
    expect(result).toEqual(['i love you', 'i love leetcode']);

    result = autocomplete.input('l');
    result = autocomplete.input('o');
    result = autocomplete.input('v');
    result = autocomplete.input('e');
    expect(result).toEqual(['i love you', 'i love leetcode']);

    result = autocomplete.input(' ');
    result = autocomplete.input('l');
    expect(result).toEqual(['i love leetcode']);
  });
});
