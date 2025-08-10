import axios from "axios";

export const fetchApplicants = async (companyId) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/api/applications/applicants/${companyId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
