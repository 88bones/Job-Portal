import axios from "axios";

export const postApplication = async (jobId, userId) => {
  try {
    const res = await axios.post(
      `http://localhost:3001/api/jobs/apply/${jobId}`,
      {
        userId: userId,
      }
    );
    return {
      success: true,
      data: res.data,
      message: res.data.message,
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Application failed",
    };
  }
};
