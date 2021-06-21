export function generateRegex(terms: string): string {
  const keywords = terms.split(" ");

  // mysql regex is case insensitive
  const generateRegex = (keywords: string[]) =>
    keywords
      .map((key) => "(?=.*" + key + ".*)")
      .reduce((key, acc) => key + acc);

  return generateRegex(keywords);
}
