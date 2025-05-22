import React, { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Upload, X, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { ContentCategory, VideoAccess, VideoContent } from '../../types';

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
  }
];

export const VideoEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Find the video with the matching id
  const videoData = mockVideos.find(video => video.id === id);
  
  const [title, setTitle] = useState(videoData?.title || '');
  const [description, setDescription] = useState(videoData?.description || '');
  const [category, setCategory] = useState<ContentCategory>(videoData?.category || 'meditation');
  const [access, setAccess] = useState<VideoAccess>(videoData?.access || 'free');
  const [status, setStatus] = useState(videoData?.status || 'published');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(videoData?.thumbnailUrl || '');
  const [updateStatus, setUpdateStatus] = useState<'idle' | 'updating' | 'success' | 'error'>('idle');
  
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnailFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setThumbnailPreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setUpdateStatus('updating');
    
    // In a real app, you would update the video data on a server here
    // For this demo, we'll just simulate a successful update after a delay
    setTimeout(() => {
      setUpdateStatus('success');
    }, 1500);
  };

  // If video not found
  if (!videoData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Link to="/videos" className="mr-4 text-gray-600 hover:text-gray-900">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Edit Video</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
            <AlertCircle size={32} className="text-red-600" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Video Not Found</h3>
          <p className="mt-2 text-sm text-gray-500">
            The video you are trying to edit does not exist or has been removed.
          </p>
          <div className="mt-6">
            <Link
              to="/videos"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700"
            >
              Return to Videos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link to="/videos" className="mr-4 text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Video</h1>
      </div>

      {updateStatus === 'success' ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Update Successful!</h3>
          <p className="mt-2 text-sm text-gray-500">
            The video "{title}" has been updated successfully.
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            <Link
              to="/videos"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View All Videos
            </Link>
            <button
              onClick={() => setUpdateStatus('idle')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700"
            >
              Continue Editing
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Video Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6 md:col-span-1">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Video Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value as ContentCategory)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                        required
                      >
                        <option value="meditation">Meditation</option>
                        <option value="education">Education</option>
                        <option value="success-stories">Success Stories</option>
                        <option value="fitness">Fitness</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="access" className="block text-sm font-medium text-gray-700 mb-1">
                        Access Level <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="access"
                        value={access}
                        onChange={(e) => setAccess(e.target.value as VideoAccess)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                        required
                      >
                        <option value="free">Free</option>
                        <option value="paid">Paid</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                        Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                        required
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6 md:col-span-1">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Thumbnail Image
                    </label>
                    
                    <div className="relative mb-3">
                      <img
                        src={thumbnailPreview}
                        alt="Video thumbnail"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          className="bg-white text-gray-800 px-3 py-1 rounded-md text-sm font-medium"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Change Thumbnail
                        </button>
                      </div>
                    </div>
                    
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Video Details
                    </label>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Duration</p>
                          <p className="font-medium text-gray-900">
                            {Math.floor(videoData.duration / 60)}:{String(videoData.duration % 60).padStart(2, '0')}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Views</p>
                          <p className="font-medium text-gray-900">{videoData.views.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Uploaded On</p>
                          <p className="font-medium text-gray-900">
                            {new Date(videoData.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Last Updated</p>
                          <p className="font-medium text-gray-900">
                            {new Date(videoData.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Video Preview
                    </label>
                    <div className="bg-gray-900 rounded-md overflow-hidden">
                      <img
                        src={videoData.thumbnailUrl}
                        alt="Video preview"
                        className="w-full h-32 object-cover opacity-50"
                      />
                      <div className="flex justify-center p-3">
                        <button 
                          type="button" 
                          className="px-3 py-1 bg-amber-600 text-white rounded-md text-sm hover:bg-amber-700"
                        >
                          Play Video
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {updateStatus === 'error' && (
              <div className="bg-red-50 p-4 border-t border-red-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      There was an error updating the video. Please try again.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="px-6 py-4 bg-gray-50 text-right">
              <Link
                to="/videos"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mr-3"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={updateStatus === 'updating'}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
                  updateStatus === 'updating' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {updateStatus === 'updating' ? 'Updating...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};