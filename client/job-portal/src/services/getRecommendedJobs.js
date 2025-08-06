import axios from "axios";

export const fetchRecommendedJobs = async (userId) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/api/users/recommend/${userId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
