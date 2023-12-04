import Axios from "./Axios";

export const authRegister = async (data) => {
  try {
    const res = await Axios.post("/register", data);
    localStorage.setItem("access_token", res?.access_token);
    localStorage.setItem("userData", JSON.stringify(res?.user));
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const authLogin = async (data) => {
  try {
    const res = await Axios.post("/login", data);

    localStorage.setItem("access_token", res?.access_token);
    localStorage.setItem("userData", JSON.stringify(res?.user));
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProfile = async () => {
  try {
    const res = await Axios.get("/profile");
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};
