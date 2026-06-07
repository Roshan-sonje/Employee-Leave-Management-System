import API from "./ApiService";

export const applyLeave = (leaveData) => {
  return API.post("/leave", leaveData);
};

export const getLeaveHistory = (id) => {
    return API.get(`/leave/employee/${id}`);
};

export const getAllLeaves = () => {
    return API.get("/leave");
};

export const approveLeave = (id) => {
    return API.put(`/leave/approve/${id}`);
};

export const rejectLeave = (id) => {
    return API.put(`/leave/reject/${id}`);
};