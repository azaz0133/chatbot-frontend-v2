import jwt from "jsonwebtoken";

export function cAuth() {
  const token = window.localStorage.getItem("auth");
  if (!token) {
    return false;
  } else {
    return jwt.decode(token)["username"];
  }
}
