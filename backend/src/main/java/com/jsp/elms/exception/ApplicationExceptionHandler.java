package com.jsp.elms.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.jsp.elms.util.ResponseStructure;

@RestControllerAdvice
public class ApplicationExceptionHandler {
	@ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<ResponseStructure<String>>
    handleEmployeeNotFound(EmployeeNotFoundException ex){

        ResponseStructure<String> structure =
                new ResponseStructure<>();

        structure.setStatusCode(HttpStatus.NOT_FOUND.value());
        structure.setMessage(ex.getMessage());
        structure.setData("Employee Not Found");

        return new ResponseEntity<>(
                structure,
                HttpStatus.NOT_FOUND);
    }
}
