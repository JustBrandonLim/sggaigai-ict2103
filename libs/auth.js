import { hasCookie, getCookie } from "cookies-next";

export function getLoggedIn() {
  return hasCookie("userData");
}

export function getUserData() {
  if (!getLoggedIn()) return false;

  return JSON.parse(getCookie("userData"));
}
