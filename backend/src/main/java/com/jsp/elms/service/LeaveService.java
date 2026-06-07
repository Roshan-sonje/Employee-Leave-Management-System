package com.jsp.elms.service;

import java.util.List;

import com.jsp.elms.entity.LeaveRequest;

public interface LeaveService {
	public LeaveRequest applyLeave(LeaveRequest leaveRequest);

    public List<LeaveRequest> getAllLeaves();

    public LeaveRequest getLeaveById(Integer id);
    
    public LeaveRequest approveLeave(Integer id);

    public LeaveRequest rejectLeave(Integer id);
    
    public List<LeaveRequest> getLeaveHistory(Integer employeeId);
    
//    public LeaveRequest approveLeave(Integer id);
}
