import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const notificationsData = [
  {
    name: 'Bessie Cooper',
    action: 'start following you.',
    time: '10 minutes ago',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    name: 'Samuel Lee',
    action: 'liked your post.',
    time: '1 hour ago',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    name: 'Joseph Rodriguez',
    action: 'booked your time slot on Monday.',
    time: 'Yesterday',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    name: 'Alexandra Smith',
    action: 'commented on your photo.',
    time: '2 days ago',
    image: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    name: 'David Johnson',
    action: 'sent you a message.',
    time: '3 days ago',
    image: 'https://randomuser.me/api/portraits/men/9.jpg',
  },
  {
    name: 'Emma Wilson',
    action: 'liked your comment.',
    time: '4 days ago',
    image: 'https://randomuser.me/api/portraits/women/10.jpg',
  },
  {
    name: 'Michael Brown',
    action: 'tagged you in a post.',
    time: '5 days ago',
    image: 'https://randomuser.me/api/portraits/men/11.jpg',
  },
  {
    name: 'Sophia Martinez',
    action: 'shared your post.',
    time: '6 days ago',
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    name: 'James Anderson',
    action: 'mentioned you in a comment.',
    time: '1 week ago',
    image: 'https://randomuser.me/api/portraits/men/13.jpg',
  },
];

const suggestedFriendsData = [
  {
    name: 'Olivia Anderson',
    role: 'Data Analyst',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    name: 'Thomas Baker',
    role: 'Project Manager',
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    name: 'Lily Lee',
    role: 'Designer',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
  {
    name: 'Andrew Harris',
    role: 'Data Scientist',
    image: 'https://randomuser.me/api/portraits/men/7.jpg',
  },
];

const ComNotifications = () => {
  return (
    <div className="container mt-4">
      <div className="row g-3">
        {/* Notifications Section */}
        <div className="col-lg-8 col-md-7">
          <div className="bg-white shadow-sm rounded p-3">
            <h3 className="mb-3">Notifications</h3>
            {notificationsData.map((notification, index) => (
              <div
                key={index}
                className="d-flex align-items-center border-bottom py-2"
              >
                <img
                  src={notification.image}
                  alt={notification.name}
                  className="rounded-circle me-3"
                  style={{ width: '40px', height: '40px' }}
                />
                <div>
                  <p className="mb-1" style={{ fontSize: '0.95rem' }}>
                    <strong>{notification.name}</strong> {notification.action}
                  </p>
                  <span className="text-muted" style={{ fontSize: '0.85rem' }}>
                    {notification.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Friends Section */}
        <div className="col-lg-4 col-md-5">
          <div className="bg-white shadow-sm rounded p-3">
            <h3 className="mb-3">Suggested Friends</h3>
            {suggestedFriendsData.map((friend, index) => (
              <div
                key={index}
                className="d-flex align-items-center justify-content-between mb-3"
              >
                <img
                  src={friend.image}
                  alt={friend.name}
                  className="rounded-circle"
                  style={{ width: '40px', height: '40px' }}
                />
                <div className="flex-grow-1 ms-3">
                  <p className="mb-0" style={{ fontSize: '0.95rem' }}>
                    <strong>{friend.name}</strong>
                  </p>
                  <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>
                    {friend.role}
                  </p>
                </div>
                <button
                  className="btn btn-primary rounded-circle d-flex justify-content-center align-items-center"
                  style={{
                    width: '30px',
                    height: '30px',
                  }}
                >
                  +
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComNotifications;
