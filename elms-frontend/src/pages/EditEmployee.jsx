import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEmployeeById,
  updateEmployee,
} from "../services/EmployeeService";
import { toast } from "react-toastify";

function EditEmployee() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    department: "",
    designation: "",
    leaveBalance: "",
    role: "",
  });

  useEffect(() => {

    getEmployeeById(id)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [id]);

  const handleChange = (e) => {

    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    updateEmployee(employee)
      .then(() => {

        toast.success(
          "Employee Updated Successfully"
        );

        setTimeout(() => {
          navigate("/employees");
        }, 1500);

      })
      .catch((error) => {

        console.log(error);

        toast.error(
          "Failed to Update Employee"
        );

      });

  };

  return (
    <div
      className="container-fluid p-4"
      style={{
        backgroundColor: "#f8fafc",
      }}
    >

      <div
        className="card shadow border-0"
        style={{
          borderRadius: "15px",
        }}
      >

        <div
          className="card-header text-white"
          style={{
            background:
              "linear-gradient(135deg,#374151,#111827)",
            padding: "20px",
          }}
        >

          <h2 className="mb-0">
            Edit Employee
          </h2>

        </div>

        <div className="card-body p-4">

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  className="form-control"
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  className="form-control"
                />

              </div>

            </div>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={employee.password}
                  onChange={handleChange}
                  className="form-control"
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Department
                </label>

                <input
                  type="text"
                  name="department"
                  value={employee.department}
                  onChange={handleChange}
                  className="form-control"
                />

              </div>

            </div>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Designation
                </label>

                <input
                  type="text"
                  name="designation"
                  value={employee.designation}
                  onChange={handleChange}
                  className="form-control"
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Leave Balance
                </label>

                <input
                  type="number"
                  name="leaveBalance"
                  value={employee.leaveBalance}
                  onChange={handleChange}
                  className="form-control"
                />

              </div>

            </div>

            <div className="mb-4">

              <label className="form-label">
                Role
              </label>

              <select
                name="role"
                value={employee.role}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">
                  Select Role
                </option>

                <option value="ADMIN">
                  ADMIN
                </option>

                <option value="EMPLOYEE">
                  EMPLOYEE
                </option>

              </select>

            </div>

            <button
              type="submit"
              className="btn text-white"
              style={{
                backgroundColor: "#1e293b",
                border: "none",
                padding: "12px 30px",
                fontWeight: "600",
              }}
            >
              Update Employee
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditEmployee;