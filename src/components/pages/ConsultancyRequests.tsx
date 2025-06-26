// import React, { useState } from 'react';
// import { Search, Filter, MessageCircle, CheckCircle, Clock, X, User } from 'lucide-react';
// import { ConsultancyRequest } from '../../types';

// // Mock data
// const mockRequests: ConsultancyRequest[] = [
//   {
//     id: '1',
//     firstName: 'Michael',
//     lastName: 'Johnson',
//     email: 'michael.johnson@example.com',
//     phone: '+1 555-123-4567',
//     message: 'I would like to know more about meditation techniques for anxiety and insomnia. What would you recommend for a beginner?',
//     status: 'new',
//     createdAt: '2025-05-10T08:12:00Z',
//   },
//   {
//     id: '2',
//     firstName: 'Emily',
//     lastName: 'Davis',
//     email: 'emily.davis@example.com',
//     phone: '+1 555-987-6543',
//     message: 'I\'ve been following your nutrition plan for 2 weeks. While I see some improvements, I still struggle with afternoon cravings. I would like to discuss how to adjust my meal plan.',
//     status: 'in-progress',
//     createdAt: '2025-05-09T14:25:00Z',
//     assignedTo: 'Sarah Thompson',
//     notes: 'Discussed afternoon snack options. Recommended protein-rich alternatives.'
//   },
//   {
//     id: '3',
//     firstName: 'Robert',
//     lastName: 'Wilson',
//     email: 'robert.wilson@example.com',
//     phone: '+1 555-789-0123',
//     message: 'Thank you for the personalized fitness plan. I\'ve lost 5kg in the last month and feel much more energetic. I would like to schedule a follow-up to discuss next steps.',
//     status: 'resolved',
//     createdAt: '2025-05-08T11:30:00Z',
//     assignedTo: 'John Miller',
//     notes: 'Follow-up completed. Client satisfied with progress. Adjusted plan for next 30 days.'
//   },
//   {
//     id: '4',
//     firstName: 'Jennifer',
//     lastName: 'Smith',
//     email: 'jennifer.smith@example.com',
//     phone: '+1 555-456-7890',
//     message: 'I am interested in your premium meditation plan but would like to know if it includes guided sessions for sleep improvement specifically.',
//     status: 'new',
//     createdAt: '2025-05-07T09:45:00Z'
//   },
//   {
//     id: '5',
//     firstName: 'David',
//     lastName: 'Brown',
//     email: 'david.brown@example.com',
//     phone: '+1 555-234-5678',
//     message: 'I\'m looking for a vegetarian diet plan that will help me maintain my protein intake while training for a marathon.',
//     status: 'in-progress',
//     createdAt: '2025-05-06T13:20:00Z',
//     assignedTo: 'Lisa Anderson',
//     notes: 'Reviewed current diet. Working on customized vegetarian meal plan with adequate protein.'
//   }
// ];

// // Format date
// const formatDate = (dateString: string): string => {
//   const date = new Date(dateString);
//   return new Intl.DateTimeFormat('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric'
//   }).format(date);
// };

// export const ConsultancyRequests: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState<'all' | 'new' | 'in-progress' | 'resolved'>('all');
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedRequest, setSelectedRequest] = useState<ConsultancyRequest | null>(null);

//   // Filter requests based on search term and status
//   const filteredRequests = mockRequests.filter(request => {
//     const fullName = `${request.firstName} ${request.lastName}`.toLowerCase();
//     const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || 
//                           request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           request.message.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus;
    
//     return matchesSearch && matchesStatus;
//   });

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900">Consultancy Requests</h1>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-6">
//         <div className="lg:w-2/3 space-y-6">
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
//                     placeholder="Search requests..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//                 <div className="flex gap-2">
//                   <button 
//                     className="inline-flex items-center px-3 py-2 border border-gray-300 bg-white rounded-md hover:bg-gray-50"
//                     onClick={() => setShowFilters(!showFilters)}
//                   >
//                     <Filter size={18} className="mr-2 text-gray-500" />
//                     Filters
//                   </button>
//                   <select 
//                     className="border border-gray-300 rounded-md px-3 py-2"
//                     value={selectedStatus}
//                     onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'new' | 'in-progress' | 'resolved')}
//                   >
//                     <option value="all">All Status</option>
//                     <option value="new">New</option>
//                     <option value="in-progress">In Progress</option>
//                     <option value="resolved">Resolved</option>
//                   </select>
//                 </div>
//               </div>
              
