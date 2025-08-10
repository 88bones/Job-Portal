import axios from "axios";

export const fetchRecommendedJobs = async (userId) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/api/users/recommend/${userId}`
    );
    if (res.data.jobs && res.data.jobs.length == 0) {
      throw res.data.message;
    }
    return res.data;
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error("Failed to fetch recommended jobs");
  }
};
