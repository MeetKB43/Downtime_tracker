import api from "./axios";

export const getMachines = () => {
    return api.post("/downtime/getMachines");
};