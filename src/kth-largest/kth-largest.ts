class KthLargest {
  list: number[];

  k: number;

  constructor(k: number, nums: number[]) {
    this.list = nums.sort((a, b) => b - a);
    this.k = k;
  }

  add(val: number): number {
    let left = 0;
    let right = this.list.length;

    while (left < right) {
      // eslint-disable-next-line no-bitwise
      const mid = (left + right) >> 1;
      if (this.list[mid] > val) left = mid + 1;
      else right = mid;
    }

    this.list.splice(left, 0, val);
    return this.list[this.k - 1];
  }
}

export default KthLargest;
