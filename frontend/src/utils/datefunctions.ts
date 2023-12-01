export function getYMDString(date: Date): string {
  return date.toISOString().split("T")[0];
}
