class TrieNode {
  constructor(
    public children: Map<string, TrieNode> = new Map(),
    public sentences: Map<string, number> = new Map()
  ) {}
}

/**
 * @see https://leetcode.com/problems/design-search-autocomplete-system/
 */
export class AutocompleteSystem {
  private root = new TrieNode();
  private currNode = this.root;
  private dead = new TrieNode();
  private state = '';

  constructor(sentences: string[], times: number[]) {
    for (let i = 0; i < sentences.length; i++) {
      this.addToTrie(sentences[i], times[i]);
    }
  }

  public addToTrie(sentence: string, count: number) {
    let node = this.root;
    for (const c of sentence.split('')) {
      if (!node.children.has(c)) {
        node.children.set(c, new TrieNode());
      }

      node = node.children.get(c) as TrieNode;
      node.sentences.set(sentence, (node.sentences.get(sentence) ?? 0) + count);
    }
  }

  public input(c: string): string[] {
    if (c === '#') {
      this.addToTrie(this.state, 1);
      this.state = '';
      this.currNode = this.root;

      return [];
    }

    this.state += c;
    if (!this.currNode.children.has(c)) {
      this.currNode = this.dead;

      return [];
    }

    this.currNode = this.currNode.children.get(c) as TrieNode;
    const sentences = [...this.currNode.sentences.keys()];
    sentences.sort((keyA, keyB) => {
      const hotA = this.currNode.sentences.get(keyA) as number;
      const hotB = this.currNode.sentences.get(keyB) as number;
      if (hotA === hotB) {
        return keyA.localeCompare(keyB);
      }

      return hotB - hotA;
    });

    const result: string[] = [];
    for (let i = 0; i < Math.min(3, sentences.length); i++) {
      result.push(sentences[i]);
    }

    return result;
  }
}
