import axios from "axios";

export const updateStatus = async (appId, status) => {
  const res = await axios.put(
    `http://localhost:3001/api/applications/${appId}/status`,
    { status }
  );
  return res.data;
};
