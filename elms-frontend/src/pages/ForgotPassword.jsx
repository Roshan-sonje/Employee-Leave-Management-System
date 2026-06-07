import { useState } from "react";
import { toast } from "react-toastify";
import { sendOtp } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = () => {
    console.log("BUTTON CLICKED");

    sendOtp(email)
    .then(() => {

        toast.success("OTP Sent Successfully");

        navigate("/verify-otp", {
            state: { email }
        });

    })
    .catch(() => {

        toast.error("Email Not Registered");

    });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter Email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleSendOtp}>
          Send OTP
        </button>

       <div className="mt-3">

    <button
        className="btn btn-secondary"
        onClick={() => navigate("/")}
    >
        Back to Login
    </button>

</div>
      </div>
    </div>
  );
}

export default ForgotPassword;
