package com.jsp.elms.service;

import java.util.List;

import com.jsp.elms.entity.Employee;

public interface EmployeeService {

    public Employee saveEmployee(Employee employee);

    public List<Employee> getAllEmployees();

    public Employee getEmployeeById(Integer id);

    public Employee updateEmployee(Employee employee);

    public void deleteEmployee(Integer id);
}
