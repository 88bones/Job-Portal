import axios from "axios";

export const fetchJobDetails = async (_id) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/jobs/getJobApply/${_id}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
