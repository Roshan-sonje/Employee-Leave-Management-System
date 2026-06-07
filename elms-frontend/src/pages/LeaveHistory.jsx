import { useEffect, useState } from "react";
import { getLeaveHistory } from "../services/LeaveService";

function LeaveHistory() {


const [leaves, setLeaves] = useState([]);

const employee =
    JSON.parse(localStorage.getItem("employee"));

useEffect(() => {

    getLeaveHistory(employee.id)
        .then((response) => {
            setLeaves(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

}, []);

const pendingLeaves =
    leaves.filter(l => l.status === "PENDING").length;

const approvedLeaves =
    leaves.filter(l => l.status === "APPROVED").length;

const rejectedLeaves =
    leaves.filter(l => l.status === "REJECTED").length;



const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("");
const [currentPage, setCurrentPage] = useState(1);

const recordsPerPage = 5;


const filteredLeaves = leaves.filter((leave) => {

    const searchMatch =
        search === "" ||
        leave.leaveType
            .toLowerCase()
            .includes(search.toLowerCase());

    const statusMatch =
        statusFilter === "" ||
        leave.status === statusFilter;

    return searchMatch && statusMatch;
});

const lastIndex =
    currentPage * recordsPerPage;

const firstIndex =
    lastIndex - recordsPerPage;

const currentLeaves =
    filteredLeaves.slice(
        firstIndex,
        lastIndex
    );

const totalPages =
    Math.ceil(
        filteredLeaves.length /
        recordsPerPage
    );


return (
    <div className="container-fluid p-4">

        <h2 className="mb-4">
            Leave History
        </h2>

        <h5 className="text-secondary mb-4">
            Welcome, {employee?.name}
        </h5>

        <div className="row mb-4">

            <div className="col-md-3">
                <div className="card shadow border-0">
                    <div className="card-body text-center">
                        <h6>Total Leaves</h6>
                        <h2>{leaves.length}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow border-0">
                    <div className="card-body text-center">
                        <h6>Pending</h6>
                        <h2 className="text-warning">
                            {pendingLeaves}
                        </h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow border-0">
                    <div className="card-body text-center">
                        <h6>Approved</h6>
                        <h2 className="text-success">
                            {approvedLeaves}
                        </h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow border-0">
                    <div className="card-body text-center">
                        <h6>Rejected</h6>
                        <h2 className="text-danger">
                            {rejectedLeaves}
                        </h2>
                    </div>
                </div>
            </div>

        </div>

        <div className="card shadow border-0">

            <div className="card-body">

                <div className="row mb-4">

    <div className="col-md-6">
        <input
            type="text"
            className="form-control"
            placeholder="Search Leave Type"
            value={search}
            onChange={(e) =>
                setSearch(e.target.value)
            }
        />
    </div>

    <div className="col-md-6">
        <select
            className="form-control"
            value={statusFilter}
            onChange={(e) =>
                setStatusFilter(e.target.value)
            }
        >
            <option value="">
                All Status
            </option>

            <option value="PENDING">
                Pending
            </option>

            <option value="APPROVED">
                Approved
            </option>

            <option value="REJECTED">
                Rejected
            </option>

        </select>
    </div>

</div>

                <table className="table table-hover">

                    <thead className="table-dark">

                        <tr>
                            <th>ID</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Reason</th>
                            <th>Leave Type</th>
                            <th>Status</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            currentLeaves.map((leave) => (

                                <tr key={leave.id}>

                                    <td>{leave.id}</td>

                                    <td>{leave.startDate}</td>

                                    <td>{leave.endDate}</td>

                                    <td>{leave.reason}</td>

                                    <td>{leave.leaveType}</td>

                                    <td>

                                        {leave.status === "APPROVED" &&
                                            <span className="badge bg-success">
                                                APPROVED
                                            </span>
                                        }

                                        {leave.status === "PENDING" &&
                                            <span className="badge bg-warning text-dark">
                                                PENDING
                                            </span>
                                        }

                                        {leave.status === "REJECTED" &&
                                            <span className="badge bg-danger">
                                                REJECTED
                                            </span>
                                        }

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

                <div className="d-flex justify-content-center mt-4">

    <button
        className="btn btn-secondary me-2"
        disabled={currentPage === 1}
        onClick={() =>
            setCurrentPage(currentPage - 1)
        }
    >
        Previous
    </button>

    <span className="align-self-center mx-3">
        Page {currentPage} of {totalPages}
    </span>

    <button
        className="btn btn-secondary"
        disabled={
            currentPage === totalPages
        }
        onClick={() =>
            setCurrentPage(currentPage + 1)
        }
    >
        Next
    </button>

</div>

            </div>

        </div>

    </div>
);


}

export default LeaveHistory;
