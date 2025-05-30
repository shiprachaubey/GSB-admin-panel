// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Plus, Search, Filter, UserPlus, Mail, Phone, Edit, Trash2, Star, Clock, MessageSquare } from 'lucide-react';
// import { TeamMember } from '../../types';

// // Mock data
// const mockTeamMembers: TeamMember[] = [
//   {
//     id: '1',
//     name: 'Sarah Thompson',
//     email: 'sarah.thompson@wellness.com',
//     role: 'team-member',
//     department: 'Customer Support',
//     avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
//     status: 'active',
//     performanceMetrics: {
//       totalChats: 1243,
//       resolvedChats: 1180,
//       averageResponseTime: 120,
//       customerSatisfaction: 4.8
//     },
//     assignedChats: [],
//     createdAt: '2025-05-10T12:00:00Z',
//     updatedAt: '2025-05-10T12:00:00Z'
//   },
//   {
//     id: '2',
//     name: 'John Miller',
//     email: 'john.miller@wellness.com',
//     role: 'team-member',
//     department: 'Technical Support',
//     avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
//     status: 'active',
//     performanceMetrics: {
//       totalChats: 987,
//       resolvedChats: 945,
//       averageResponseTime: 180,
//       customerSatisfaction: 4.6
//     },
//     assignedChats: [],
//     createdAt: '2025-05-09T15:30:00Z',
//     updatedAt: '2025-05-09T15:30:00Z'
//   }
// ];

// const formatDate = (dateString: string): string => {
//   return new Date(dateString).toLocaleDateString('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric'
//   });
// };

// export const TeamManagement: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
//   const [showFilters, setShowFilters] = useState(false);
//   const [showAddMember, setShowAddMember] = useState(false);

//   const filteredMembers = mockTeamMembers.filter(member => {
//     const matchesSearch = 
//       member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       member.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment;
//     return matchesSearch && matchesDepartment;
//   });

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//         <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
//         <button 
//           onClick={() => setShowAddMember(true)}
//           className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
//         >
//           <UserPlus size={18} className="mr-2" />
//           Add Team Member
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow">
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="relative flex-1">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <Search size={18} className="text-gray-400" />
//               </div>
//               <input 
//                 type="text" 
//                 className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
//                 placeholder="Search team members..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div className="flex gap-2">
//               <button 
//                 className="inline-flex items-center px-3 py-2 border border-gray-300 bg-white rounded-md hover:bg-gray-50"
//                 onClick={() => setShowFilters(!showFilters)}
//               >
//                 <Filter size={18} className="mr-2 text-gray-500" />
//                 Filters
//               </button>
//               <select 
//                 className="border border-gray-300 rounded-md px-3 py-2"
//                 value={selectedDepartment}
//                 onChange={(e) => setSelectedDepartment(e.target.value)}
//               >
//                 <option value="all">All Departments</option>
//                 <option value="Customer Support">Customer Support</option>
//                 <option value="Sales">Sales</option>
//               </select>
//             </div>
//           </div>

