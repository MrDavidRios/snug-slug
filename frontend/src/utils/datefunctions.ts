export function getYMDString(date: Date | null): string {
  return date ? date.toISOString().split("T")[0] : "";
}

export function formatListingDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}
