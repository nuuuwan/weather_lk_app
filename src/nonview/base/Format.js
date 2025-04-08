export default class Format {
  static percent(n, d) {
    if (n === 0) {
      return "-";
    }
    return `${Math.round((n / d) * 100)}%`;
  }
}
