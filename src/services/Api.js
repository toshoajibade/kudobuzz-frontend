import axios from "axios";

const Api = {
  instance() {
    const instance = axios.create({
      baseURL: process.env.VUE_APP_BACKEND_URL,
      timeout: 30000
    });
    return instance;
  }
};

export default Api;
