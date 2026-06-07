package com.jsp.elms.service;

import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jsp.elms.entity.Employee;
import com.jsp.elms.entity.LeaveRequest;
import com.jsp.elms.entity.LeaveStatus;
import com.jsp.elms.exception.EmployeeNotFoundException;
import com.jsp.elms.repository.EmployeeRepository;
import com.jsp.elms.repository.LeaveRequestRepository;

@Service
public class LeaveServiceImpl implements LeaveService {
	@Autowired
	private LeaveRequestRepository repository;

	@Autowired
	private EmailService emailService;

	@Autowired
	private EmployeeRepository employeeRepository;

	public LeaveRequest applyLeave(LeaveRequest leaveRequest) {
		Integer employeeId = leaveRequest.getEmployee().getId();

		Employee employee = employeeRepository.findById(employeeId).orElseThrow();

		if (employee.getLeaveBalance() <= 0) {
			throw new RuntimeException("No Leave Balance Available");
		}

		leaveRequest.setEmployee(employee);
		leaveRequest.setStatus(LeaveStatus.PENDING);

		LeaveRequest saved = repository.save(leaveRequest);

		emailService.sendLeaveAppliedEmailToAdmin(employee.getName(), leaveRequest.getLeaveType().toString(),
				leaveRequest.getStartDate().toString(), leaveRequest.getEndDate().toString());

		return saved;
	}

	public List<LeaveRequest> getAllLeaves() {
		return repository.findAll();
	}

	public LeaveRequest getLeaveById(Integer id) {
		return repository.findById(id).orElseThrow(() -> new EmployeeNotFoundException("Employee Id Not Found"));
	}

//    public LeaveRequest approveLeave(Integer id) {
//        LeaveRequest leave = repository.findById(id).orElse(null);
//
//        if (leave != null) {
//            leave.setStatus(LeaveStatus.APPROVED);
//            return repository.save(leave);
//        }
//
//        return null;
//    }

	public LeaveRequest rejectLeave(Integer id) {
		LeaveRequest leave = repository.findById(id).orElseThrow();

		leave.setStatus(LeaveStatus.REJECTED);
		
		emailService.sendLeaveRejectedEmail(
		        leave.getEmployee().getEmail(),
		        leave.getEmployee().getName()
		);

		return repository.save(leave);
	}

//	public LeaveRequest approveLeave(Integer id) {
//
//	    LeaveRequest leave = repository.findById(id).orElse(null);
//
//	    System.out.println("Leave = " + leave);
//
//	    if (leave != null) {
//
//	        Employee employee = leave.getEmployee();
//
//	        if(employee == null) {
//	            throw new RuntimeException("Employee not linked with leave request");
//	        }
//	        System.out.println("Employee = " + employee);
//
//	        long days = ChronoUnit.DAYS.between(
//	                leave.getStartDate(),
//	                leave.getEndDate()) + 1;
//
//	        System.out.println("Days = " + days);
//
//	        if (employee.getLeaveBalance() >= days) {
//
//	            leave.setStatus(LeaveStatus.APPROVED);
//
//	            employee.setLeaveBalance(
//	                    employee.getLeaveBalance() - (int) days);
//
//	            employeeRepository.save(employee);
//
//	            return repository.save(leave);
//	        }
//	    }
//
//	    return null;
//	}

	public LeaveRequest approveLeave(Integer id) {

		System.out.println("APPROVE CLICKED");

		LeaveRequest leave = repository.findById(id).orElse(null);

		if (leave != null) {

			Employee employee = leave.getEmployee();

			System.out.println("Employee = " + employee.getId());
			System.out.println("Balance Before = " + employee.getLeaveBalance());

			long days = ChronoUnit.DAYS.between(leave.getStartDate(), leave.getEndDate()) + 1;

			System.out.println("Days = " + days);

			employee.setLeaveBalance(employee.getLeaveBalance() - (int) days);

			System.out.println("Balance After = " + employee.getLeaveBalance());

			leave.setStatus(LeaveStatus.APPROVED);
			
			emailService.sendLeaveApprovedEmail(
			        employee.getEmail(),
			        employee.getName()
			);

			employeeRepository.save(employee);

			return repository.save(leave);
		}

		return null;
	}

	public List<LeaveRequest> getLeaveHistory(Integer employeeId) {
		return repository.findByEmployeeId(employeeId);
	}

}
