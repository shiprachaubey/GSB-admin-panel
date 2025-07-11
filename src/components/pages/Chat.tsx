// // import React, { useState } from 'react';
// // import { Search, Filter, MessageSquare, Send, Paperclip, Phone, Video, MoreVertical, User } from 'lucide-react';
// // import { ChatConversation, ChatMessage } from '../../types';

// // // Mock data
// // const mockConversations: ChatConversation[] = [
// //   {
// //     id: '1',
// //     customerId: 'cust123',
// //     customerName: 'Michael Johnson',
// //     assignedTo: 'team1',
// //     status: 'active',
// //     lastMessage: 'I need help with my meditation routine',
// //     lastMessageTime: '2025-05-10T12:00:00Z',
// //     unreadCount: 2,
// //     createdAt: '2025-05-10T11:30:00Z',
// //     updatedAt: '2025-05-10T12:00:00Z'
// //   },
// //   {
// //     id: '2',
// //     customerId: 'cust456',
// //     customerName: 'Emily Davis',
// //     status: 'pending',
// //     unreadCount: 1,
// //     createdAt: '2025-05-10T10:15:00Z',
// //     updatedAt: '2025-05-10T10:15:00Z'
// //   }
// // ];

// // const mockMessages: ChatMessage[] = [
// //   {
// //     id: '1',
// //     conversationId: '1',
// //     senderId: 'cust123',
// //     senderType: 'customer',
// //     message: 'Hi, I need help with my meditation routine',
// //     createdAt: '2025-05-10T11:30:00Z',
// //     read: true
// //   },
// //   {
// //     id: '2',
// //     conversationId: '1',
// //     senderId: 'team1',
// //     senderType: 'team-member',
// //     message: 'Hello! I\'d be happy to help you with your meditation routine. What specific aspects would you like assistance with?',
// //     createdAt: '2025-05-10T11:32:00Z',
// //     read: true
// //   },
// //   {
// //     id: '3',
// //     conversationId: '1',
// //     senderId: 'cust123',
// //     senderType: 'customer',
// //     message: 'I\'m having trouble maintaining focus during longer sessions',
// //     createdAt: '2025-05-10T11:35:00Z',
// //     read: false
// //   }
// // ];

// // const formatTime = (dateString: string): string => {
// //   return new Date(dateString).toLocaleTimeString('en-US', {
// //     hour: 'numeric',
// //     minute: 'numeric'
// //   });
// // };

// // export const Chat: React.FC = () => {
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(mockConversations[0]);
// //   const [newMessage, setNewMessage] = useState('');
// //   const [showFilters, setShowFilters] = useState(false);

// //   const handleSendMessage = () => {
// //     if (!newMessage.trim()) return;
// //     // In a real app, this would send the message to the server
// //     setNewMessage('');
// //   };

// //   return (
// //     <div className="h-[calc(100vh-10rem)]">
// //       <div className="flex h-full bg-white rounded-lg shadow">
// //         {/* Conversations List */}
// //         <div className="w-1/3 border-r border-gray-200">
// //           <div className="p-4 border-b border-gray-200">
// //             <div className="relative">
// //               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
// //                 <Search size={18} className="text-gray-400" />
// //               </div>
// //               <input 
// //                 type="text" 
// //                 className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
// //                 placeholder="Search conversations..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //             </div>
// //             <div className="flex items-center mt-4">
// //               <button 
// //                 className="inline-flex items-center px-3 py-1 border border-gray-300 bg-white rounded-md hover:bg-gray-50 text-sm"
// //                 onClick={() => setShowFilters(!showFilters)}
// //               >
// //                 <Filter size={16} className="mr-2 text-gray-500" />
// //                 Filter
// //               </button>
// //               <select className="ml-2 border border-gray-300 rounded-md px-3 py-1 text-sm">
// //                 <option value="all">All Chats</option>
// //                 <option value="unassigned">Unassigned</option>
// //                 <option value="active">Active</option>
// //                 <option value="resolved">Resolved</option>
// //               </select>
// //             </div>
// //           </div>

