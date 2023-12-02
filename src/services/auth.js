import Axios from "./Axios";

export const authRegister = async (data) => {
  try {
    await Axios.post("/register", data);
  } catch (error) {
    return Promise.reject(error);
  }
};
