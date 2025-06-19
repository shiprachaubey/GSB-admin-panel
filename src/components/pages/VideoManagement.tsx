import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Film, Trash2 } from 'lucide-react';
import { VideoContent, ContentCategory, VideoAccess } from '../../types';

// Category display styles
const categoryDisplay: Record<ContentCategory, { name: string; color: string }> = {
  meditation: { name: 'Meditation', color: 'bg-amber-100 text-amber-800' },
  education: { name: 'Education', color: 'bg-blue-100 text-blue-800' },
  'success-stories': { name: 'Success Stories', color: 'bg-green-100 text-green-800' },
  fitness: { name: 'Fitness', color: 'bg-indigo-100 text-indigo-800' },
  'diet-plans': { name: 'Diet Plans', color: 'bg-purple-100 text-purple-800' },
};

// Duration formatter
const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return hours > 0
    ? `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    : `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Date formatter
const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString));
};

export const VideoManagement: React.FC = () => {
  const [videos, setVideos] = useState<VideoContent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ContentCategory | 'all'>('all');
  const [selectedAccess, setSelectedAccess] = useState<VideoAccess | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch videos on mount
 useEffect(() => {
  const fetchVideos = async () => {
    try {
      const response = await fetch('http://13.60.227.51:9000/api/videos/all-videos');
      const result = await response.json();
      setVideos(result.videos); // ✅ this matches your actual response structure
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  fetchVideos();
}, []);


const handleDelete = async (id: string) => {
  const confirmed = window.confirm('Are you sure you want to delete this video?');
  if (!confirmed) return;

  try {
    const response = await fetch(`http://13.60.227.51:9000/api/videos/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();
    if (response.ok) {
      setVideos(prev => prev.filter(video => video._id !== id));
      alert('Video deleted successfully!');
    } else {
      alert(`Failed to delete video: ${result.message}`);
    }
  } catch (error) {
    console.error('Error deleting video:', error);
    alert('An error occurred while deleting the video.');
  }
};


  // Filter logic
  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesAccess = selectedAccess === 'all' || video.accessLevel === selectedAccess;
    return matchesSearch && matchesCategory && matchesAccess;
  });


  const [showPlayer, setShowPlayer] = useState(false);
const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

const openPlayer = (url: string) => {
  setSelectedVideoUrl(url);
  setShowPlayer(true);
};

const closePlayer = () => {
  setSelectedVideoUrl(null);
  setShowPlayer(false);
};


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
                {Object.entries(categoryDisplay).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.name}
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
                    <option value="Free">Free</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Video</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
           <tbody className="bg-white divide-y divide-gray-200">
  {filteredVideos.map((video) => (
    <tr key={video._id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        {/* <div className="flex items-center">
          <div className="h-16 w-24 flex-shrink-0 rounded-md overflow-hidden">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{video.title}</div>
            <div className="text-sm text-gray-500 line-clamp-1">{video.description}</div>
          </div>
        </div> */}
        <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => openPlayer(video.videoUrl)}>
  <div className="flex items-center">
    <div className="h-16 w-24 flex-shrink-0 rounded-md overflow-hidden">
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="h-full w-full object-cover"
      />
    </div>
    <div className="ml-4">
      <div className="text-sm font-medium text-gray-900">{video.title}</div>
      <div className="text-sm text-gray-500 line-clamp-1">{video.description}</div>
    </div>
  </div>
</td>

      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            categoryDisplay[video.category as ContentCategory]?.color || 'bg-gray-100 text-gray-800'
          }`}
        >
          {categoryDisplay[video.category as ContentCategory]?.name || video.category}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 py-1 text-xs rounded-md ${
            video.accessLevel === 'Free'
              ? 'bg-green-100 text-green-800'
              : 'bg-amber-100 text-amber-800'
          }`}
        >
          {video.accessLevel}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <button
          onClick={() => handleDelete(video._id)}
          className="text-red-500 hover:text-red-700"
          title="Delete Video"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
{showPlayer && selectedVideoUrl && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
    <div className="relative bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-3xl p-4">
      <button
        onClick={closePlayer}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
      >
        ✕
      </button>
      <div className="aspect-w-16 aspect-h-9 w-full">
        <video controls className="w-full h-auto rounded" src={selectedVideoUrl} />
      </div>
    </div>
  </div>
)}

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
            Showing <span className="font-medium">{filteredVideos.length}</span> of{' '}
            <span className="font-medium">{videos.length}</span> videos
          </div>
        </div>
      </div>
    </div>
  );
};
