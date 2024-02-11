const isUpperCased = (c: string) => c.toUpperCase() === c;

const rot13 = (n: number) => {
  if (n < 0) {
    throw new Error('Rotation should be positive number');
  }

  return (s: string): string => {
    const start = 97;
    const end = 122;
    const d = end - start;

    const rotChar = (char: string) => {
      const c = char.toLowerCase();
      if (c.charCodeAt(0) < start || c.charCodeAt(0) > end) {
        return c;
      }

      let idx = c.charCodeAt(0) + (n % d);
      while (idx > end) {
        idx -= d;
      }

      const rotated = String.fromCharCode(idx);
      return isUpperCased(char) ? rotated.toUpperCase() : rotated;
    };

    return s.split('').map(rotChar).join('');
  };
};

export default rot13;
