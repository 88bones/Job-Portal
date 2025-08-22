import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtpService } from "../services/verifyOtpService";
import "../Css/VerifyOtp.css";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const role = location.state?.role || "";
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    if (!email) setError("Email not found");
    if (!otp) setError("Enter OTP");
    if (!role) setError("Role not found");

    const result = await verifyOtpService(email, otp, role);
    if (result.success) {
      setSuccess(result.message);
      navigate("/login");
    } else {
      setError(result.error);
    }
  };
  console.log(role);

  return (
    <div className="otp-container">
      <div className="otp-holder">
        <div className="otp-header">
          <h1>Confirm OTP</h1>
          <h4>Enter the OTP sent at {email}</h4>
        </div>
        <div className="otp-form">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button type="submit" onClick={handleVerify}>
            Verify Account
          </button>
        </div>
      </div>

      {error}
      {success}
    </div>
  );
};

export default VerifyOtp;
