import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, SlidersHorizontal, Filter, Eye, Edit, Trash2, AlertTriangle, Package } from 'lucide-react';
import { Product } from '../../types';

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Divya Gashar Churna',
    description: 'Traditional Ayurvedic digestive supplement',
    price: 4999,
    discountedPrice: 4499,
    imageUrl: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'ayurvedic',
    stock: 150,
    sku: 'DGC001',
    manufacturer: 'Patanjali Ayurved',
    ingredients: ['Amla', 'Haritaki', 'Bahera'],
    benefits: ['Improves digestion', 'Reduces acidity', 'Relieves constipation'],
    dosage: '1-2 tablets twice daily after meals',
    sideEffects: ['None known when taken as directed'],
    status: 'in-stock',
    featured: true,
    createdAt: '2025-05-10T12:00:00Z',
    updatedAt: '2025-05-10T12:00:00Z'
  },
  {
    id: '2',
    name: 'Wellness Multivitamin Complex',
    description: 'Complete daily vitamin and mineral supplement',
    price: 1299,
    imageUrl: 'https://images.pexels.com/photos/4041393/pexels-photo-4041393.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'supplements',
    stock: 50,
    sku: 'WMC002',
    manufacturer: 'HealthPlus Labs',
    ingredients: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Zinc', 'Iron'],
    benefits: ['Boosts immunity', 'Increases energy', 'Supports overall health'],
    dosage: '1 tablet daily with meals',
    sideEffects: ['Mild stomach discomfort if taken on empty stomach'],
    status: 'low-stock',
    featured: false,
    createdAt: '2025-05-09T15:30:00Z',
    updatedAt: '2025-05-09T15:30:00Z'
  }
];

export const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | Product['category']>('all');

  // Filter products based on search term and category
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <div className="flex gap-2">
          <Link 
            to="/orders"
            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            View Orders
          </Link>
          <Link 
            to="/products/add"
            className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            <Plus size={18} className="mr-2" />
            Add New Product
          </Link>
        </div>
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
                placeholder="Search products..."
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
                onChange={(e) => setSelectedCategory(e.target.value as 'all' | Product['category'])}
              >
                <option value="all">All Categories</option>
                <option value="ayurvedic">Ayurvedic</option>
                <option value="supplements">Supplements</option>
                <option value="herbs">Herbs</option>
                <option value="wellness">Wellness</option>
              </select>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="all">All Status</option>
                    <option value="in-stock">In Stock</option>
                    <option value="low-stock">Low Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option>Name A-Z</option>
                    <option>Name Z-A</option>
                    <option>Price Low-High</option>
                    <option>Price High-Low</option>
                    <option>Newest First</option>
                    <option>Oldest First</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Featured</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="all">All Products</option>
                    <option value="featured">Featured Only</option>
                    <option value="non-featured">Non-Featured Only</option>
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                        <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full capitalize bg-gray-100 text-gray-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ₹{product.price.toLocaleString()}
                    </div>
                    {product.discountedPrice && (
                      <div className="text-xs text-green-600">
                        Sale: ₹{product.discountedPrice.toLocaleString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.stock} units
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.status === 'in-stock'
                        ? 'bg-green-100 text-green-800'
                        : product.status === 'low-stock'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status === 'low-stock' && <AlertTriangle size={12} className="mr-1" />}
                      {product.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/products/edit/${product.id}`} className="text-amber-600 hover:text-amber-900">
                        <Edit size={18} />
                      </Link>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
              <Package size={32} className="text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-2 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search or filters' : 'Add your first product to get started'}
            </p>
            {!searchTerm && (
              <Link
                to="/products/add"
                className="mt-4 inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
              >
                <Plus size={18} className="mr-2" />
                Add New Product
              </Link>
            )}
          </div>
        )}

        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredProducts.length}</span> of <span className="font-medium">{mockProducts.length}</span> products
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