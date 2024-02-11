class TinyURL {
  private alphabet =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  // database abstraction
  private db = new Map<string, string>();

  constructor(public readonly linkLength: number) {}

  public encode(url: string): string {
    let key = this.generateRandom();
    while (this.db.has(key)) {
      key = this.generateRandom();
    }

    this.db.set(key, url);

    return key;
  }

  public decode(key: string): string | null {
    return this.db.get(key) ?? null;
  }

  private generateRandom() {
    const s: string[] = [];

    for (let i = 0; i < this.linkLength; i++) {
      const randomChar =
        this.alphabet[Math.floor(Math.random() * this.alphabet.length)];
      s.push(randomChar);
    }

    return s.join('');
  }
}

export default TinyURL;
