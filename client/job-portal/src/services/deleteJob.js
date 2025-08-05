import axios from "axios";

export const deleteJob = async (id) => {
  try {
    const res = await axios.delete(
      `http://localhost:3001/api/jobs/deleteJob/${id}`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
