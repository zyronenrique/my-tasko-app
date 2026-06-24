export function formatUserDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })} ${date.toLocaleDateString("en-US", { weekday: "short" })}`;
}
