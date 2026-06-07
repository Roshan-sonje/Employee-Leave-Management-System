import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyOtp } from "../services/AuthService";

function VerifyOtp() {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const [otp, setOtp] = useState("");

    const handleVerifyOtp = () => {

        verifyOtp(email, otp)
            .then(() => {

                toast.success("OTP Verified");

                navigate("/reset-password", {
                    state: { email }
                });

            })
            .catch(() => {

                toast.error("Invalid OTP");

            });

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="mb-4">
                                Verify OTP
                            </h2>

                            <input
                                type="text"
                                placeholder="Enter OTP"
                                className="form-control mb-3"
                                value={otp}
                                onChange={(e) =>
                                    setOtp(e.target.value)
                                }
                            />

                            <div className="d-flex gap-2">

                                <button
                                    className="btn btn-success"
                                    onClick={handleVerifyOtp}
                                >
                                    Verify OTP
                                </button>

                                <button
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        navigate("/forgot-password")
                                    }
                                >
                                    Back
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default VerifyOtp;