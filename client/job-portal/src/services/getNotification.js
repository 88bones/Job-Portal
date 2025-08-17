import axios from "axios";

export const fetchNotifications = async (userId) => {
  const res = await axios.get(
    `http://localhost:3001/api/notifications/${userId}`
  );
  return res.data;
};
