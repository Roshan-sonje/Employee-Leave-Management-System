package com.jsp.elms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jsp.elms.entity.LeaveRequest;
import com.jsp.elms.service.LeaveService;

@RestController
@RequestMapping("/leave")
public class LeaveController {
	

	    @Autowired
	    private LeaveService service;

	    @PostMapping
	    public LeaveRequest applyLeave(@RequestBody LeaveRequest leaveRequest) {
	        return service.applyLeave(leaveRequest);
	    }

	    @GetMapping
	    public List<LeaveRequest> getAllLeaves() {
	        return service.getAllLeaves();
	    }

	    @GetMapping("/{id}")
	    public LeaveRequest getLeaveById(@PathVariable Integer id) {
	        return service.getLeaveById(id);
	    }
	    
	    @PutMapping("/approve/{id}")
	    public LeaveRequest approveLeave(@PathVariable Integer id) {
	        return service.approveLeave(id);
	    }

	    @PutMapping("/reject/{id}")
	    public LeaveRequest rejectLeave(@PathVariable Integer id) {
	        return service.rejectLeave(id);
	    }
	    
	    @GetMapping("/employee/{id}")
	    public List<LeaveRequest> getLeaveHistory(@PathVariable Integer id) {
	        return service.getLeaveHistory(id);
	    }
}
