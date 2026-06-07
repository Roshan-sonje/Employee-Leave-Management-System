import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/AuthService";
import { toast } from "react-toastify";


function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    login(loginData)
      .then((response) => {
        const employee = response.data;

        localStorage.setItem("employee", JSON.stringify(employee));

        toast.success("Login Successful");

        setTimeout(() => {
          if (employee.role === "ADMIN") {
            window.location.href = "/dashboard";
          } else {
            window.location.href = "/employee-dashboard";
          }
        }, 1500);
      })
      .catch((error) => {
        console.log(error);

        toast.error("Invalid Credentials");
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Employee Login</h2>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label>Email</label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>

                <div className="text-center mt-3">
                  <a href="/forgot-password">Forgot Password?</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
