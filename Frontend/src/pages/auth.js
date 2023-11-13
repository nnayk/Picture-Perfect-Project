// auth.js (utility file)

export const isAuthenticated = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      // Check if the token exists and is not expired
      // You may want to use a library like `jwt-decode` to decode and check the token expiration
      return token !== null && token !== undefined;
    }
    return false;
  };
  