import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import "./NotificationSystem.css";
const NotificationBell = () => {
  // Sample dummy notifications
  const [notifications] = useState([
    { id: 1, message: "New volunteer signed up!" },
    { id: 2, message: "Event has been updated." },
    { id: 3, message: "You have a new message." },
  ]);

  // Whether to show/hide the dropdown
  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown on bell click
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="notification-bell-container">
      <button className="notification-bell" onClick={handleToggle}>
        <FaBell size={20} />
        {/* Show the notification count if there are notifications */}
        {notifications.length > 0 && (
          <span className="notification-count">{notifications.length}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            <ul>
              {notifications.map((notif) => (
                <li key={notif.id}>{notif.message}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
