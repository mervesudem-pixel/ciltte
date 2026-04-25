export function toTitleCase(value: string): string {
  return value
    .toLocaleLowerCase("tr")
    .replace(/(?:^|\s)\S/g, (ch) => ch.toLocaleUpperCase("tr"));
}
