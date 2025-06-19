// import React, { useState } from 'react';
// import { Send, Users, Bell, Search, Filter, CheckCircle, AlertCircle } from 'lucide-react';

// interface Notification {
//   id: string;
//   title: string;
//   message: string;
//   type: 'all' | 'free' | 'premium';
//   status: 'sent' | 'failed';
//   sentAt: string;
//   recipients: number;
// }

// const mockNotifications: Notification[] = [
//   {
//     id: '1',
//     title: 'New Meditation Course Available',
//     message: 'Check out our new guided meditation series for stress relief!',
//     type: 'all',
//     status: 'sent',
//     sentAt: '2025-05-10T12:00:00Z',
//     recipients: 1243
//   },
//   {
//     id: '2',
//     title: 'Premium Content Update',
//     message: 'New premium wellness videos have been added to your library.',
//     type: 'premium',
//     status: 'sent',
//     sentAt: '2025-05-09T15:30:00Z',
//     recipients: 456
//   },
//   {
//     id: '3',
//     title: 'Weekend Challenge',
//     message: 'Join our weekend meditation challenge and win rewards!',
//     type: 'free',
//     status: 'sent',
//     sentAt: '2025-05-08T09:00:00Z',
//     recipients: 892
//   }
// ];

// export const Notifications: React.FC = () => {
//   const [title, setTitle] = useState('');
//   const [message, setMessage] = useState('');
//   const [type, setType] = useState<'all' | 'free' | 'premium'>('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showFilters, setShowFilters] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle notification submission
//     console.log({ title, message, type });
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//       hour: 'numeric',
//       minute: 'numeric'
//     });
//   };

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-lg shadow">
//             <div className="p-6">
//               <h2 className="text-lg font-medium text-gray-900 mb-4">Send New Notification</h2>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//                     Title <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
//                     Message <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     id="message"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     rows={4}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
//                     Recipients <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     id="type"
//                     value={type}
//                     onChange={(e) => setType(e.target.value as 'all' | 'free' | 'premium')}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
//                   >
//                     <option value="all">All Users</option>
//                     <option value="free">Free Users</option>
//                     <option value="premium">Premium Users</option>
//                   </select>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
//                 >
//                   <Send size={18} className="mr-2" />
//                   Send Notification
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>

//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-lg shadow">
//             <div className="p-4 border-b border-gray-200">
//               <div className="flex flex-col md:flex-row gap-4">
//                 <div className="relative flex-1">
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                     <Search size={18} className="text-gray-400" />
//                   </div>
//                   <input 
//                     type="text" 
//                     className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
//                     placeholder="Search notifications..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//                 <button 
//                   className="inline-flex items-center px-3 py-2 border border-gray-300 bg-white rounded-md hover:bg-gray-50"
//                   onClick={() => setShowFilters(!showFilters)}
//                 >
//                   <Filter size={18} className="mr-2 text-gray-500" />
//                   Filters
//                 </button>
//               </div>

//               {showFilters && (
//                 <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                       <select className="w-full border border-gray-300 rounded-md px-3 py-2">
//                         <option>All Status</option>
//                         <option>Sent</option>
//                         <option>Failed</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
//                       <select className="w-full border border-gray-300 rounded-md px-3 py-2">
//                         <option>All Types</option>
//                         <option>All Users</option>
//                         <option>Free Users</option>
//                         <option>Premium Users</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
//                       <select className="w-full border border-gray-300 rounded-md px-3 py-2">
//                         <option>All Time</option>
//                         <option>Last 7 Days</option>
//                         <option>Last 30 Days</option>
//                         <option>Last 90 Days</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Notification
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Recipients
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Sent At
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {mockNotifications.map((notification) => (
//                     <tr key={notification.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4">
//                         <div>
//                           <div className="text-sm font-medium text-gray-900">{notification.title}</div>
//                           <div className="text-sm text-gray-500">{notification.message}</div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <Users size={16} className="text-gray-400 mr-1" />
//                           <span className="text-sm text-gray-900">{notification.recipients}</span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                           notification.status === 'sent' 
//                             ? 'bg-green-100 text-green-800' 
//                             : 'bg-red-100 text-red-800'
//                         }`}>
//                           {notification.status === 'sent' ? (
//                             <CheckCircle size={12} className="mr-1" />
//                           ) : (
//                             <AlertCircle size={12} className="mr-1" />
//                           )}
//                           {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {formatDate(notification.sentAt)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="p-4 border-t border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div className="text-sm text-gray-500">
//                   Showing <span className="font-medium">3</span> notifications
//                 </div>
//                 <nav className="flex items-center">
//                   <button className="px-3 py-1 border border-gray-300 rounded-l-md bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
//                     Previous
//                   </button>
//                   <button className="px-3 py-1 border border-gray-300 border-l-0 bg-white hover:bg-gray-50">
//                     1
//                   </button>
//                   <button className="px-3 py-1 border border-gray-300 border-l-0 rounded-r-md bg-white hover:bg-gray-50">
//                     Next
//                   </button>
//                 </nav>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


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
      const res = await fetch('http://13.60.227.51:9000/api/notifications/notifications');
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
    const response = await fetch('http://13.60.227.51:9000/api/notifications/notification', {
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
