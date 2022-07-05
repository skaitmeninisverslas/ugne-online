// API endpoints

// INSTAGRAM API
const access_token = process.env.REACT_APP_INSTAGRAM_TOKEN;
const user_id = process.env.REACT_APP_INSTAGRAM_USER_ID;
export const API_BASE = process.env.REACT_APP_API_BASE_URL;
export const INSTAGRAM_LINK = `https://graph.instagram.com/v11.0/${user_id}/media?fields=media_url,permalink&access_token=${access_token}`;

// HELPERS
export const itemNameFromLink = (location) =>
  location.pathname.replace(/^\/[\w\d]+\//, "");

export const setLocalStorageForComponent = () => {
  const savedComponent = localStorage.getItem("component");
  const initialValue = JSON.parse(savedComponent);
  return initialValue || "posts";
};

export const commentDate = (date) =>
  new Date(date).toLocaleString("en-gb", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
export const postDate = (date) =>
  new Date(date).toLocaleString("en-gb", {
    month: "short",
    day: "numeric",
  });

// IMAGES
export const getFileFromInput = (event) => event.currentTarget.files[0];
export const createUrlForLocalImage = (item) => URL.createObjectURL(item);
export const trimmedLocalImageUrl = (item) =>
  createUrlForLocalImage(item).substring(5);
export const bufferImageToString = (mimetype, image) =>
  `data:image/webp;base64,${new Buffer.from(image).toString("base64")}`;
