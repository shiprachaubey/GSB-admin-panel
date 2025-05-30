// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Plus, Search, Filter, Download, Edit, Trash2, File } from 'lucide-react';
// import { DietPlan } from '../../types';

// // Mock data
// const mockDietPlans: DietPlan[] = [
//   {
//     id: '1',
//     title: 'Keto Diet Plan - 30 Days',
//     description: 'Complete 30-day ketogenic diet plan with recipes and shopping lists.',
//     thumbnailUrl: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=300',
//     fileUrl: 'https://example.com/files/keto-diet-plan.pdf',
//     createdAt: '2025-05-10T12:00:00Z',
//     updatedAt: '2025-05-10T12:00:00Z',
//     status: 'published',
//     downloads: 1243
//   },
//   {
//     id: '2',
//     title: 'Vegetarian Protein Guide',
//     description: 'Complete guide to protein sources for vegetarians with meal plans.',
//     thumbnailUrl: 'https://images.pexels.com/photos/1660027/pexels-photo-1660027.jpeg?auto=compress&cs=tinysrgb&w=300',
//     fileUrl: 'https://example.com/files/vegetarian-protein-guide.pdf',
//     createdAt: '2025-05-08T14:30:00Z',
//     updatedAt: '2025-05-09T10:15:00Z',
//     status: 'published',
//     downloads: 876
//   },
//   {
//     id: '3',
//     title: 'Weight Loss Meal Plan - 1500 Calories',
//     description: 'Balanced 1500 calorie meal plan for sustainable weight loss.',
//     thumbnailUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=300',
//     fileUrl: 'https://example.com/files/weight-loss-1500.pdf',
//     createdAt: '2025-05-05T09:15:00Z',
//     updatedAt: '2025-05-05T09:15:00Z',
//     status: 'published',
//     downloads: 2104
//   },
//   {
//     id: '4',
//     title: 'Diabetic-Friendly Recipe Collection',
//     description: 'Low-glycemic recipes suitable for people with diabetes.',
//     thumbnailUrl: 'https://images.pexels.com/photos/5966431/pexels-photo-5966431.jpeg?auto=compress&cs=tinysrgb&w=300',
//     fileUrl: 'https://example.com/files/diabetic-recipes.pdf',
//     createdAt: '2025-05-01T16:45:00Z',
//     updatedAt: '2025-05-02T08:30:00Z',
//     status: 'draft',
//     downloads: 0
//   }
// ];

// // Format date
// const formatDate = (dateString: string): string => {
//   const date = new Date(dateString);
//   return new Intl.DateTimeFormat('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric'
//   }).format(date);
// };

// export const DietPlans: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showFilters, setShowFilters] = useState(false);

//   // Filter diet plans based on search term
//   const filteredDietPlans = mockDietPlans.filter(plan => {
//     const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                           plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    
//     return matchesSearch;
//   });

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//         <h1 className="text-2xl font-bold text-gray-900">Diet Plans</h1>
//         <Link 
//           to="/diet-plans/upload"
//           className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
//         >
//           <Plus size={18} className="mr-2" />
//           Upload New Plan
//         </Link>
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
//                 placeholder="Search diet plans..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             {/* <div className="flex gap-2">
//               <button 
//                 className="inline-flex items-center px-3 py-2 border border-gray-300 bg-white rounded-md hover:bg-gray-50"
//                 onClick={() => setShowFilters(!showFilters)}
//               >
//                 <Filter size={18} className="mr-2 text-gray-500" />
//                 Filters
//               </button>
//               <select className="border border-gray-300 rounded-md px-3 py-2">
//                 <option>All Status</option>
//                 <option>Published</option>
//                 <option>Draft</option>
//                 <option>Archived</option>
//               </select>
//             </div> */}
//           </div>
          
//           {showFilters && (
//             <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
//               <div className="flex flex-col md:flex-row gap-4">
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
//                   <select className="w-full border border-gray-300 rounded-md px-3 py-2">
//                     <option>Newest First</option>
//                     <option>Oldest First</option>
//                     <option>Most Downloaded</option>
//                     <option>Title A-Z</option>
//                     <option>Title Z-A</option>
//                   </select>
//                 </div>
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Date Added</label>
//                   <select className="w-full border border-gray-300 rounded-md px-3 py-2">
//                     <option>All Time</option>
//                     <option>Last 7 Days</option>
//                     <option>Last 30 Days</option>
//                     <option>Last 90 Days</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//            <thead className="bg-gray-50">
//   <tr>
//     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//       Diet Plan
//     </th>
//     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//       Date Added
//     </th>
//   </tr>
// </thead>

