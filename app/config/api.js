import Cookie from "js-cookie";
import axios from "axios";

const userService = axios.create({
  baseURL: 'http://localhost:3002'
})
userService.interceptors.request.use((req) => {
  // custom req
  const token = Cookie.get("jwt");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


export const signIn = (data) => userService.post("/auth/sign-in", data);
export const signUp = (data) => userService.post("/auth/sign-up", data);
export const verify = (data) => userService.post("/auth/verify-OTP", data);

export const getCurrentUser = () => userService.get("/user/me");