//               {showFilters && (
//                 <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
//                   <div className="flex flex-col md:flex-row gap-4">
//                     <div className="flex-1">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
//                       <select className="w-full border border-gray-300 rounded-md px-3 py-2">
//                         <option>Newest First</option>
//                         <option>Oldest First</option>
//                         <option>Name A-Z</option>
//                         <option>Name Z-A</option>
//                       </select>
//                     </div>
//                     <div className="flex-1">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Date Received</label>
//                       <select className="w-full border border-gray-300 rounded-md px-3 py-2">
//                         <option>All Time</option>
//                         <option>Last 7 Days</option>
//                         <option>Last 30 Days</option>
//                         <option>Last 90 Days</option>
//                       </select>
//                     </div>
//                     <div className="flex-1">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
//                       <select className="w-full border border-gray-300 rounded-md px-3 py-2">
//                         <option>Anyone</option>
//                         <option>Unassigned</option>
//                         <option>Me</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
//               <ul className="divide-y divide-gray-200">
//                 {filteredRequests.map((request) => (
//                   <li 
//                     key={request.id}
//                     className={`hover:bg-gray-50 cursor-pointer ${selectedRequest?.id === request.id ? 'bg-amber-50' : ''}`}
//                     onClick={() => setSelectedRequest(request)}
//                   >
//                     <div className="px-6 py-4">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                           <div className="bg-gray-100 rounded-full p-2">
//                             <User size={20} className="text-gray-600" />
//                           </div>
//                           <div className="ml-3">
//                             <div className="flex items-center">
//                               <p className="text-sm font-medium text-gray-900">{request.firstName} {request.lastName}</p>
//                               <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
//                                 request.status === 'new' 
//                                   ? 'bg-amber-100 text-amber-800' 
//                                   : request.status === 'in-progress'
//                                   ? 'bg-blue-100 text-blue-800'
//                                   : 'bg-green-100 text-green-800'
//                               }`}>
//                                 {request.status}
//                               </span>
//                             </div>
//                             <p className="text-xs text-gray-500">{request.email}</p>
//                           </div>
//                         </div>
//                         <div className="text-xs text-gray-500">{formatDate(request.createdAt)}</div>
//                       </div>
//                       <div className="mt-2">
//                         <p className="text-sm text-gray-600 line-clamp-2">{request.message}</p>
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>

//               {filteredRequests.length === 0 && (
//                 <div className="p-8 text-center">
//                   <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
//                     <MessageCircle size={32} className="text-gray-400" />
//                   </div>
//                   <h3 className="mt-4 text-lg font-medium text-gray-900">No requests found</h3>
//                   <p className="mt-2 text-sm text-gray-500">
//                     {searchTerm || selectedStatus !== 'all' ? 'Try adjusting your search or filters' : 'No consultancy requests have been received yet.'}
//                   </p>
//                 </div>
//               )}
//             </div>

//             <div className="p-4 border-t border-gray-200 flex items-center justify-between">
//               <div className="text-sm text-gray-500">
//                 Showing <span className="font-medium">{filteredRequests.length}</span> of <span className="font-medium">{mockRequests.length}</span> requests
//               </div>
//               <nav className="flex items-center">
//                 <button className="px-3 py-1 border border-gray-300 rounded-l-md bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
//                   Previous
//                 </button>
//                 <button className="px-3 py-1 border border-gray-300 border-l-0 bg-white hover:bg-gray-50">
//                   1
//                 </button>
//                 <button className="px-3 py-1 border border-gray-300 border-l-0 rounded-r-md bg-white hover:bg-gray-50">
//                   Next
//                 </button>
//               </nav>
//             </div>
//           </div>
//         </div>

//         <div className="lg:w-1/3">
//           <div className="bg-white rounded-lg shadow">
//             {selectedRequest ? (
//               <div>
//                 <div className="border-b border-gray-200 p-4 flex items-center justify-between">
//                   <h2 className="text-lg font-medium text-gray-900">Request Details</h2>
//                   <button 
//                     className="text-gray-400 hover:text-gray-600"
//                     onClick={() => setSelectedRequest(null)}
//                   >
//                     <X size={20} />
//                   </button>
//                 </div>

