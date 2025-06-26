
import React, { useState, useEffect } from 'react';
import { Send, Users, Bell, Search, Filter, CheckCircle, AlertCircle } from 'lucide-react';

interface Notification {
  _id: string;
  title: string;
  message: string;
  recipients: string;
  status: string;
  sentAt: string;
}

export const Notifications: React.FC = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [recipients, setRecipients] = useState<'All Users' | 'Free Users' | 'Premium Users'>('All Users');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('https://api.gsbpathy.com/api/notifications/notifications');
      const data = await res.json();
      setNotifications(data.data.reverse()); // assuming the data is an array of notifications
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const payload = {
    title,
    message,
    recipients
  };

  try {
    const response = await fetch('https://api.gsbpathy.com/api/notifications/notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log("API response:", result);

    if (!response.ok) {
      alert(`Error: ${result.message || "Notification failed"}`);
      return;
    }

    setNotifications(prev => [result.data, ...prev]);
    setTitle('');
    setMessage('');
    setRecipients('All Users');
    alert('Notification sent successfully!');
  } catch (error) {
    console.error("API Error:", error);
    alert('Something went wrong while sending the notification.');
  }
};


  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch('http://localhost:9000/api/notifications/notification', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ title, message, recipients })
  //     });

  //     const result = await response.json();
  //     if (response.ok) {
  //       setNotifications(prev => [result.data, ...prev]);
  //       setTitle('');
  //       setMessage('');
  //       setRecipients('All Users');
  //       alert('Notification sent successfully!');
  //     } else {
  //       console.error("Send failed:", result.message);
  //     }
  //   } catch (error) {
  //     console.error("Error sending notification:", error);
  //   }
  // };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Notification Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Send New Notification</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  />
                </div>

                <div>
                  <label htmlFor="recipients" className="block text-sm font-medium text-gray-700 mb-1">
                    Recipients <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="recipients"
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value as any)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  >
                    <option value="All Users">All Users</option>
                    <option value="Free Users">Free Users</option>
                    <option value="Premium Users">Premium Users</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700"
                >
                  <Send size={18} className="mr-2" />
                  Send Notification
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* RIGHT: Notifications Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notification</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipients</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sent At</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {notifications
                    .filter((n) =>
                      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      n.message.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((notification) => (
                      <tr key={notification._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{notification.title}</div>
                          <div className="text-sm text-gray-500">{notification.message}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{notification.recipients}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            notification.status.toLowerCase() === 'sent'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {notification.status.toLowerCase() === 'sent' ? (
                              <CheckCircle size={12} className="mr-1" />
                            ) : (
                              <AlertCircle size={12} className="mr-1" />
                            )}
                            {notification.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{formatDate(notification.sentAt)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
