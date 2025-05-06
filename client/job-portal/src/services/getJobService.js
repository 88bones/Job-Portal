import axios from "axios";

export const fetchJob = async (_id) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/jobs/getJob/${_id}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