//                 <div className="p-6 space-y-6">
//                   <div>
//                     <div className="flex items-center justify-between">
//                       <h3 className="text-md font-medium text-gray-900">{selectedRequest.firstName} {selectedRequest.lastName}</h3>
//                       <span className={`px-2 py-1 text-xs rounded-full ${
//                         selectedRequest.status === 'new' 
//                           ? 'bg-amber-100 text-amber-800' 
//                           : selectedRequest.status === 'in-progress'
//                           ? 'bg-blue-100 text-blue-800'
//                           : 'bg-green-100 text-green-800'
//                       }`}>
//                         {selectedRequest.status}
//                       </span>
//                     </div>
//                     <div className="mt-1 grid grid-cols-1 gap-1 text-sm text-gray-500">
//                       <div>{selectedRequest.email}</div>
//                       <div>{selectedRequest.phone}</div>
//                       <div className="text-xs">Received: {formatDate(selectedRequest.createdAt)}</div>
//                     </div>
//                   </div>

//                   <div>
//                     <h4 className="text-sm font-medium text-gray-700 mb-2">Message</h4>
//                     <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-600">
//                       {selectedRequest.message}
//                     </div>
//                   </div>

//                   {selectedRequest.assignedTo && (
//                     <div>
//                       <h4 className="text-sm font-medium text-gray-700 mb-2">Assigned To</h4>
//                       <div className="flex items-center">
//                         <div className="bg-indigo-100 rounded-full p-2">
//                           <User size={18} className="text-indigo-600" />
//                         </div>
//                         <span className="ml-2 text-sm text-gray-700">{selectedRequest.assignedTo}</span>
//                       </div>
//                     </div>
//                   )}

//                   {selectedRequest.notes && (
//                     <div>
//                       <h4 className="text-sm font-medium text-gray-700 mb-2">Notes</h4>
//                       <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-600">
//                         {selectedRequest.notes}
//                       </div>
//                     </div>
//                   )}

//                   <div>
//                     <h4 className="text-sm font-medium text-gray-700 mb-2">Update Status</h4>
//                     <div className="flex gap-2">
//                       <button 
//                         className={`flex-1 py-2 px-3 rounded-md text-sm ${
//                           selectedRequest.status === 'new' 
//                             ? 'bg-amber-100 text-amber-800 border border-amber-200' 
//                             : 'bg-white border border-gray-300 hover:bg-gray-50'
//                         }`}
//                       >
//                         New
//                       </button>
//                       <button 
//                         className={`flex-1 py-2 px-3 rounded-md text-sm ${
//                           selectedRequest.status === 'in-progress' 
//                             ? 'bg-blue-100 text-blue-800 border border-blue-200' 
//                             : 'bg-white border border-gray-300 hover:bg-gray-50'
//                         }`}
//                       >
//                         In Progress
//                       </button>
//                       <button 
//                         className={`flex-1 py-2 px-3 rounded-md text-sm ${
//                           selectedRequest.status === 'resolved' 
//                             ? 'bg-green-100 text-green-800 border border-green-200' 
//                             : 'bg-white border border-gray-300 hover:bg-gray-50'
//                         }`}
//                       >
//                         Resolved
//                       </button>
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
//                       Add Note
//                     </label>
//                     <textarea
//                       id="notes"
//                       rows={3}
//                       className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
//                       placeholder="Add notes about this request..."
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="assign" className="block text-sm font-medium text-gray-700 mb-2">
//                       Assign To
//                     </label>
//                     <select
//                       id="assign"
//                       className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
//                     >
//                       <option value="">Select Team Member</option>
//                       <option>Sarah Thompson</option>
//                       <option>John Miller</option>
//                       <option>Lisa Anderson</option>
//                       <option>David Chen</option>
//                     </select>
//                   </div>

//                   <div className="pt-2 flex justify-end gap-3">
//                     <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
//                       Cancel
//                     </button>
//                     <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700">
//                       Save Changes
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="p-8 text-center">
//                 <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
//                   <MessageCircle size={32} className="text-gray-400" />
//                 </div>
//                 <h3 className="mt-4 text-lg font-medium text-gray-900">No request selected</h3>
//                 <p className="mt-2 text-sm text-gray-500">
//                   Select a request from the list to view details
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


import React, { useEffect, useState } from 'react';
import { Search, Filter, MessageCircle, X, User } from 'lucide-react';

interface ConsultancyRequest {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
  status: 'new' | 'in-progress' | 'resolved';
  notes?: string;
  createdAt: string;
  assignedTo?: {
    _id: string;
    fullName: string;
    email: string;
  };
}

