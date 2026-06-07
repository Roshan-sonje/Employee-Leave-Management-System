package com.jsp.elms.repository;

import java.util.List;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jsp.elms.entity.LeaveRequest;
import com.jsp.elms.entity.LeaveStatus;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Integer>{
	long countByStatus(LeaveStatus status);
	List<LeaveRequest> findByEmployeeId(Integer id);
	
}
