import axios from "axios";

const API = axios.create({
    baseURL: "https://employee-leave-management-system-production-2ae8.up.railway.app"
});

export default API;
