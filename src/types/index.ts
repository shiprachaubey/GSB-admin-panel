export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super-admin';
  avatar?: string;
};

export type ContentCategory = 
  | 'meditation'
  | 'education'
  | 'success-stories'
  | 'fitness'
  | 'diet-plans';

export type VideoAccess = 'free' | 'paid';

export type VideoContent = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  category: ContentCategory;
  access: VideoAccess;
  duration: number; // in seconds
  createdAt: string;
  updatedAt: string;
  status: 'published' | 'draft' | 'archived';
  views: number;
};

export type DietPlan = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
  status: 'published' | 'draft' | 'archived';
  downloads: number;
};

export type ConsultancyRequest = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'in-progress' | 'resolved';
  createdAt: string;
  assignedTo?: string;
  notes?: string;
};

export type DashboardStats = {
  totalVideos: number;
  totalPaidVideos: number;
  totalFreeVideos: number;
  totalDietPlans: number;
  totalConsultancyRequests: number;
  newRequestsCount: number;
  videosThisMonth: number;
  videoViews: number;
  pdfDownloads: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  imageUrl: string;
  category: 'ayurvedic' | 'supplements' | 'herbs' | 'wellness';
  stock: number;
  sku: string;
  manufacturer: string;
  ingredients?: string[];
  benefits?: string[];
  dosage?: string;
  sideEffects?: string[];
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Order = {
  id: string;
  userId: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
  updatedAt: string;
};