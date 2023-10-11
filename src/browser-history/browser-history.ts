import Stack from '../stack';

/**
 * @see https://leetcode.com/problems/design-browser-history/description/
 */
class BrowserHistory {
  private _stackBack: Stack<string>;

  private stackForward = new Stack<string>();

  constructor(homepage: string) {
    this._stackBack = new Stack([homepage]);
  }

  public get current(): string {
    return this._stackBack.peek()!;
  }

  public visit = (url: string): void => {
    this._stackBack.push(url);
    this.stackForward = new Stack<string>();
  };

  public back = (steps: number): string => {
    let curr = steps;

    while (this._stackBack.size > 1 && curr > 0) {
      const url = this._stackBack.pop()!;
      this.stackForward.push(url);
      curr--;
    }

    return this._stackBack.peek()!;
  };

  public forward = (steps: number): string => {
    let curr = steps;

    while (this.stackForward.size && curr) {
      const url = this.stackForward.pop()!;
      this._stackBack.push(url);
      curr--;
    }

    return this._stackBack.peek()!;
  };
}

export default BrowserHistory;
