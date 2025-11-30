/**
 * Uppercases the first letter of each sentence.
 * Does NOT lowercase anything else.
 */
export function toSentenceCase(str: string): string {
  if (!str) return "";

  const out = str.replace(
    /(^\s*[a-zA-Z]|(?<=[\.\?\!]\s+)[a-zA-Z])/g,
    match => match.toUpperCase()
  );

  return out;
}