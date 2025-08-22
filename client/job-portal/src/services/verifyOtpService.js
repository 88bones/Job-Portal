import axios from "axios";

export const verifyOtpService = async (email, otp, role) => {
  try {
    const res = await axios.post("http://localhost:3001/api/verify-otp", {
      email,
      otp,
      role,
    });
    return res.data;
  } catch (err) {
    return { message: err.response?.data?.message || err.message };
  }
};
