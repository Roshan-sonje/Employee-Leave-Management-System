import API from "./ApiService";

export const getAllEmployees = () => {
    return API.get("/employee");
}

export const deleteEmployee = (id) => {
    return API.delete(`/employee/${id}`);
};

export const getEmployeeById = (id) => {
    return API.get(`/employee/${id}`);
};

export const updateEmployee = (employee) => {
    return API.put("/employee", employee);
};

export const saveEmployee = (employee) => {
    return API.post("/employee", employee);
};