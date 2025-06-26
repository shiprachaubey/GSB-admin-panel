import React, { useState } from 'react';
import { Search, Users as UsersIcon, CheckCircle, XCircle } from 'lucide-react';

// Mock user data
const mockUsers = [
  {
    id: 'u1',
    name: 'Amit Sharma',
    email: 'amit.sharma@example.com',
    joinedAt: '2024-05-01T10:00:00Z',
    hasSubscription: true,
  },
  {
    id: 'u2',
    name: 'Priya Singh',
    email: 'priya.singh@example.com',
    joinedAt: '2024-04-15T14:30:00Z',
    hasSubscription: false,
  },
  {
    id: 'u3',
    name: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    joinedAt: '2024-03-20T09:15:00Z',
    hasSubscription: true,
  },
];

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
};

export const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <UsersIcon size={28} className="text-amber-500" /> Users
        </h1>
      </div>

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
                placeholder="Search users..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-amber-600">#{user.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{formatDate(user.joinedAt)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.hasSubscription ? (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800">
                        <CheckCircle size={16} className="mr-1 text-green-500" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-800">
                        <XCircle size={16} className="mr-1 text-red-500" /> None
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users; 