export const formatDate = (date) => {
  if (!date) return;

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

export const formatLanguage = (language) => {
  if (!language) return;

  switch (language) {
    case "zh":
      return "Chinese";
    case "en":
      return "English";
  }
};

export const formatFriendship = (status) => {
  if (status === undefined || status === null) return;

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
  if (!str) return;

  return str.charAt(0).toUpperCase() + str.slice(1);
};
