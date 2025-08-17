import axios from "axios";

export const updateNotification = async (appId, status) => {
  try {
    const res = await axios.post(
      `http://localhost:3001/api/notifications/notify/${appId}`,
      { status }
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
