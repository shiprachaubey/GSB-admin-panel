import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Upload, X, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

export const ProductUpload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [benefits, setBenefits] = useState('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setImagePreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setUploadStatus('uploading');
    
  //   // Simulate API call
  //   setTimeout(() => {
  //     setUploadStatus('success');
  //   }, 1500);
  // };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setUploadStatus('uploading');

  if (!imageFile || !name || !description || !price || !stock) {
    alert("Please fill in all required fields and upload an image.");
    setUploadStatus('idle');
    return;
  }

  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('price', price.toString());
  formData.append('stock', stock.toString());
  formData.append('image', imageFile); // ✅ Must match `req.file`

  // ✅ Convert arrays to JSON strings
  formData.append('ingredients', JSON.stringify(ingredients));
  formData.append('benefits', JSON.stringify(benefits));

  try {
    const response = await fetch('https://api.gsbpathy.com/api/products/products', {
      method: 'POST',
      body: formData,
    });

    const contentType = response.headers.get('content-type') || '';

    const result = contentType.includes('application/json')
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      throw new Error(result.message || 'Product upload failed');
    }

    console.log('Upload response:', result);
    setUploadStatus('success');
  } catch (error: any) {
    console.error('Upload error:', error);
    setUploadStatus('error');
    alert('Product upload failed: ' + (error.message || 'Unknown error'));
  }
};


  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setStock('');
    //setSku('');
   // setManufacturer('');
    setIngredients('');
    setBenefits('');
    //setDosage('');
    //setSideEffects('');
    setImageFile(null);
    setImagePreview('');
    setUploadStatus('idle');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link to="/products" className="mr-4 text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
      </div>

      {uploadStatus === 'success' ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Product Added Successfully!</h3>
          <p className="mt-2 text-sm text-gray-500">
            The product "{name}" has been added to your inventory.
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View All Products
            </Link>
            <button
              onClick={resetForm}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700"
            >
              Add Another Product
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Price (₹) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                        required
                      />
                    </div>

                    {/* <div>
                      <label htmlFor="discountedPrice" className="block text-sm font-medium text-gray-700 mb-1">
                        Discounted Price (₹)
                      </label>
                      <input
                        type="number"
                        id="discountedPrice"
                        value={discountedPrice}
                        onChange={(e) => setDiscountedPrice(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                      />
                    </div> */}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                        required
                      >
                        <option value="ayurvedic">Ayurvedic</option>
                        <option value="supplements">Supplements</option>
                        <option value="herbs">Herbs</option>
                        <option value="wellness">Wellness</option>
                      </select>
                    </div> */}

                    <div>
                      <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                        Stock <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                        required
                      />
                    </div>
                  </div>

              
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Image <span className="text-red-500">*</span>
                    </label>
                    
                    {!imagePreview ? (
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
                          src={imagePreview}
                          alt="Product preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-gray-900 bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70"
                          onClick={() => {
                            setImagePreview('');
                            setImageFile(null);
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
                      onChange={handleImageChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">
                      Ingredients <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="ingredients"
                      value={ingredients}
                      onChange={(e) => setIngredients(e.target.value)}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                      placeholder="Enter ingredients, separated by commas"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 mb-1">
                      Benefits <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="benefits"
                      value={benefits}
                      onChange={(e) => setBenefits(e.target.value)}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                      placeholder="Enter benefits, one per line"
                      required
                    />
                  </div>

                 

                </div>
              </div>
            </div>

            {uploadStatus === 'error' && (
              <div className="bg-red-50 p-4 border-t border-red-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      There was an error adding the product. Please try again.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="px-6 py-4 bg-gray-50 text-right">
              <Link
                to="/products"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mr-3"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={uploadStatus === 'uploading'}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
                  uploadStatus === 'uploading' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {uploadStatus === 'uploading' ? 'Adding Product...' : 'Add Product'}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};