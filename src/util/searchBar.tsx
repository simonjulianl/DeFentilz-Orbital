export function generateRegex(terms: string): string {
  const keywords = terms.split(" ");

  // mysql regex is case insensitive
  const generateRegex = (keywords: string[]) =>
    keywords
      .map((key) => "(?=.*" + key + ".*)")
      .reduce((key, acc) => key + acc);

  return generateRegex(keywords);
}

export function checkEmail(terms: string): boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(terms.toLowerCase());
}
