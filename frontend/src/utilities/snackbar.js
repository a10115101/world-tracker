export const options = (state) => {
  return {
    variant: `${state}`,
    preventDuplicate: true,
    autoHideDuration: 2000,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
  };
};
