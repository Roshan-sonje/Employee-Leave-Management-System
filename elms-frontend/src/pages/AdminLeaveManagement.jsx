import { useEffect, useState } from "react";
import {
  getAllLeaves,
  approveLeave,
  rejectLeave,
} from "../services/LeaveService";

function AdminLeaveManagement() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [leaveTypeFilter, setLeaveTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 9;

  const [leaves, setLeaves] = useState([]);

  const loadLeaves = () => {
    getAllLeaves()
      .then((response) => {
        setLeaves(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const handleApprove = (id) => {
    approveLeave(id).then(() => {
      loadLeaves();
    });
  };

  const handleReject = (id) => {
    rejectLeave(id).then(() => {
      loadLeaves();
    });
  };

  const filteredLeaves = leaves.filter((leave) => {
    const employeeMatch = leave.employee?.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const statusMatch = statusFilter === "" || leave.status === statusFilter;

    const leaveTypeMatch =
      leaveTypeFilter === "" || leave.leaveType === leaveTypeFilter;

    return employeeMatch && statusMatch && leaveTypeMatch;
  });

  const lastIndex = currentPage * recordsPerPage;

  const firstIndex = lastIndex - recordsPerPage;

  const currentLeaves = filteredLeaves.slice(
    firstIndex,
    lastIndex
);

  const totalPages = Math.ceil(leaves.length / recordsPerPage);

  

  return (
    <div className="container mt-4">
      <h2>Leave Requests</h2>

      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search Employee"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-control"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>

            <option value="PENDING">Pending</option>

            <option value="APPROVED">Approved</option>

            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        <div className="col-md-4">
          <select
            className="form-control"
            value={leaveTypeFilter}
            onChange={(e) => setLeaveTypeFilter(e.target.value)}
          >
            <option value="">All Leave Types</option>

            <option value="CASUAL">Casual</option>

            <option value="SICK">Sick</option>

            <option value="EARNED">Earned</option>
          </select>
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {currentLeaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.id}</td>
              <td>{leave.employee?.name}</td>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.leaveType}</td>
              <td>{leave.status}</td>

              <td>
                <button
                  className="btn btn-success me-2"
                  onClick={() => handleApprove(leave.id)}
                >
                  Approve
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleReject(leave.id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-secondary me-2"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        <span className="align-self-center mx-3">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="btn btn-secondary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AdminLeaveManagement;
