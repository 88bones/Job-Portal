import axios from "axios";

export const fetchJobDetails = async (jobId) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/jobs/getJobApply/${jobId}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
