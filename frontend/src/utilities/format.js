export const formatDate = (formattedDate) => {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(formattedDate));
};

export const formatLanguage = (language) => {
  switch (language) {
    case "zh":
      return "Chinese";
    case "en":
      return "English";
  }
};

export const formatFirstCharUpperCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
