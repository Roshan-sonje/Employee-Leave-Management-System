import API from "./ApiService";
import axios from "axios";
export const login = (data) => {
    return API.post("/auth/login", data);
};

export const sendOtp = (email) => {
    return axios.post(
        `http://localhost:8080/auth/send-otp?email=${email}`
    );
};

export const verifyOtp = (email, otp) => {
    return axios.post(
        `http://localhost:8080/auth/verify-otp?email=${email}&otp=${otp}`
    );
};

export const resetPassword = (email, password) => {
    return axios.put(
        `http://localhost:8080/auth/reset-password?email=${email}&password=${password}`
    );
};