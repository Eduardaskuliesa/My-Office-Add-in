export const formatDate = (dateString: string, locale: string = "lt-LT"): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
