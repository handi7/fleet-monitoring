import Axios from "./Axios";

export const getMonitoringGroups = async () => {
  try {
    const res = await Axios.get("/vessel-groups");
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getMonitoringGroup = async (id) => {
  try {
    const res = await Axios.get(`/vessel-groups/${id}`);
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};
