import api from "./axios";

export const getProductionDetails = (date) => {
    return api.post("/prod/productionDetails",date);
};

export const saveProduction = (data) => {
    return api.post("/prod/insertProductionDetails", data);
};

export const updateProduction = (data) => {
    return api.post("/prod/updateProductionDetails", data);
};