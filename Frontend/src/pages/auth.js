// auth.js (utility file)

import Cookies from "js-cookie";

export const isAuthenticated = (req) => {
  // Check for the token in cookies
  const token = req ? Cookies.get("token", { headers: req.headers }) : Cookies.get("token");

  // Check if the token exists and is not expired
  // You may want to use a library like `jwt-decode` to decode and check the token expiration
  return token !== null && token !== undefined;
};
