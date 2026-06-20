import api from "./axios";

export const getPendingDowntimes = () => {
    return api.get("/downtime/pending");
};

export const insertDowntime = (data) => {
    return api.post("/downtime/insertDowntime",data);
}