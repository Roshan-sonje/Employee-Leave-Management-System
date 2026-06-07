import { useEffect, useState } from "react";
import { getAllEmployees, deleteEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    deleteEmployee(id)
      .then(() => {
        toast.success("Employee Deleted Successfully");

        setEmployees(employees.filter((emp) => emp.id !== id));
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to Delete Employee");
      });
  };

  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`);
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
          className="card-header text-white d-flex justify-content-between align-items-center"
          style={{
            background: "linear-gradient(135deg,#374151,#111827)",
            padding: "20px",
          }}
        >
          <h2 className="mb-0">Employee Management</h2>

          <button
            className="btn btn-light"
            onClick={() => navigate("/add-employee")}
          >
            + Add Employee
          </button>
        </div>

        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Name or Email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Leave Balance</th>
                <th width="220">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.length > 0 ? (
                employees
                  .filter(
                    (emp) =>
                      emp.name.toLowerCase().includes(search.toLowerCase()) ||
                      emp.email.toLowerCase().includes(search.toLowerCase()),
                  )
                  .map((emp) => (
                    <tr key={emp.id}>
                      <td>{emp.id}</td>

                      <td>{emp.name}</td>

                      <td>{emp.email}</td>

                      <td>{emp.leaveBalance}</td>

                      <td>
                        <button
                          className="btn btn-warning me-2"
                          onClick={() => handleEdit(emp.id)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(emp.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Employees Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeManagement;
