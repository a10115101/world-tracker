export const updateLocalStorage = (newUpadte) => {
  let newData = {};
  const oldData = JSON.parse(localStorage.getItem("user"));
  newData = { ...oldData };
  newData.user = { ...newUpadte.data.data.update };
  localStorage.setItem("user", JSON.stringify(newData));
};
