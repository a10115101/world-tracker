export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

export const formatLanguage = (language) => {
  switch (language) {
    case "zh":
      return "Chinese";
    case "en":
      return "English";
  }
};

export const formatFriendship = (status) => {
  switch (status) {
    case 0:
      return "Not Friend";
    case 1:
      return "Requesting";
    case 2:
      return "Waiting for reply";
    case 3:
      return "Friend";
  }
};

export const formatFirstCharUpperCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
