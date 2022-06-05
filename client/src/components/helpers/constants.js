// API endpoints
export const ADMIN_LINK = "/api/data";
// INSTAGRAM API
const access_token = process.env.REACT_APP_INSTAGRAM_TOKEN;
const user_id = process.env.REACT_APP_INSTAGRAM_USER_ID;
export const INSTAGRAM_LINK = `https://graph.instagram.com/v11.0/${user_id}/media?fields=media_url,permalink&access_token=${access_token}`;

// HELPERS
export const itemNameFromLink = (location) =>
  location.pathname.replace(/^\/[\w\d]+\//, "");

export const setLocalStorageForComponent = () => {
  const savedComponent = localStorage.getItem("component");
  const initialValue = JSON.parse(savedComponent);
  return initialValue || "posts";
};

export const getFileFromInput = (event) => event.currentTarget.files[0];
export const createUrlForLocalImage = (item) => URL.createObjectURL(item);
export const trimmedLocalImageUrl = (item) =>
  createUrlForLocalImage(item).substring(5);
