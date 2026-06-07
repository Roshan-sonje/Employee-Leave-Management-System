package com.jsp.elms.exception;

public class EmployeeNotFoundException extends RuntimeException{
	public EmployeeNotFoundException(String message) {
        super(message);
    }
}
