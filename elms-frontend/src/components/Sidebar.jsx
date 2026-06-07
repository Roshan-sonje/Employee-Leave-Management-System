import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Sidebar() {
  const employee = JSON.parse(localStorage.getItem("employee"));

  return (
    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        backgroundColor: "#1e293b",
        color: "white",
        padding: "20px",
        boxShadow: "2px 0px 10px rgba(0,0,0,0.2)",
      }}
    >
      <h2 className="text-center mb-4">ELMS</h2>

      <div
        className="text-center mb-4"
        style={{
          borderBottom: "1px solid gray",
          paddingBottom: "15px",
        }}
      >
        <h6>Welcome</h6>
        <h5>{employee?.name}</h5>
        <small>{employee?.role}</small>
      </div>

      {employee?.role === "ADMIN" && (
        <div className="d-flex flex-column gap-3">
          <Link to="/dashboard" className="btn btn-outline-light">
            Dashboard
          </Link>

          <Link to="/employees" className="btn btn-outline-light">
            Employees
          </Link>

          <Link to="/admin-leaves" className="btn btn-outline-light">
            Manage Leaves
          </Link>
        </div>
      )}

      {employee?.role === "EMPLOYEE" && (
        <div className="d-flex flex-column gap-3">
          <Link to="/employee-dashboard" className="btn btn-outline-light">
            Dashboard
          </Link>

          <Link to="/apply-leave" className="btn btn-outline-light">
            Apply Leave
          </Link>

          <Link to="/leave-history" className="btn btn-outline-light">
            Leave History
          </Link>

          <Link to="/profile" className="btn btn-outline-light">
            My Profile
          </Link>
        </div>
      )}

      <div className="mt-5">
        {employee && (
          <button
            className="btn btn-danger mt-3"
            onClick={() => {

    toast.info("Logged Out Successfully");

    setTimeout(() => {

        localStorage.removeItem("employee");
        window.location.href = "/";

    }, 1000);

}}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
