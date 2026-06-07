import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AdminDashboard() {
  return (
    <>
      <Navbar />

      <div className="d-flex">

        <Sidebar />

        <div className="container mt-4">

          <h2>Admin Dashboard</h2>

          <div className="row mt-4">

            <div className="col-md-3">
              <div className="card p-3 shadow">
                <h5>Total Employees</h5>
                <h3>0</h3>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3 shadow">
                <h5>Pending Leaves</h5>
                <h3>0</h3>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3 shadow">
                <h5>Approved Leaves</h5>
                <h3>0</h3>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3 shadow">
                <h5>Rejected Leaves</h5>
                <h3>0</h3>
              </div>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default AdminDashboard;