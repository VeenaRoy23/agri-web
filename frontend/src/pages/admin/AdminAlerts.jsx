import React, { useState } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
 // Requires Heroicons package
import AdminNavbar from '../../components/admin/AdminNavbar';

const initialAlerts = [
  {
    id: 1,
    type: 'Crop Loss',
    block: 'Devikulam',
    panchayat: 'Kunjithanny',
    croptype: 'Pepper',
    date: '2025-06-10',
    description: 'Heavy rain caused total crop failure',
    reportedBy: 'Farmer',
    urgency: 'High',
    read: false,
  },
  {
    id: 2,
    type: 'Govt Message',
    block: 'Devikulam',
    panchayat: 'Kunjithanny',
    date: '2025-06-10',
    message: 'Field inspection conducted. Damage verified.',
    issuedBy: 'Agriculture Officer',
    read: false,
  },
];

const AdminNotifications = () => {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [showDropdown, setShowDropdown] = useState(false);

  const unreadCount = alerts.filter(alert => !alert.read).length;

  const toggleDropdown = () => setShowDropdown(prev => !prev);

  const markAsRead = (id) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === id ? { ...alert, read: true } : alert
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      <div className="flex justify-end p-4">
        <div className="relative inline-block">
          <button onClick={toggleDropdown} className="relative">
            <BellIcon className="w-8 h-8 text-gray-700" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-96 bg-white shadow-lg rounded-lg z-10 max-h-96 overflow-y-auto">
              <div className="p-4 border-b font-semibold text-gray-800">Notifications</div>

              {alerts.filter(a => !a.read).length === 0 && (
                <div className="p-4 text-gray-500 text-sm text-center">No new notifications</div>
              )}

              {alerts
                .filter(a => !a.read)
                .map(alert => (
                  <div
                    key={alert.id}
                    className="p-4 hover:bg-gray-100 border-b cursor-pointer"
                    onClick={() => markAsRead(alert.id)}
                  >
                    <p className="text-sm text-gray-700">
                      <strong>{alert.type === 'Crop Loss' ? '🚨 Crop Loss' : '📢 Govt Message'}</strong>
                      {alert.type === 'Crop Loss' && (
                        <> reported in <b>{alert.panchayat}</b> ({alert.croptype})</>
                      )}
                      {alert.type === 'Govt Message' && (
                        <> in <b>{alert.panchayat}</b>: "{alert.message}"</>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{alert.date}</p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Optional page content below */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome, Officer</h1>
        <p className="text-gray-700">Keep track of crop loss and government messages here.</p>
      </div>
    </div>
  );
};

export default AdminNotifications;
