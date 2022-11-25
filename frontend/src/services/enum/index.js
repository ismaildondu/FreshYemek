const PAGES = {
  HOME: "/",
  AUTH: "/auth",
  RESTAURANTS: "/restaurants",
  RESTAURANT: "/restaurant/:slug",
  EXIT: "/exit",
};
const PROTECTED_TYPES = {
  ONLY_LOGGED_IN: "ONLY_LOGGED_IN",
  ONLY_GUETS: "ONLY_GUETS",
};
const AUTH_TYPES = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  EMAIL: "EMAIL",
  NO_INITIAL: false,
};

export default {
  PAGES,
  PROTECTED_TYPES,
  AUTH_TYPES,
};
