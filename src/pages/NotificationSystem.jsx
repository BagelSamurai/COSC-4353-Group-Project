import React, { useState, useEffect } from "react";

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate fetching notifications from an API
    const fetchedNotifications = [
      { id: 1, message: "New event assigned: Charity Run", type: "assignment" },
      { id: 2, message: "Event updated: Food Drive", type: "update" },
      {
        id: 3,
        message: "Reminder: Volunteer meeting tomorrow",
        type: "reminder",
      },
    ];
    setNotifications(fetchedNotifications);
  }, []);

  return (
    <div className="notification-system">
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((note) => (
            <li key={note.id}>{note.message}</li>
          ))}
        </ul>
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  );
};

export default NotificationSystem;
