import { useEffect, useState } from "react";
import { getDashboardData } from "../services/DashboardService";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const employee = JSON.parse(localStorage.getItem("employee"));

  if (!employee || employee.role !== "ADMIN") {
    return <h2>Access Denied</h2>;
  }
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState({
    totalEmployees: 0,
    totalLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0,
    pendingLeaves: 0,
  });

  useEffect(() => {
    const employee = localStorage.getItem("employee");

    if (!employee) {
      navigate("/login");
    }

    getDashboardData()
      .then((response) => {
        console.log("SUCCESS");
        console.log(response);
        console.log(response.data);

        setDashboard(response.data);
      })
      .catch((error) => {
        console.log("ERROR");
        console.log(error);
      });
  }, []);

  return (
    <div className="row">

  <div className="col-md-3">
    <div className="card shadow">
      <div className="card-body text-center">
        <h5>Total Employees</h5>
        <h2>{dashboard.totalEmployees}</h2>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card shadow">
      <div className="card-body text-center">
        <h5>Pending Leaves</h5>
        <h2>{dashboard.pendingLeaves}</h2>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card shadow">
      <div className="card-body text-center">
        <h5>Approved Leaves</h5>
        <h2>{dashboard.approvedLeaves}</h2>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card shadow">
      <div className="card-body text-center">
        <h5>Rejected Leaves</h5>
        <h2>{dashboard.rejectedLeaves}</h2>
      </div>
    </div>
  </div>

</div>
  );
}

export default AdminDashboard;