// //           <div className="overflow-y-auto" style={{ height: 'calc(100% - 8rem)' }}>
// //             {mockConversations.map((conversation) => (
// //               <div
// //                 key={conversation.id}
// //                 className={`p-4 cursor-pointer hover:bg-gray-50 ${
// //                   selectedConversation?.id === conversation.id ? 'bg-amber-50' : ''
// //                 }`}
// //                 onClick={() => setSelectedConversation(conversation)}
// //               >
// //                 <div className="flex items-center justify-between">
// //                   <div className="flex items-center">
// //                     <div className="bg-gray-200 rounded-full p-2">
// //                       <User size={24} className="text-gray-600" />
// //                     </div>
// //                     <div className="ml-3">
// //                       <div className="text-sm font-medium text-gray-900">
// //                         {conversation.customerName}
// //                       </div>
// //                       <div className="text-xs text-gray-500">
// //                         {conversation.lastMessageTime ? formatTime(conversation.lastMessageTime) : 'New conversation'}
// //                       </div>
// //                     </div>
// //                   </div>
// //                   {conversation.unreadCount > 0 && (
// //                     <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
// //                       {conversation.unreadCount}
// //                     </span>
// //                   )}
// //                 </div>
// //                 {conversation.lastMessage && (
// //                   <div className="mt-2 text-sm text-gray-600 truncate">
// //                     {conversation.lastMessage}
// //                   </div>
// //                 )}
// //                 <div className="mt-2 flex items-center">
// //                   <span className={`px-2 py-1 text-xs rounded-full ${
// //                     conversation.status === 'active'
// //                       ? 'bg-green-100 text-green-800'
// //                       : conversation.status === 'resolved'
// //                       ? 'bg-gray-100 text-gray-800'
// //                       : 'bg-amber-100 text-amber-800'
// //                   }`}>
// //                     {conversation.status.charAt(0).toUpperCase() + conversation.status.slice(1)}
// //                   </span>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Chat Window */}
// //         {selectedConversation ? (
// //           <div className="flex-1 flex flex-col">
// //             {/* Chat Header */}
// //             <div className="p-4 border-b border-gray-200 flex items-center justify-between">
// //               <div className="flex items-center">
// //                 <div className="bg-gray-200 rounded-full p-2">
// //                   <User size={24} className="text-gray-600" />
// //                 </div>
// //                 <div className="ml-3">
// //                   <div className="text-sm font-medium text-gray-900">
// //                     {selectedConversation.customerName}
// //                   </div>
// //                   <div className="text-xs text-gray-500">
// //                     {selectedConversation.status === 'active' ? 'Online' : 'Offline'}
// //                   </div>
// //                 </div>
// //               </div>
// //               <div className="flex items-center gap-3">
// //                 <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
// //                   <Phone size={20} />
// //                 </button>
// //                 <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
// //                   <Video size={20} />
// //                 </button>
// //                 <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
// //                   <MoreVertical size={20} />
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Messages */}
// //             <div className="flex-1 overflow-y-auto p-4 space-y-4">
// //               {mockMessages.map((message) => (
// //                 <div
// //                   key={message.id}
// //                   className={`flex ${message.senderType === 'team-member' ? 'justify-end' : 'justify-start'}`}
// //                 >
// //                   <div className={`max-w-[70%] ${
// //                     message.senderType === 'team-member'
// //                       ? 'bg-amber-500 text-white'
// //                       : 'bg-gray-100 text-gray-900'
// //                   } rounded-lg px-4 py-2`}>
// //                     <div className="text-sm">{message.message}</div>
// //                     <div className="text-xs mt-1 opacity-70">
// //                       {formatTime(message.createdAt)}
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Message Input */}
// //             <div className="p-4 border-t border-gray-200">
// //               <div className="flex items-center gap-2">
// //                 <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
// //                   <Paperclip size={20} />
// //                 </button>
// //                 <input
// //                   type="text"
// //                   className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
// //                   placeholder="Type your message..."
// //                   value={newMessage}
// //                   onChange={(e) => setNewMessage(e.target.value)}
// //                   onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
// //                 />
// //                 <button
// //                   className="p-2 text-white bg-amber-500 rounded-full hover:bg-amber-600 disabled:opacity-50"
// //                   onClick={handleSendMessage}
// //                   disabled={!newMessage.trim()}
// //                 >
// //                   <Send size={20} />
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         ) : (
// //           <div className="flex-1 flex items-center justify-center">
// //             <div className="text-center">
// //               <MessageSquare size={48} className="mx-auto text-gray-400" />
// //               <h3 className="mt-4 text-lg font-medium text-gray-900">No conversation selected</h3>
// //               <p className="mt-2 text-sm text-gray-500">
// //                 Choose a conversation from the list to start chatting
// //               </p>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Search, Filter, MessageSquare, Send, Paperclip, Phone, Video, MoreVertical, User } from 'lucide-react';

// interface ChatConversation {
//   _id: string;
//   customerName: string;
//   customerEmail?: string;
//   assignedTo?: string;
//   status: 'open' | 'resolved' | 'pending' | 'active';
//   createdAt: string;
//   updatedAt: string;
// }

// interface ChatMessage {
//   _id: string;
//   sender: 'customer' | 'agent';
//   text: string;
//   timestamp: string;
// }

// const formatTime = (dateString: string): string => {
//   return new Date(dateString).toLocaleTimeString('en-US', {
//     hour: 'numeric',
//     minute: 'numeric'
//   });
// };

// export const Chat: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [conversations, setConversations] = useState<ChatConversation[]>([]);
//   const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null);
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [showFilters, setShowFilters] = useState(false);

//   useEffect(() => {
//     axios.get('http://localhost:9000/api/chat/chats')
//       .then(res => {
//       console.log('Loaded chats:', res.data); // debug
//       setConversations(res.data.data); // ✅ Fix: use res.data.data
//     })
//     .catch(err => console.error('Failed to load chats', err));
// }, []);


//   const handleSelectConversation = async (conversation: ChatConversation) => {
//     try {
//       const res = await axios.get(`http://localhost:9000/api/chats/${conversation._id}`);
//       setSelectedConversation(conversation);
//       setMessages(res.data.messages || []);
//     } catch (err) {
//       console.error('Failed to load messages', err);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedConversation) return;

//     try {
//       await axios.post(`http://localhost:9000/api/chats/${selectedConversation._id}/reply`, {
//         text: newMessage,
//         agentId: 'YOUR_TEAM_MEMBER_ID' // Replace with actual ID
//       });

//       setMessages(prev => [
//         ...prev,
//         {
//           _id: Date.now().toString(),
//           sender: 'agent',
//           text: newMessage,
//           timestamp: new Date().toISOString()
//         }
//       ]);
//       setNewMessage('');
//     } catch (err) {
//       console.error('Failed to send message', err);
//     }
//   };

//   return (
//    <div className="h-[calc(100vh-10rem)]">
//   <div className="flex h-full bg-white rounded-lg shadow">
//     {/* Conversations List */}
//     <div className="w-1/3 border-r border-gray-200">
//       <div className="p-4 border-b border-gray-200">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//             <Search size={18} className="text-gray-400" />
//           </div>
//           <input
//             type="text"
//             className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
//             placeholder="Search conversations..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div className="flex items-center mt-4">
//           <button
//             className="inline-flex items-center px-3 py-1 border border-gray-300 bg-white rounded-md hover:bg-gray-50 text-sm"
//             onClick={() => setShowFilters(!showFilters)}
//           >
//             <Filter size={16} className="mr-2 text-gray-500" />
//             Filter
//           </button>
//           <select className="ml-2 border border-gray-300 rounded-md px-3 py-1 text-sm">
//             <option value="all">All Chats</option>
//             <option value="unassigned">Unassigned</option>
//             <option value="active">Active</option>
//             <option value="resolved">Resolved</option>
//           </select>
//         </div>
//       </div>

//       <div className="overflow-y-auto" style={{ height: 'calc(100% - 8rem)' }}>
//         {Array.isArray(conversations) && conversations.map((conversation) => (
//           <div
//             key={conversation._id}
//             className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedConversation?._id === conversation._id ? 'bg-amber-50' : ''}`}
//             onClick={() => handleSelectConversation(conversation)}
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <div className="bg-gray-200 rounded-full p-2">
//                   <User size={24} className="text-gray-600" />
//                 </div>
//                 <div className="ml-3">
//                   <div className="text-sm font-medium text-gray-900">
//                     {conversation.customerName}
//                   </div>
//                   <div className="text-xs text-gray-500">
//                     {conversation.updatedAt ? formatTime(conversation.updatedAt) : 'New'}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* Chat View */}
//     {selectedConversation ? (
//       <div className="flex-1 flex flex-col">
//         <div className="p-4 border-b border-gray-200 flex items-center justify-between">
//           <div className="flex items-center">
//             <div className="bg-gray-200 rounded-full p-2">
//               <User size={24} className="text-gray-600" />
//             </div>
//             <div className="ml-3">
//               <div className="text-sm font-medium text-gray-900">
//                 {selectedConversation.customerName}
//               </div>
//               <div className="text-xs text-gray-500">
//                 {selectedConversation.status === 'active' ? 'Online' : 'Offline'}
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
//               <Phone size={20} />
//             </button>
//             <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
//               <Video size={20} />
//             </button>
//             <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
//               <MoreVertical size={20} />
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 space-y-4">
//           {messages.map((message) => (
//             <div
//               key={message._id}
//               className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
//             >
//               <div className={`max-w-[70%] ${message.sender === 'agent' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg px-4 py-2`}>
//                 <div className="text-sm">{message.text}</div>
//                 <div className="text-xs mt-1 opacity-70">
//                   {formatTime(message.timestamp)}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="p-4 border-t border-gray-200">
//           <div className="flex items-center gap-2">
//             <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
//               <Paperclip size={20} />
//             </button>
//             <input
//               type="text"
//               className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
//               placeholder="Type your message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//             />
//             <button
//               className="p-2 text-white bg-amber-500 rounded-full hover:bg-amber-600 disabled:opacity-50"
//               onClick={handleSendMessage}
//               disabled={!newMessage.trim()}
//             >
//               <Send size={20} />
//             </button>
//           </div>
//         </div>
//       </div>
//     ) : (
//       <div className="flex-1 flex items-center justify-center">
//         <div className="text-center">
//           <MessageSquare size={48} className="mx-auto text-gray-400" />
//           <h3 className="mt-4 text-lg font-medium text-gray-900">No conversation selected</h3>
//           <p className="mt-2 text-sm text-gray-500">
//             Choose a conversation from the list to start chatting
//           </p>
//         </div>
//       </div>
//     )}
//   </div>
// </div>

//   );
// };



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Search,
  Filter,
  MessageSquare,
  Send,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  User,
} from 'lucide-react';

