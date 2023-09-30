export const setLoacalStorage = (input) => {
  localStorage.setItem("user", JSON.stringify(input));
};

export const updateLocalStorage = (newUpadte) => {
  let newData = {};
  const oldData = JSON.parse(localStorage.getItem("user"));
  newData = { ...oldData };
  newData.user = { ...newUpadte.data.data.update };
  localStorage.setItem("user", JSON.stringify(newData));
};

export const clearLocalStorage = () => {
  localStorage.removeItem("user");
};

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export const checkToken = () => {
  let token = "";

  if (localStorage.getItem("user")) token = getCurrentUser().token;

  return {
    headers: { Authorization: token },
    withCredentials: true,
  };
};
