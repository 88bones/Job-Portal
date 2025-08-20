import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtpService } from "../services/verifyOtpService";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    if (!email) setError("Email not found");
    if (!otp) setError("Enter OTP");

    const result = await verifyOtpService(email, otp);
    if (result.success) {
      setSuccess(result.message);
      navigate("/login");
    } else {
      setError(result.error);
    }
  };

  return (
    <div>
      <h3>Check {email} for OTP</h3>
      <h1>Enter OTP here:</h1>
      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <button onClick={handleVerify}>Verify Account</button>
      {error}
      {success}
    </div>
  );
};

export default VerifyOtp;
