import api from "./axios";

export const loginUser = async ({ role, password }) => {
    const response = await api.post("/auth/login", {
        role,
        password
    });

    return response.data;
};

export const logoutUser = async () => {
    const response = await api.post("/auth/logout");
}