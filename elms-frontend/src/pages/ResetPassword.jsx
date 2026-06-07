import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../services/AuthService";

function ResetPassword() {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const handleResetPassword = () => {

        if (password !== confirmPassword) {

            toast.error(
                "Passwords Do Not Match"
            );

            return;
        }

        resetPassword(email, password)
            .then(() => {

                toast.success(
                    "Password Updated Successfully"
                );

                setTimeout(() => {

                    navigate("/");

                }, 1500);

            })
            .catch(() => {

                toast.error(
                    "Failed To Update Password"
                );

            });

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="mb-4">
                                Reset Password
                            </h2>

                            <input
                                type="password"
                                placeholder="New Password"
                                className="form-control mb-3"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />

                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="form-control mb-3"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(
                                        e.target.value
                                    )
                                }
                            />

                            <button
                                className="btn btn-primary"
                                onClick={handleResetPassword}
                            >
                                Update Password
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default ResetPassword;