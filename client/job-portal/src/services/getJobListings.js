import axios from "axios";

export const fetchJobListings = async () => {
  try {
    const res = await axios.get(`http://localhost:3001/api/jobs/getJobs`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
