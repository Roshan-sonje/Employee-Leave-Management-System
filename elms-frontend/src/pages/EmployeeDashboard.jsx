import { useEffect, useState } from "react";

function EmployeeDashboard() {

    const employee =
        JSON.parse(localStorage.getItem("employee"));

    const [data, setData] = useState({
        leaveBalance: employee?.leaveBalance || 0
    });

    useEffect(() => {

        console.log(employee);

    }, []);

    return (
        <div className="container">

            <h2 className="mb-4">
                Welcome, {employee?.name}
            </h2>

            <div className="row">

                <div className="col-md-3">
                    <div className="card shadow">
                        <div className="card-body text-center">
                            <h5>Leave Balance</h5>
                            <h2>{data.leaveBalance}</h2>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default EmployeeDashboard;