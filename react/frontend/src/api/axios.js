import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.response.use(
    (response) => response,
    (error) => {

        if (error.response?.status === 401) {
            console.log(error.message);
            // clear any local state if needed
            localStorage.clear();

            // store message
            localStorage.setItem("auth_error", "Session expired");

            // redirect to login
            //window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);
export default api;