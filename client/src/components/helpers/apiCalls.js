import axios from "axios";

import { ADMIN_LINK, INSTAGRAM_LINK } from "./constants";

// CORE CALL
const coreCall = axios.create({
  // baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const getAllData = () => coreCall.get(ADMIN_LINK);
export const getInstagramFeed = () => coreCall.get(INSTAGRAM_LINK);
