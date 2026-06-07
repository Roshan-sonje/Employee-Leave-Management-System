package com.jsp.elms.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jsp.elms.entity.LeaveStatus;
import com.jsp.elms.repository.EmployeeRepository;
import com.jsp.elms.repository.LeaveRequestRepository;

@RestController
public class DashboardController {
	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private LeaveRequestRepository leaveRepository;

	@GetMapping("/dashboard")
	public Map<String, Object> dashboard() {

		Map<String, Object> map = new HashMap<>();

		map.put("totalEmployees", employeeRepository.count());
		map.put("totalLeaves", leaveRepository.count());
		map.put("approvedLeaves",
		        leaveRepository.countByStatus(LeaveStatus.APPROVED));

		map.put("rejectedLeaves",
		        leaveRepository.countByStatus(LeaveStatus.REJECTED));

		map.put("pendingLeaves",
		        leaveRepository.countByStatus(LeaveStatus.PENDING));

		return map;
	}
}
