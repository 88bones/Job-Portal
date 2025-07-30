import axios from "axios";

export const fetchAppliedJobs = async (userId) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/api/applications/appliedJobs/${userId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
