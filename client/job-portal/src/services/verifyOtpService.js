import axios from "axios";

export const verifyOtpService = async (email, otp) => {
  try {
    const res = await axios.post("http://localhost:3001/api/users/verify-otp", {
      email,
      otp,
    });
    return res.data;
  } catch (err) {
    return { message: err.response?.data?.message || err.message };
  }
};
