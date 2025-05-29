import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, SlidersHorizontal, Filter, Eye, Edit, Trash2, CheckCircle, XCircle, Film } from 'lucide-react';
import { VideoContent, ContentCategory, VideoAccess } from '../../types';

// Mock data
const mockVideos: VideoContent[] = [
  {
    id: '1',
    title: '10-Minute Morning Meditation for Energy',
    description: 'Start your day with this quick meditation to boost your energy and focus.',
    thumbnailUrl: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=300',
    videoUrl: 'https://example.com/videos/meditation-1.mp4',
    category: 'meditation',
    access: 'free',
    duration: 600, // 10 minutes
    createdAt: '2025-05-10T12:00:00Z',
    updatedAt: '2025-05-10T12:00:00Z',
    status: 'published',
    views: 1243
  },
  {
    id: '2',
    title: 'Advanced Yoga Techniques for Back Pain',
    description: 'Learn specific yoga poses to alleviate chronic back pain and improve spinal health.',
    thumbnailUrl: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=300',
    videoUrl: 'https://example.com/videos/fitness-1.mp4',
    category: 'fitness',
    access: 'paid',
    duration: 1800, // 30 minutes
    createdAt: '2025-05-08T14:30:00Z',
    updatedAt: '2025-05-09T10:15:00Z',
    status: 'published',
    views: 876
  },
  {
    id: '3',
    title: 'Understanding Nutrition Basics',
    description: 'A comprehensive introduction to nutrition principles and how they affect your health.',
    thumbnailUrl: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=300',
    videoUrl: 'https://example.com/videos/education-1.mp4',
    category: 'education',
    access: 'free',
    duration: 1500, // 25 minutes
    createdAt: '2025-05-05T09:15:00Z',
    updatedAt: '2025-05-05T09:15:00Z',
    status: 'published',
    views: 2104
  },
  {
    id: '4',
    title: 'Weight Loss Journey - Sara\'s Story',
    description: 'Sara shares her inspiring story of losing 50 pounds and transforming her lifestyle.',
    thumbnailUrl: 'https://images.pexels.com/photos/6551144/pexels-photo-6551144.jpeg?auto=compress&cs=tinysrgb&w=300',
    videoUrl: 'https://example.com/videos/success-1.mp4',
    category: 'success-stories',
    access: 'paid',
    duration: 1200, // 20 minutes
    createdAt: '2025-05-01T16:45:00Z',
    updatedAt: '2025-05-02T08:30:00Z',
    status: 'published',
    views: 1567
  },
  {
    id: '5',
    title: 'Deep Relaxation Meditation for Sleep',
    description: 'This guided meditation will help you unwind and prepare for a restful night\'s sleep.',
    thumbnailUrl: 'https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=300',
    videoUrl: 'https://example.com/videos/meditation-2.mp4',
    category: 'meditation',
    access: 'paid',
    duration: 1800, // 30 minutes
    createdAt: '2025-04-28T20:00:00Z',
    updatedAt: '2025-04-28T20:00:00Z',
    status: 'published',
    views: 3210
  },
  {
    id: '6',
    title: 'HIIT Workout for Beginners',
    description: 'A beginner-friendly high-intensity interval training workout for overall fitness.',
    thumbnailUrl: 'https://images.pexels.com/photos/4662438/pexels-photo-4662438.jpeg?auto=compress&cs=tinysrgb&w=300',
    videoUrl: 'https://example.com/videos/fitness-2.mp4',
    category: 'fitness',
    access: 'free',
    duration: 1500, // 25 minutes
    createdAt: '2025-04-25T15:30:00Z',
    updatedAt: '2025-04-25T15:30:00Z',
    status: 'draft',
    views: 0
  }
];

// Format duration from seconds to mm:ss or hh:mm:ss
const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
};

// Format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

// Category display names and colors
const categoryDisplay: Record<ContentCategory, { name: string, color: string }> = {
  'meditation': { name: 'Meditation', color: 'bg-amber-100 text-amber-800' },
  'education': { name: 'Education', color: 'bg-blue-100 text-blue-800' },
  'success-stories': { name: 'Success Stories', color: 'bg-green-100 text-green-800' },
  'fitness': { name: 'Fitness', color: 'bg-indigo-100 text-indigo-800' },
  // 'diet-plans': { name: 'Diet Plans', color: 'bg-purple-100 text-purple-800' }
};

export const VideoManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ContentCategory | 'all'>('all');
  const [selectedAccess, setSelectedAccess] = useState<VideoAccess | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Filter videos based on search term and filters
  const filteredVideos = mockVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesAccess = selectedAccess === 'all' || video.access === selectedAccess;
    
    return matchesSearch && matchesCategory && matchesAccess;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Video Management</h1>
        <Link 
          to="/videos/upload"
          className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Upload New Video
        </Link>
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
                placeholder="Search videos..."
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
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ContentCategory | 'all')}
              >
                <option value="all">All Categories</option>
                {Object.keys(categoryDisplay).map(category => (
                  <option key={category} value={category}>
                    {categoryDisplay[category as ContentCategory].name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Access Level</label>
                  <select 
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={selectedAccess}
                    onChange={(e) => setSelectedAccess(e.target.value as VideoAccess | 'all')}
                  >
                    <option value="all">All Access Levels</option>
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="all">All Statuses</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="most-viewed">Most Viewed</option>
                    <option value="title-az">Title A-Z</option>
                    <option value="title-za">Title Z-A</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            {/* <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Video
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Access
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Added
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead> */}

            <thead className="bg-gray-50">
  <tr>
    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Video
    </th>
    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Category
    </th>
    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Access
    </th>
  </tr>
</thead>

         <tbody className="bg-white divide-y divide-gray-200">
  {filteredVideos.map((video) => (
    <tr key={video.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-16 w-24 flex-shrink-0 rounded-md overflow-hidden">
            <img src={video.thumbnailUrl} alt={video.title} className="h-full w-full object-cover" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{video.title}</div>
            <div className="text-sm text-gray-500 line-clamp-1">{video.description}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 text-xs rounded-full ${categoryDisplay[video.category].color}`}>
          {categoryDisplay[video.category].name}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 text-xs rounded-md ${
          video.access === 'free' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-amber-100 text-amber-800'
        }`}>
          {video.access === 'free' ? 'Free' : 'Paid'}
        </span>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>

        {filteredVideos.length === 0 && (
          <div className="p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
              <Film size={32} className="text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No videos found</h3>
            <p className="mt-2 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search or filters' : 'Upload your first video to get started'}
            </p>
            {!searchTerm && (
              <Link
                to="/videos/upload"
                className="mt-4 inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
              >
                <Plus size={18} className="mr-2" />
                Upload New Video
              </Link>
            )}
          </div>
        )}

        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredVideos.length}</span> of <span className="font-medium">{mockVideos.length}</span> videos
          </div>
          <nav className="flex items-center">
            <button className="px-3 py-1 border border-gray-300 rounded-l-md bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 border-l-0 bg-white hover:bg-gray-50">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 border-l-0 rounded-r-md bg-white hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};