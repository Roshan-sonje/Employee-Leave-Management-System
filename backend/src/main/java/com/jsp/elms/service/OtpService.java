package com.jsp.elms.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class OtpService {
	 private Map<String, String> otpStore = new HashMap<>();

	    public String generateOtp(String email) {

	        String otp =
	                String.valueOf(
	                        (int)(Math.random() * 900000) + 100000
	                );

	        otpStore.put(email, otp);

	        return otp;
	    }

	    public boolean verifyOtp(String email, String otp) {

	        return otp.equals(otpStore.get(email));

	    }
}
