import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchNotifications } from "../services/getNotification";
import "../Css/Notifications.css";

const Notifications = () => {
  const { _id: userId } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications(userId).then((data) => setNotifications(data));
  }, [userId]);

  return (
    <div className="notification-container">
      <div className="notification-list">
        <h3>Notifications</h3>

        {notifications.length === 0 ? (
          <p>No notifications yet</p>
        ) : (
          <ul type="none">
            {notifications.map((n) => (
              <li key={n._id} className="ntf">
                {n.message}
                <div className="notification-details">
                  <span style={{ color: "blue" }}>✔</span>
                  <p className="n-date">
                    {new Date(n.createdAt).toISOString().split("T")[0]}
                  </p>
                </div>
                {/* {!n.isRead && <span style={{ color: "blue" }}>●</span>} */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notifications;
