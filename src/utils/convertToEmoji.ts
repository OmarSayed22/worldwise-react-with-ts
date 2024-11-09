export function convertToEmoji(countryCode: string) {
  if (countryCode === undefined) {
    return "";
  }
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => char.charCodeAt(0) + 127397);
  return String.fromCodePoint(...codePoints);
}
