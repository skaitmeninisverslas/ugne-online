// API endpoints
export const ADMIN_LINK = "/api/data";
export const SAVE_POST = "/api/users/login";

// HELPERS
export const itemNameFromLink = (location) =>
  location.pathname.replace(/^\/[\w\d]+\//, "");

export const setLocalStorageForComponent = () => {
  const savedComponent = localStorage.getItem("component");
  const initialValue = JSON.parse(savedComponent);
  return initialValue || "posts";
};