//        <tbody className="bg-white divide-y divide-gray-200">
//   {filteredDietPlans.map((plan) => (
//     <tr key={plan.id} className="hover:bg-gray-50">
//       <td className="px-6 py-4 whitespace-nowrap">
//         <div className="flex items-center">
//           <div className="h-16 w-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
//             {plan.thumbnailUrl ? (
//               <img src={plan.thumbnailUrl} alt={plan.title} className="h-full w-full object-cover" />
//             ) : (
//               <File size={24} className="text-gray-400" />
//             )}
//           </div>
//           <div className="ml-4">
//             <div className="text-sm font-medium text-gray-900">{plan.title}</div>
//             <div className="text-sm text-gray-500 line-clamp-1">{plan.description}</div>
//           </div>
//         </div>
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//         {formatDate(plan.createdAt)}
//       </td>
//     </tr>
//   ))}
// </tbody>

//           </table>
//         </div>

//         {filteredDietPlans.length === 0 && (
//           <div className="p-8 text-center">
//             <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
//               <File size={32} className="text-gray-400" />
//             </div>
//             <h3 className="mt-4 text-lg font-medium text-gray-900">No diet plans found</h3>
//             <p className="mt-2 text-sm text-gray-500">
//               {searchTerm ? 'Try adjusting your search or filters' : 'Upload your first diet plan to get started'}
//             </p>
//             {!searchTerm && (
//               <Link
//                 to="/diet-plans/upload"
//                 className="mt-4 inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
//               >
//                 <Plus size={18} className="mr-2" />
//                 Upload New Plan
//               </Link>
//             )}
//           </div>
//         )}

//         <div className="p-4 border-t border-gray-200 flex items-center justify-between">
//           <div className="text-sm text-gray-500">
//             Showing <span className="font-medium">{filteredDietPlans.length}</span> of <span className="font-medium">{mockDietPlans.length}</span> diet plans
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
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Trash2, File } from 'lucide-react';
import { DietPlan } from '../../types';

export const DietPlans: React.FC = () => {
  const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:9000/api/dietplans/get-pdf')
      .then(res => res.json())
      .then(data => setDietPlans(data.data))
      .catch(err => console.error('Failed to fetch diet plans:', err));
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this diet plan?');
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:9000/api/dietplans/${id}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      if (response.ok) {
        setDietPlans(prev => prev.filter(plan => plan._id !== id));
        alert('Diet plan deleted successfully!');
      } else {
        alert(`Failed to delete diet plan: ${result.message}`);
      }
    } catch (error) {
      console.error('Error deleting diet plan:', error);
      alert('An error occurred while deleting the diet plan.');
    }
  };

  const filteredDietPlans = dietPlans.filter(plan =>
    plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };


  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
const [showModal, setShowModal] = useState(false);

const openPdfModal = (pdfUrl: string) => {
  setSelectedPdfUrl(pdfUrl);
  setShowModal(true);
};

const closeModal = () => {
  setSelectedPdfUrl(null);
  setShowModal(false);
};


  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Diet Plans</h1>
        <Link to="/diet-plans/upload" className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors">
          <Plus size={18} className="mr-2" />
          Upload New Plan
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
              placeholder="Search diet plans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diet Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDietPlans.map((plan) => (
                <tr key={plan._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
  className="h-16 w-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer"
  onClick={() => openPdfModal(plan.pdfUrl)}
>
  {plan.thumbnailUrl ? (
    <img src={plan.thumbnailUrl} alt={plan.title} className="h-full w-full object-cover" />
  ) : (
    <File size={24} className="text-gray-400" />
  )}
</div>

                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{plan.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{plan.description}</div>
                      </div>
                    </div>
                    
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => handleDelete(plan._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete Diet Plan"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

            {showModal && selectedPdfUrl && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
    <div className="relative w-[90%] h-[90%] bg-white rounded-lg shadow-lg overflow-hidden">
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-1 hover:bg-red-600"
      >
        ✕
      </button>
      <iframe
        src={selectedPdfUrl}
        title="PDF Viewer"
        className="w-full h-full"
      />
    </div>
  </div>
)}

          </table>
        </div>

        {filteredDietPlans.length === 0 && (
          <div className="p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
              <File size={32} className="text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No diet plans found</h3>
            <p className="mt-2 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search or filters' : 'Upload your first diet plan to get started'}
            </p>
          </div>
        )}
      </div>
    </div>



  );
};
