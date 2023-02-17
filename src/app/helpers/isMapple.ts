export function isMappable(array: object[]): boolean {
  if (Array.isArray(array)) return array.length > 0
  return false
}
