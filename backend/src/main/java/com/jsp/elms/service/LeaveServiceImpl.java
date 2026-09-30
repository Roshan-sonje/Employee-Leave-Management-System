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


    // APPLY LEAVE
    public LeaveRequest applyLeave(LeaveRequest leaveRequest) {

        Integer employeeId = leaveRequest.getEmployee().getId();

        Employee employee = employeeRepository
                .findById(employeeId)
                .orElseThrow();

        if (employee.getLeaveBalance() <= 0) {
            throw new RuntimeException("No Leave Balance Available");
        }

        leaveRequest.setEmployee(employee);
        leaveRequest.setStatus(LeaveStatus.PENDING);

        LeaveRequest saved = repository.save(leaveRequest);

        try {
            emailService.sendLeaveAppliedEmailToAdmin(
                    employee.getName(),
                    leaveRequest.getLeaveType().toString(),
                    leaveRequest.getStartDate().toString(),
                    leaveRequest.getEndDate().toString()
            );
        } catch (Exception e) {
            System.out.println(
                    "Leave application email failed: "
                    + e.getMessage()
            );
        }

        return saved;
    }


    // GET ALL LEAVES
    public List<LeaveRequest> getAllLeaves() {
        return repository.findAll();
    }


    // GET LEAVE BY ID
    public LeaveRequest getLeaveById(Integer id) {

        return repository.findById(id)
                .orElseThrow(
                        () -> new EmployeeNotFoundException(
                                "Employee Id Not Found"
                        )
                );
    }


    // REJECT LEAVE
    public LeaveRequest rejectLeave(Integer id) {

        LeaveRequest leave = repository
                .findById(id)
                .orElseThrow();

        leave.setStatus(LeaveStatus.REJECTED);

        LeaveRequest savedLeave = repository.save(leave);

        try {

            emailService.sendLeaveRejectedEmail(
                    leave.getEmployee().getEmail(),
                    leave.getEmployee().getName()
            );

        } catch (Exception e) {

            System.out.println(
                    "Rejection email failed: "
                    + e.getMessage()
            );
        }

        return savedLeave;
    }


    // APPROVE LEAVE
    public LeaveRequest approveLeave(Integer id) {

        System.out.println("APPROVE CLICKED");

        LeaveRequest leave = repository
                .findById(id)
                .orElse(null);

        if (leave == null) {
            return null;
        }

        Employee employee = leave.getEmployee();

        if (employee == null) {
            throw new RuntimeException(
                    "Employee not linked with leave request"
            );
        }

        System.out.println(
                "Employee = " + employee.getId()
        );

        System.out.println(
                "Balance Before = "
                + employee.getLeaveBalance()
        );


        long days = ChronoUnit.DAYS.between(
                leave.getStartDate(),
                leave.getEndDate()
        ) + 1;


        System.out.println(
                "Days = " + days
        );


        // CHECK LEAVE BALANCE
        if (employee.getLeaveBalance() < days) {

            throw new RuntimeException(
                    "Insufficient Leave Balance"
            );
        }


        // REDUCE LEAVE BALANCE
        employee.setLeaveBalance(
                employee.getLeaveBalance()
                        - (int) days
        );


        System.out.println(
                "Balance After = "
                + employee.getLeaveBalance()
        );


        // CHANGE STATUS
        leave.setStatus(
                LeaveStatus.APPROVED
        );


        // SAVE EMPLOYEE BALANCE
        employeeRepository.save(employee);


        // SAVE APPROVED LEAVE
        LeaveRequest savedLeave =
                repository.save(leave);


        /*
         * Send email AFTER database update.
         * If email fails, approval will still remain saved.
         */
        try {

            emailService.sendLeaveApprovedEmail(
                    employee.getEmail(),
                    employee.getName()
            );

        } catch (Exception e) {

            System.out.println(
                    "Approval email failed: "
                    + e.getMessage()
            );
        }


        return savedLeave;
    }


    // GET EMPLOYEE LEAVE HISTORY
    public List<LeaveRequest> getLeaveHistory(
            Integer employeeId) {

        return repository.findByEmployeeId(
                employeeId
        );
    }

}