interface TeamMember {
  _id: string;
  fullName: string;
  email: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);
};

const Consultancy: React.FC = () => {
  const [consultancyRequests, setConsultancyRequests] = useState<ConsultancyRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ConsultancyRequest | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'in-progress' | 'resolved'>('all');

  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [noteInput, setNoteInput] = useState('');

  useEffect(() => {
    fetch('https://api.gsbpathy.com/api/consultancy/all')
      .then(res => res.json())
      .then(data => setConsultancyRequests(data.data));

    fetch('https://api.gsbpathy.com/api/teams/all-members')
      .then(res => res.json())
      .then(data => setTeamMembers(data.data));
  }, []);

  const handleSelectRequest = async (id: string) => {
    const res = await fetch(`https://api.gsbpathy.com/api/consultancy/${id}`);
    const result = await res.json();
    setSelectedRequest(result.data);
  };

  const handleSaveChanges = async () => {
    if (!selectedRequest) return;
    const payload: any = {};
    if (selectedStatus) payload.status = selectedStatus;
    if (selectedAssignee) payload.assignedTo = selectedAssignee;
    if (noteInput) payload.notes = noteInput;

    const res = await fetch(`https://api.gsbpathy.com/api/consultancy/${selectedRequest._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    setSelectedRequest(result.data);
    setNoteInput('');
    setSelectedStatus('');
    setSelectedAssignee('');

    // Refresh list
    const all = await fetch('https://api.gsbpathy.com/api/consultancy/all').then(r => r.json());
    setConsultancyRequests(all.data);
  };

  const filteredRequests = consultancyRequests.filter(req => {
    const fullName = `${req.firstName} ${req.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 flex gap-6">
      <div className="w-2/3">
        <div className="mb-4 flex gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search requests..."
            className="border px-3 py-2 w-full rounded-md"
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="border px-3 py-2 rounded-md"
          >
            <option value="all">All</option>
            <option value="new">New</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="border rounded-md bg-white">
          {filteredRequests.map(req => (
            <div
              key={req._id}
              className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${selectedRequest?._id === req._id ? 'bg-amber-50' : ''}`}
              onClick={() => handleSelectRequest(req._id)}
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{req.firstName} {req.lastName}</p>
                  <p className="text-sm text-gray-500">{req.email}</p>
                  <p className="text-sm text-gray-600 mt-1">{req.message}</p>
                </div>
                <div className="text-sm text-right">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    req.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
                    req.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {req.status}
                  </span>
                  <p className="text-xs text-gray-400 mt-2">{formatDate(req.createdAt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-1/3">
        {selectedRequest ? (
          <div className="border rounded-md bg-white p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Request Details</h2>
              <button onClick={() => setSelectedRequest(null)}><X size={20} /></button>
            </div>
            <p><strong>Name:</strong> {selectedRequest.firstName} {selectedRequest.lastName}</p>
            <p><strong>Email:</strong> {selectedRequest.email}</p>
            <p><strong>Phone:</strong> {selectedRequest.phoneNumber}</p>
            <p><strong>Received:</strong> {formatDate(selectedRequest.createdAt)}</p>
            <p className="mt-4"><strong>Message:</strong><br />{selectedRequest.message}</p>
            {selectedRequest.assignedTo && (
              <p className="mt-2"><strong>Assigned To:</strong> {selectedRequest.assignedTo.fullName}</p>
            )}
            {selectedRequest.notes && (
              <p className="mt-2"><strong>Notes:</strong><br />{selectedRequest.notes}</p>
            )}

            <div className="mt-4">
              <label>Status</label>
              <select
                className="w-full border px-2 py-2 rounded"
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
              >
                <option value="">-- Choose Status --</option>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div className="mt-4">
              <label>Assign To</label>
              <select
                className="w-full border px-2 py-2 rounded"
                value={selectedAssignee}
                onChange={e => setSelectedAssignee(e.target.value)}
              >
                <option value="">-- Select Team Member --</option>
                {teamMembers.map(member => (
                  <option key={member._id} value={member._id}>{member.fullName}</option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label>Notes</label>
              <textarea
                rows={3}
                className="w-full border px-3 py-2 rounded"
                value={noteInput}
                onChange={e => setNoteInput(e.target.value)}
              />
            </div>

            <div className="mt-4 text-right">
              <button onClick={handleSaveChanges} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded">
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-md border">
            <MessageCircle size={32} className="text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Select a request to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Consultancy;
