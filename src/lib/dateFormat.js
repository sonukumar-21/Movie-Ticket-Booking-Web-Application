export const dateFormat = (date) => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) return "Invalid Date";

  return parsedDate.toLocaleString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
