import api from "./axios";

export const getIssues = (data) => {
    return api.post("/downtime/getIssues",data);
};