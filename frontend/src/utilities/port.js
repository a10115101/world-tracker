export const frontendPort = (input) => {
  return `${import.meta.env.VITE_FRONTEND_PORT}/${input}`;
};

export const backendPort = (input) => {
  return `${import.meta.env.VITE_BACKEND_PORT}/${input}`;
};
