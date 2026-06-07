import { useState } from "react";
import { applyLeave } from "../services/LeaveService";
import { toast } from "react-toastify";
function ApplyLeave() {

    const employee =
        JSON.parse(localStorage.getItem("employee"));

    if (!employee || employee.role !== "EMPLOYEE") {
        return <h2>Access Denied</h2>;
    }

    const [leave, setLeave] = useState({
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
        employee: {
            id: employee.id
        }
    });

    const handleChange = (e) => {

        setLeave({
            ...leave,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = () => {

      if(employee.leaveBalance <= 0){

    toast.error(
        "No Leave Balance Available"
    );

    return;
}

        applyLeave(leave)
            .then(() => {

                toast.success(
                "Leave Applied Successfully"
            );
                setLeave({
                    leaveType: "",
                    startDate: "",
                    endDate: "",
                    reason: "",
                    employee: {
                        id: employee.id
                    }
                });

            })
            .catch((error) => {

                console.log(error);

                toast.error(
                "Failed to Apply Leave"
            );

            });

    };

    return (
        <div
            className="container-fluid p-4"
            style={{
                backgroundColor: "#f8fafc",
    paddingBottom: "20px"
            }}
        >

            <div
                className="card shadow border-0"
                style={{
                    borderRadius: "15px"
                }}
            >

                <div
                    className="card-header text-white"
                    style={{
                        background:
                            "linear-gradient(135deg,#374151,#111827)",
                        padding: "20px"
                    }}
                >

                    <h2 className="mb-2">
                        Apply Leave
                    </h2>

                    <small>
                        Employee : {employee.name}
                    </small>

                </div>

                <div className="card-body p-4">

                    <div className="row">

                        <div className="col-md-6">

                            <label className="form-label fw-bold">
                                Leave Type
                            </label>

                            <select
                                name="leaveType"
                                value={leave.leaveType}
                                onChange={handleChange}
                                className="form-control mb-4"
                            >
                                <option value="">
                                    Select Leave Type
                                </option>

                                <option value="CASUAL">
                                    Casual Leave
                                </option>

                                <option value="SICK">
                                    Sick Leave
                                </option>

                                <option value="EARNED">
                                    Earned Leave
                                </option>

                            </select>

                        </div>

                        <div className="col-md-6">

                            <label className="form-label fw-bold">
                                Leave Balance
                            </label>

                            <input
                                type="text"
                                value={employee.leaveBalance}
                                disabled
                                className="form-control mb-4 bg-light"
                            />

                        </div>

                    </div>

                    <div className="row">

                        <div className="col-md-6">

                            <label className="form-label fw-bold">
                                Start Date
                            </label>

                            <input
                                type="date"
                                name="startDate"
                                value={leave.startDate}
                                onChange={handleChange}
                                className="form-control mb-4"
                            />

                        </div>

                        <div className="col-md-6">

                            <label className="form-label fw-bold">
                                End Date
                            </label>

                            <input
                                type="date"
                                name="endDate"
                                value={leave.endDate}
                                onChange={handleChange}
                                className="form-control mb-4"
                            />

                        </div>

                    </div>

                    <label className="form-label fw-bold">
                        Reason
                    </label>

                    <textarea
                        rows="5"
                        name="reason"
                        value={leave.reason}
                        onChange={handleChange}
                        placeholder="Enter Leave Reason"
                        className="form-control mb-4"
                    />

                    <button
                        className="btn text-white"
                        style={{
                            backgroundColor: "#1e293b",
                            border: "none",
                            padding: "12px 30px",
                            fontWeight: "600"
                        }}
                        onClick={handleSubmit}
                    >
                        Apply Leave
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ApplyLeave;