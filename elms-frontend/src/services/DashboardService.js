import API from "./ApiService";

export const getDashboardData = () => {
    return API.get("/dashboard");
};