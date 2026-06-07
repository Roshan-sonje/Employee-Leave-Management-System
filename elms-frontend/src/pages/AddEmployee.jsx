import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveEmployee } from "../services/EmployeeService";

function AddEmployee() {

    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        password: "",
        department: "",
        designation: "",
        leaveBalance: "",
        role: "EMPLOYEE"
    });

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        saveEmployee(employee)
            .then((response) => {
                alert("Employee Added Successfully");
                console.log(response.data);
                navigate("/employees");
            })
            .catch((error) => {
                console.log(error);
                alert("Failed to Add Employee");
            });
    };

    return (
        <div className="container mt-4">

            <h2>Add Employee</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="form-control mb-2"
                    value={employee.name}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control mb-2"
                    value={employee.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control mb-2"
                    value={employee.password}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    className="form-control mb-2"
                    value={employee.department}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="designation"
                    placeholder="Designation"
                    className="form-control mb-2"
                    value={employee.designation}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="leaveBalance"
                    placeholder="Leave Balance"
                    className="form-control mb-2"
                    value={employee.leaveBalance}
                    onChange={handleChange}
                />

                <select
                    name="role"
                    className="form-control mb-3"
                    value={employee.role}
                    onChange={handleChange}
                >
                    <option value="EMPLOYEE">EMPLOYEE</option>
                    <option value="ADMIN">ADMIN</option>
                </select>

                <button className="btn btn-success">
                    Save Employee
                </button>

            </form>

        </div>
    );
}

export default AddEmployee;