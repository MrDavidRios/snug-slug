export function getYMDString(date?: Date): string {
  return date ? date.toISOString().split("T")[0] : "";
}