//           {showFilters && (
//             <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                   <select className="w-full border border-gray-300 rounded-md px-3 py-2">
//                     <option value="all">All Status</option>
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
//                   <select className="w-full border border-gray-300 rounded-md px-3 py-2">
//                     <option value="name">Name</option>
//                     <option value="performance">Performance</option>
//                     <option value="chats">Active Chats</option>
//                     <option value="date">Join Date</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Performance</label>
//                   <select className="w-full border border-gray-300 rounded-md px-3 py-2">
//                     <option value="all">All Ratings</option>
//                     <option value="high">High Performance</option>
//                     <option value="medium">Medium Performance</option>
//                     <option value="low">Needs Improvement</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Team Member
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Department
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Performance
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Active Chats
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredMembers.map((member) => (
//                 <tr key={member.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="h-10 w-10 flex-shrink-0">
//                         <img 
//                           src={member.avatar} 
//                           alt={member.name}
//                           className="h-10 w-10 rounded-full object-cover"
//                         />
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">{member.name}</div>
//                         <div className="text-sm text-gray-500">{member.email}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
//                       {member.department}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex items-center">
//                         {[...Array(5)].map((_, index) => (
//                           <Star
//                             key={index}
//                             size={16}
//                             className={index < Math.floor(member.performanceMetrics.customerSatisfaction)
//                               ? 'text-amber-400'
//                               : 'text-gray-300'
//                             }
//                           />
//                         ))}
//                       </div>
//                       <span className="ml-2 text-sm text-gray-600">
//                         {member.performanceMetrics.customerSatisfaction.toFixed(1)}
//                       </span>
//                     </div>
//                     <div className="text-xs text-gray-500 mt-1">
//                       {member.performanceMetrics.resolvedChats} resolved
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <MessageSquare size={16} className="text-gray-400 mr-2" />
//                       <span className="text-sm text-gray-900">
//                         {member.assignedChats.length}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 py-1 text-xs rounded-full ${
//                       member.status === 'active'
//                         ? 'bg-green-100 text-green-800'
//                         : 'bg-red-100 text-red-800'
//                     }`}>
//                       {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex items-center justify-end gap-2">
//                       <button className="p-1 text-amber-600 hover:text-amber-900" title="Edit">
//                         <Edit size={18} />
//                       </button>
//                       <button className="p-1 text-red-600 hover:text-red-900" title="Delete">
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="p-4 border-t border-gray-200 flex items-center justify-between">
//           <div className="text-sm text-gray-500">
//             Showing <span className="font-medium">{filteredMembers.length}</span> team members
//           </div>
//           <nav className="flex items-center">
//             <button className="px-3 py-1 border border-gray-300 rounded-l-md bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
//               Previous
//             </button>
//             <button className="px-3 py-1 border border-gray-300 border-l-0 bg-white hover:bg-gray-50">
//               1
//             </button>
//             <button className="px-3 py-1 border border-gray-300 border-l-0 rounded-r-md bg-white hover:bg-gray-50">
//               Next
//             </button>
//           </nav>
//         </div>
//       </div>

//       {/* Add Team Member Modal */}
//       {showAddMember && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
//             <div className="p-6">
//               <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Team Member</h3>
//               <form className="space-y-4">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-amber-500 focus:border-amber-500"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-amber-500 focus:border-amber-500"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="department" className="block text-sm font-medium text-gray-700">
//                     Department
//                   </label>
//                   <select
//                     id="department"
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-amber-500 focus:border-amber-500"
//                   >
//                     <option value="Customer Support">Customer Support</option>
//                     <option value="Technical Support">Technical Support</option>
//                     <option value="Sales">Sales</option>
//                   </select>
//                 </div>
//               </form>
//             </div>
//             <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end gap-3">
//               <button
//                 onClick={() => setShowAddMember(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-amber-600 hover:bg-amber-700"
//               >
//                 Add Member
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { UserPlus, Search, Filter, Star, MessageSquare, Edit, Trash2 } from 'lucide-react';

// interface TeamMember {
//   _id: string;
//   fullName: string;
//   email: string;
//   department: string;
//   status?: string;
//   assignedChats: any[];
//   avatar?: string;
//   performanceMetrics?: {
//     totalChats: number;
//     resolvedChats: number;
//     averageResponseTime: number;
//     customerSatisfaction: number;
//   };
// }

// export const TeamManagement: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
//   const [showFilters, setShowFilters] = useState(false);
//   const [showAddMember, setShowAddMember] = useState(false);
//   const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
//   const [newMember, setNewMember] = useState({ fullName: '', email: '', department: 'Customer Support' });

  // const getAllTeamMembers = async () => {
  //   const response = await axios.get('http://localhost:9000/api/teams/all-members');
  //   return response.data.data;
  // };

  // const getAssignedChats = async (memberId: string) => {
  //   const response = await axios.get(`http://localhost:9000/api/teams/team-members/${memberId}/assigned-chats`);
  //   return response.data.data;
  // };

  // const addTeamMember = async (data: { fullName: string; email: string; department: string }) => {
  //   const response = await axios.post('http://localhost:9000/api/teams/add-member', data);
  //   return response.data;
  // };

//   useEffect(() => {
//     async function fetchMembers() {
//       try {
//         const members = await getAllTeamMembers();
//         const updatedMembers = await Promise.all(
//           members.map(async (member: TeamMember) => {
//             const chats = await getAssignedChats(member._id);
//             return { ...member, assignedChats: chats };
//           })
//         );
//         setTeamMembers(updatedMembers);
//       } catch (err) {
//         console.error('Failed to fetch team members', err);
//       }
//     }
//     fetchMembers();
//   }, []);

//   const handleAddMember = async () => {
//     try {
//       await addTeamMember(newMember);
//       setShowAddMember(false);
//       setNewMember({ fullName: '', email: '', department: 'Customer Support' });
//       const members = await getAllTeamMembers();
//       const updatedMembers = await Promise.all(
//         members.map(async (member: TeamMember) => {
//           const chats = await getAssignedChats(member._id);
//           return { ...member, assignedChats: chats };
//         })
//       );
//       setTeamMembers(updatedMembers);
//     } catch (error: any) {
//       alert(error?.response?.data?.message || 'Error adding team member');
//     }
//   };

//   const filteredMembers = teamMembers.filter((member) => {
//     const matchesSearch =
//       member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       member.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesDepartment =
//       selectedDepartment === 'all' || member.department === selectedDepartment;
//     return matchesSearch && matchesDepartment;
//   });

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserPlus, Search, Filter, Star, MessageSquare, Edit, Trash2 } from 'lucide-react';

interface TeamMember {
  _id: string;
  fullName?: string;
  email?: string;
  department?: string;
  status?: string;
  assignedChats: any[];
  avatar?: string;
  performanceMetrics?: {
    totalChats: number;
    resolvedChats: number;
    averageResponseTime: number;
    customerSatisfaction: number;
  };
}

export const TeamManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [newMember, setNewMember] = useState({ fullName: '', email: '', department: 'Customer Support' });

  const getAllTeamMembers = async () => {
    const response = await axios.get('http://localhost:9000/api/teams/all-members');
    return response.data.data;
  };

  const getAssignedChats = async (memberId: string) => {
    const response = await axios.get(`http://localhost:9000/api/teams/team-members/${memberId}/assigned-chats`);
    return response.data.data;
  };

  const addTeamMember = async (data: { fullName: string; email: string; department: string }) => {
    const response = await axios.post('http://localhost:9000/api/teams/add-member', data);
    return response.data;
  };

  useEffect(() => {
    async function fetchMembers() {
      try {
        const members = await getAllTeamMembers();
        const updatedMembers = await Promise.all(
          members.map(async (member: TeamMember) => {
            const chats = await getAssignedChats(member._id);
            return { ...member, assignedChats: chats };
          })
        );
        setTeamMembers(updatedMembers);
      } catch (err) {
        console.error('Failed to fetch team members', err);
      }
    }
    fetchMembers();
  }, []);

  const handleAddMember = async () => {
    try {
      await addTeamMember(newMember);
      setShowAddMember(false);
      setNewMember({ fullName: '', email: '', department: 'Customer Support' });
      const members = await getAllTeamMembers();
      const updatedMembers = await Promise.all(
        members.map(async (member: TeamMember) => {
          const chats = await getAssignedChats(member._id);
          return { ...member, assignedChats: chats };
        })
      );
      setTeamMembers(updatedMembers);
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Error adding team member');
    }
  };

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      (member.fullName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (member.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === 'all' || member.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
        <button
          onClick={() => setShowAddMember(true)}
          className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
        >
          <UserPlus size={18} className="mr-2" />
          Add Team Member
        </button>
      </div>

      {/* Search and filter bar */}
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
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button
                className="inline-flex items-center px-3 py-2 border border-gray-300 bg-white rounded-md hover:bg-gray-50"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} className="mr-2 text-gray-500" />
                Filters
              </button>
              <select
                className="border border-gray-300 rounded-md px-3 py-2"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="all">All Departments</option>
                <option value="Customer Support">Customer Support</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
          </div>
        </div>

        {/* Team member table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
            
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Active Chats</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
               
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr key={member._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        {/* <img
                          src={member.avatar || 'https://via.placeholder.com/150'}
                          alt={member.fullName}
                          className="h-10 w-10 rounded-full object-cover"
                        /> */}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.fullName}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                      {member.department}
                    </span>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          size={16}
                          className={index < Math.floor(member?.performanceMetrics?.customerSatisfaction || 0)
                            ? 'text-amber-400'
                            : 'text-gray-300'}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {(member?.performanceMetrics?.customerSatisfaction || 0).toFixed(1)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {member?.performanceMetrics?.resolvedChats || 0} resolved
                    </div>
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MessageSquare size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{member.assignedChats.length}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {member.status ? member.status.charAt(0).toUpperCase() + member.status.slice(1) : 'Active'}
                    </span>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1 text-amber-600 hover:text-amber-900" title="Edit">
                        <Edit size={18} />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-900" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Team Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Team Member</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={newMember.fullName}
                    onChange={(e) => setNewMember({ ...newMember, fullName: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                  <select
                    id="department"
                    value={newMember.department}
                    onChange={(e) => setNewMember({ ...newMember, department: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="Customer Support">Customer Support</option>
           
                    <option value="Sales">Sales</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end gap-3">
              <button
                onClick={() => setShowAddMember(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-amber-600 hover:bg-amber-700"
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