interface ChatMessage {
  _id: string;
  text: string;
  sender: 'customer' | 'agent';
  timestamp: string;
}

interface ChatConversation {
  _id: string;
  customerName: string;
  updatedAt?: string;
  status: string;
  assignedTo:string;
}
interface TeamMember {
  _id: string;
  fullName: string;
  email: string;
}


const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'New';
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

export const Chat: React.FC = () => {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
const [showAssignModal, setShowAssignModal] = useState(false);
const [availableAgents, setAvailableAgents] = useState<TeamMember[]>([]);
const [selectedAgent, setSelectedAgent] = useState('');
const [pendingMessage, setPendingMessage] = useState('');


  useEffect(() => {
    axios
      .get('https://api.gsbpathy.com//api/chat/chats')
      .then((res) => {
        setConversations(res.data.data || []);
      })
      .catch((err) => console.error('Error loading chats:', err));
  }, []);

  const handleSelectConversation = async (conversation: ChatConversation) => {
    try {
      const res = await axios.get(`https://api.gsbpathy.com/api/chat/${conversation._id}`);
      setSelectedConversation(conversation);
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  };
const handleSendMessage = async () => {
  if (!newMessage.trim() || !selectedConversation) return;

  const assignedAgentId = selectedConversation.assignedTo;

  const agentIdToSend = assignedAgentId || null;


  try {
    await axios.post(`https://api.gsbpathy.com/api/chat/${selectedConversation._id}/reply`, {
       text: newMessage,
    agentId: agentIdToSend, 
    });

    setMessages(prev => [
      ...prev,
      {
        _id: Date.now().toString(),
        sender: 'agent',
        text: newMessage,
        timestamp: new Date().toISOString(),
      },
    ]);

    setNewMessage('');
  } catch (err) {
    console.error('Failed to send message:', err);
  }
};

const handleAssignAgent = async () => {
  try {
    await axios.put('https://api.gsbpathy.com/api/chat/chats/assign', {
      chatId: selectedConversation?._id,
      agentId: selectedAgent,
    });

    setSelectedConversation(prev =>
      prev ? { ...prev, assignedTo: selectedAgent } : null
    );

    setShowAssignModal(false);
  } catch (err) {
    console.error('Failed to assign agent', err);
  }
};


  return (
    <div className="h-[calc(100vh-10rem)]">
      <div className="flex h-full bg-white rounded-lg shadow">
        {/* Sidebar */}
        <div className="w-1/3 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center mt-4">
              <button
                className="inline-flex items-center px-3 py-1 border border-gray-300 bg-white rounded-md hover:bg-gray-50 text-sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={16} className="mr-2 text-gray-500" />
                Filter
              </button>
              <select className="ml-2 border border-gray-300 rounded-md px-3 py-1 text-sm">
                <option value="all">All Chats</option>
                <option value="unassigned">Unassigned</option>
                <option value="active">Active</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>

          <div className="overflow-y-auto" style={{ height: 'calc(100% - 8rem)' }}>
            {Array.isArray(conversations) && conversations.map((conversation) => (
              <div
                key={conversation._id}
                onClick={() => handleSelectConversation(conversation)}
                className={`p-4 cursor-pointer hover:bg-gray-50 ${
                  selectedConversation?._id === conversation._id ? 'bg-amber-50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-gray-200 rounded-full p-2">
                      <User size={24} className="text-gray-600" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {conversation.customerName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {conversation.updatedAt ? formatTime(conversation.updatedAt) : 'New'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat View */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-gray-200 rounded-full p-2">
                  <User size={24} className="text-gray-600" />
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">
                    {selectedConversation.customerName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {selectedConversation.status === 'active' ? 'Online' : 'Offline'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <Phone size={20} />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <Video size={20} />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] ${
                      message.sender === 'agent'
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    } rounded-lg px-4 py-2`}
                  >
                    <div className="text-sm">{message.text}</div>
                    <div className="text-xs mt-1 opacity-70">
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>

                 
              ))}

              {showAssignModal && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
      <h2 className="text-lg font-semibold mb-4">Assign Chat</h2>
      <select
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
        value={selectedAgent}
        onChange={(e) => setSelectedAgent(e.target.value)}
      >
        <option value="">Select a team member</option>
        {availableAgents.map(agent => (
          <option key={agent._id} value={agent._id}>
            {agent.fullName} ({agent.email})
          </option>
        ))}
      </select>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowAssignModal(false)}
          className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={handleAssignAgent}
          disabled={!selectedAgent}
          className="px-4 py-2 text-white bg-amber-500 rounded-md"
        >
          Assign
        </button>
      </div>
    </div>
  </div>
)}

            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  className="p-2 text-white bg-amber-500 rounded-full hover:bg-amber-600 disabled:opacity-50"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare size={48} className="mx-auto text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No conversation selected</h3>
              <p className="mt-2 text-sm text-gray-500">
                Choose a conversation from the list to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

