package com.jsp.elms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	@Autowired
	private JavaMailSender mailSender;

	public void sendOtp(String email, String otp) {

		SimpleMailMessage message = new SimpleMailMessage();

		message.setTo(email);

		message.setSubject("ELMS Password Reset OTP");

		message.setText("Your OTP is : " + otp);

		mailSender.send(message);
	}
	
	public void sendPasswordUpdatedEmail(String email) {

	    SimpleMailMessage message =
	            new SimpleMailMessage();

	    message.setTo(email);

	    message.setSubject(
	            "Password Updated Successfully");

	    message.setText(
	            "Hello,\n\n" +
	            "Your ELMS account password has been updated successfully.\n\n" +
	            "If you did not make this change, please contact the administrator.\n\n" +
	            "Regards,\n" +
	            "ELMS Team"
	    );

	    mailSender.send(message);
	}
	
	
	public void sendLeaveAppliedEmailToAdmin(
	        String employeeName,
	        String leaveType,
	        String startDate,
	        String endDate) {

	    SimpleMailMessage message =
	            new SimpleMailMessage();

	    message.setTo("admin@gmail.com");

	    message.setSubject(
	            "New Leave Request Received");

	    message.setText(
	            "Employee : " + employeeName + "\n" +
	            "Leave Type : " + leaveType + "\n" +
	            "From : " + startDate + "\n" +
	            "To : " + endDate
	    );

	    mailSender.send(message);
	}
	
	public void sendLeaveApprovedEmail(
	        String employeeEmail,
	        String employeeName) {

	    SimpleMailMessage message =
	            new SimpleMailMessage();

	    message.setTo(employeeEmail);

	    message.setSubject(
	            "Leave Approved");

	    message.setText(
	            "Hello " + employeeName +
	            ",\n\nYour leave request has been APPROVED."
	    );

	    mailSender.send(message);
	}
	
	public void sendLeaveRejectedEmail(
	        String employeeEmail,
	        String employeeName) {

	    SimpleMailMessage message =
	            new SimpleMailMessage();

	    message.setTo(employeeEmail);

	    message.setSubject(
	            "Leave Rejected");

	    message.setText(
	            "Hello " + employeeName +
	            ",\n\nYour leave request has been REJECTED."
	    );

	    mailSender.send(message);
	}
}
