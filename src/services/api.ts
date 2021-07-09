import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

const signOut = () => {
  localStorage.removeItem("@HavanLabs:token");
  document.location.href = "/";
};

api.interceptors.response.use(
  (response) => {
    if (response?.data?.errors) {
      const error = response.data.errors[0];
      if (error.extensions.code === "AUTH_NOT_AUTHENTICATED") {
        signOut();
      }
    }
    if (response?.request?.response.includes("Acesso não autorizado")) {
      signOut();
    }
    return response;
  },
  (error: Error) => {
    if (error.message === "Network Error") {
      signOut();
    }
    return Promise.reject(error);
  }
);

export default api;
