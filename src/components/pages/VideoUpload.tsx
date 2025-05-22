import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Upload, X, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { ContentCategory, VideoAccess } from '../../types';

export const VideoUpload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ContentCategory>('meditation');
  const [access, setAccess] = useState<VideoAccess>('free');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  
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
  
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };
  
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoFile) {
      alert('Please select a video file');
      return;
    }
    
    setUploadStatus('uploading');
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('success');
          return 100;
        }
        return prev + 5;
      });
    }, 300);
    
    // In a real app, you would upload the file to a server here
    // For this demo, we'll just simulate a successful upload after a delay
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      setUploadStatus('success');
    }, 6000);
  };
  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('meditation');
    setAccess('free');
    setVideoFile(null);
    setThumbnailFile(null);
    setThumbnailPreview('');
    setUploadStatus('idle');
    setUploadProgress(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link to="/videos" className="mr-4 text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Upload New Video</h1>
      </div>

      {uploadStatus === 'success' ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Upload Successful!</h3>
          <p className="mt-2 text-sm text-gray-500">
            Your video "{title}" has been uploaded successfully.
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            <Link
              to="/videos"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View All Videos
            </Link>
            <button
              onClick={resetForm}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700"
            >
              Upload Another Video
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleUpload} className="space-y-6">
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
                      placeholder="Enter a descriptive title"
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
                      placeholder="Provide a detailed description of the video"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
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
                  </div>
                </div>
                
                <div className="space-y-6 md:col-span-1">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Thumbnail Image <span className="text-red-500">*</span>
                    </label>
                    
                    {!thumbnailPreview ? (
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-medium text-amber-600 hover:text-amber-500">
                            Click to upload
                          </span>{' '}
                          or drag and drop
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, GIF up to 2MB
                        </p>
                      </div>
                    ) : (
                      <div className="relative">
                        <img
                          src={thumbnailPreview}
                          alt="Thumbnail preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-gray-900 bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70"
                          onClick={() => {
                            setThumbnailPreview('');
                            setThumbnailFile(null);
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                    
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
                      Video File <span className="text-red-500">*</span>
                    </label>
                    
                    <div className="border border-gray-300 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            type="file"
                            id="video-upload"
                            className="sr-only"
                            accept="video/*"
                            onChange={handleVideoChange}
                          />
                          <label
                            htmlFor="video-upload"
                            className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                          >
                            Select File
                          </label>
                          {videoFile && (
                            <span className="ml-3 text-sm text-gray-700 truncate max-w-xs">
                              {videoFile.name}
                            </span>
                          )}
                        </div>
                        
                        {videoFile && (
                          <button
                            type="button"
                            className="ml-3 text-gray-400 hover:text-gray-600"
                            onClick={() => setVideoFile(null)}
                          >
                            <X size={18} />
                          </button>
                        )}
                      </div>
                      
                      {!videoFile && (
                        <p className="mt-2 text-xs text-gray-500">
                          MP4, WebM, or OGG format. Maximum file size 500MB.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {uploadStatus === 'uploading' && (
              <div className="bg-blue-50 p-4 border-t border-blue-100">
                <div className="flex items-center">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium text-blue-800">Uploading video...</div>
                      <div className="text-sm text-blue-800">{uploadProgress}%</div>
                    </div>
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                      <div
                        style={{ width: `${uploadProgress}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {uploadStatus === 'error' && (
              <div className="bg-red-50 p-4 border-t border-red-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      There was an error uploading your video. Please try again.
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
                disabled={uploadStatus === 'uploading' || !title || !description || !videoFile}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
                  (uploadStatus === 'uploading' || !title || !description || !videoFile) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload Video'}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};