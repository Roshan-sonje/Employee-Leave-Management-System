import { useEffect, useState } from "react";
import { getEmployeeById } from "../services/EmployeeService";
function Profile() {
  const loggedInUser = JSON.parse(localStorage.getItem("employee"));

  const [employee, setEmployee] = useState({});

  useEffect(() => {

    getEmployeeById(loggedInUser.id)
        .then((response) => {

            setEmployee(response.data);

            localStorage.setItem(
                "employee",
                JSON.stringify(response.data)
            );

        })
        .catch((error) => {
            console.log(error);
        });

}, []);

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        padding: "15px",
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
            background: "linear-gradient(135deg,#374151,#111827)",
            padding: "20px",
          }}
        >
          <div className="d-flex align-items-center">
            <div
              className="rounded-circle d-flex justify-content-center align-items-center"
              style={{
                width: "70px",
                height: "70px",
                backgroundColor: "#f8fafc",
                color: "#1e293b",
                fontSize: "28px",
                fontWeight: "bold",
              }}
            >
              {employee?.name?.charAt(0)}
            </div>

            <div className="ms-3">
              <h3 className="mb-1">{employee?.name}</h3>

              <p className="mb-1">{employee?.designation}</p>

              <small>{employee?.department}</small>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <h6 className="text-muted">Email</h6>

                  <h6>{employee?.email}</h6>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <h6 className="text-muted">Role</h6>

                  <h5>{employee?.role}</h5>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <h6 className="text-muted">Leave Balance</h6>

                  <h3
                    style={{
                      color: "#1e293b",
                    }}
                  >
                    {employee?.leaveBalance}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div
              className="card-header text-white"
              style={{
                background: "linear-gradient(135deg,#374151,#111827)",
              }}
            >
              Employee Information
            </div>

            <div className="card-body">
              <table className="table table-hover mb-0">
                <tbody>
                  <tr>
                    <th width="30%">Employee ID</th>
                    <td>{employee?.id}</td>
                  </tr>

                  <tr>
                    <th>Name</th>
                    <td>{employee?.name}</td>
                  </tr>

                  <tr>
                    <th>Email</th>
                    <td>{employee?.email}</td>
                  </tr>

                  <tr>
                    <th>Department</th>
                    <td>{employee?.department}</td>
                  </tr>

                  <tr>
                    <th>Designation</th>
                    <td>{employee?.designation}</td>
                  </tr>

                  <tr>
                    <th>Role</th>
                    <td>{employee?.role}</td>
                  </tr>

                  <tr>
                    <th>Leave Balance</th>
                    <td>{employee?.leaveBalance}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
