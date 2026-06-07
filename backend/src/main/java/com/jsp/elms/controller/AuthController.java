package com.jsp.elms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jsp.elms.dto.LoginRequest;
import com.jsp.elms.entity.Employee;
import com.jsp.elms.repository.EmployeeRepository;
import com.jsp.elms.service.EmailService;
import com.jsp.elms.service.OtpService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	private EmployeeRepository repository;
	
	@Autowired
    private OtpService otpService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-otp")
    public String sendOtp(
            @RequestParam String email) {

        Employee employee =
                repository.findByEmail(email);

        if(employee == null) {
            throw new RuntimeException(
                    "Email Not Registered");
        }

        String otp =
                otpService.generateOtp(email);

        emailService.sendOtp(email, otp);

        return "OTP Sent Successfully";
    }

	@PostMapping("/login")
	public Employee login(@RequestBody LoginRequest request) {

		Employee employee = repository.findByEmail(request.getEmail());

		if (employee != null && employee.getPassword().equals(request.getPassword())) {

			return employee;
		}

		throw new RuntimeException("Invalid Credentials");
	}
	
	@PostMapping("/verify-otp")
	public String verifyOtp(
	        @RequestParam String email,
	        @RequestParam String otp) {

	    if(otpService.verifyOtp(email, otp)) {

	        return "OTP Verified";

	    }

	    throw new RuntimeException(
	            "Invalid OTP"
	    );
	}
	
	
	@PutMapping("/reset-password")
	public String resetPassword(
	        @RequestParam String email,
	        @RequestParam String password) {

	    Employee employee =
	            repository.findByEmail(email);

	    if(employee == null) {
	        throw new RuntimeException(
	                "Email Not Found");
	    }

	    employee.setPassword(password);

	    repository.save(employee);

	    emailService.sendPasswordUpdatedEmail(email);

	    return "Password Updated Successfully";
	}
}
