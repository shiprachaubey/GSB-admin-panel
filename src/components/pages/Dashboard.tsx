import React from 'react';
import { 
  Video, 
  Film, 
  File, 
  MessageSquare, 
  Users, 
  Eye, 
  Download, 
  TrendingUp 
} from 'lucide-react';
import { DashboardStats } from '../../types';

// Mock data for demonstration
const mockStats: DashboardStats = {
  totalVideos: 245,
  totalPaidVideos: 142,
  totalFreeVideos: 103,
  totalDietPlans: 58,
  totalConsultancyRequests: 127,
  newRequestsCount: 18,
  videosThisMonth: 24,
  videoViews: 12549,
  pdfDownloads: 3421,
};

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex gap-2">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Videos" 
          value={mockStats.totalVideos} 
          icon={<Video className="text-indigo-600" size={24} />}
          detail={`${mockStats.totalFreeVideos} free, ${mockStats.totalPaidVideos} paid`}
          trend="+12% from last month"
          color="bg-indigo-50"
        />
        <StatCard 
          title="Diet Plans" 
          value={mockStats.totalDietPlans} 
          icon={<File className="text-green-600" size={24} />}
          detail={`${mockStats.pdfDownloads} downloads`}
          trend="+5% from last month"
          color="bg-green-50"
        />
        <StatCard 
          title="Consultancy Requests" 
          value={mockStats.totalConsultancyRequests} 
          icon={<MessageSquare className="text-amber-600" size={24} />}
          detail={`${mockStats.newRequestsCount} new requests`}
          trend="+18% from last month"
          color="bg-amber-50"
        />
        <StatCard 
          title="Video Views" 
          value={mockStats.videoViews.toLocaleString()} 
          icon={<Eye className="text-blue-600" size={24} />}
          detail="Average 512 views per video"
          trend="+24% from last month"
          color="bg-blue-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Uploads</h2>
            <a href="/videos" className="text-sm text-amber-600 hover:text-amber-800">View all</a>
          </div>
          <div className="space-y-4">
            {recentVideos.map((video) => (
              <div key={video.id} className="flex items-center p-3 hover:bg-gray-50 rounded-md transition-colors">
                <div className="relative h-16 w-24 flex-shrink-0 rounded-md overflow-hidden">
                  <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover" />
                  {video.access === 'paid' && (
                    <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-bl-md">
                      PAID
                    </div>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{video.title}</h3>
                  <p className="text-xs text-gray-500">{video.category} • {formatDate(video.uploadDate)}</p>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                  <Eye size={14} />
                  <span>{video.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Consultancy</h2>
            <a href="/consultancy" className="text-sm text-amber-600 hover:text-amber-800">View all</a>
          </div>
          <div className="space-y-4">
            {recentRequests.map((request) => (
              <div key={request.id} className="p-3 hover:bg-gray-50 rounded-md transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{request.name}</h3>
                    <p className="text-xs text-gray-500">{formatDate(request.date)}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    request.status === 'new' 
                      ? 'bg-amber-100 text-amber-800' 
                      : request.status === 'in-progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {request.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{request.message}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Category Distribution</h2>
          <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>All Time</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category.name} className="flex items-center p-4 border rounded-md">
              <div className={`p-3 rounded-full ${category.bgColor}`}>
                {category.icon}
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">{category.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">{category.count}</span>
                  <span className="text-xs text-gray-500">videos</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  detail: string;
  trend: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, detail, trend, color }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-md ${color}`}>{icon}</div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600">{detail}</p>
        <div className="flex items-center mt-1">
          <TrendingUp size={14} className="text-green-600" />
          <span className="text-xs font-medium text-green-600 ml-1">{trend}</span>
        </div>
      </div>
    </div>
  );
};

// Helper function to format dates
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

// Mock data
const recentVideos = [
  {
    id: '1',
    title: '10-Minute Morning Meditation for Energy',
    category: 'Meditation',
    thumbnail: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=300',
    access: 'free',
    uploadDate: '2025-05-10T12:00:00Z',
    views: 1243
  },
  {
    id: '2',
    title: 'Advanced Yoga Techniques for Back Pain',
    category: 'Fitness',
    thumbnail: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=300',
    access: 'paid',
    uploadDate: '2025-05-08T14:30:00Z',
    views: 876
  },
  {
    id: '3',
    title: 'Understanding Nutrition Basics',
    category: 'Education',
    thumbnail: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=300',
    access: 'free',
    uploadDate: '2025-05-05T09:15:00Z',
    views: 2104
  },
  {
    id: '4',
    title: 'Weight Loss Journey - Sara\'s Story',
    category: 'Success Stories',
    thumbnail: 'https://images.pexels.com/photos/6551144/pexels-photo-6551144.jpeg?auto=compress&cs=tinysrgb&w=300',
    access: 'paid',
    uploadDate: '2025-05-01T16:45:00Z',
    views: 1567
  }
];

const recentRequests = [
  {
    id: '1',
    name: 'Michael Johnson',
    date: '2025-05-10T08:12:00Z',
    status: 'new',
    message: 'I would like to know more about meditation techniques for anxiety and insomnia. What would you recommend for a beginner?'
  },
  {
    id: '2',
    name: 'Emily Davis',
    date: '2025-05-09T14:25:00Z',
    status: 'in-progress',
    message: 'I\'ve been following your nutrition plan for 2 weeks. While I see some improvements, I still struggle with afternoon cravings.'
  },
  {
    id: '3',
    name: 'Robert Wilson',
    date: '2025-05-08T11:30:00Z',
    status: 'resolved',
    message: 'Thank you for the personalized fitness plan. I\'ve lost 5kg in the last month and feel much more energetic.'
  }
];

const categories = [
  {
    name: 'Meditation',
    count: 87,
    icon: <Film size={24} className="text-amber-600" />,
    bgColor: 'bg-amber-100'
  },
  {
    name: 'Education',
    count: 63,
    icon: <Film size={24} className="text-blue-600" />,
    bgColor: 'bg-blue-100'
  },
  {
    name: 'Success Stories',
    count: 42,
    icon: <Film size={24} className="text-green-600" />,
    bgColor: 'bg-green-100'
  },
  {
    name: 'Fitness',
    count: 53,
    icon: <Film size={24} className="text-indigo-600" />,
    bgColor: 'bg-indigo-100'
  }
];