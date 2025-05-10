import React, { useState, useEffect, useCallback } from 'react';
import './Home.css';

const CLOUDINARY_CLOUD_NAME = 'dasm9k1z9';
const CLOUDINARY_UPLOAD_PRESET = 'fsad_preset';

const initialFormState = {
  productId: '',
  productName: '',
  subTitle: '',
  originalPrice: '',
  discountedPrice: '',
  offerPercentage: '',
  productType: '',
  image: ''
};

const productTypes = [
  'FarmFresh',
  'DailyBasket',
  'Decoratives',
  'Cosmetics',
  'Electronics',
  'Cleaners'
];

const Home = () => {
  const [deleteId, setDeleteId] = useState('');
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [editId, setEditId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch all products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8080/products");
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Fetch products error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.productName.trim()) {
      throw new Error('Product name is required');
    }
    if (parseFloat(formData.discountedPrice) >= parseFloat(formData.originalPrice)) {
      throw new Error('Discounted price must be less than original price');
    }
    if (!formData.image) {
      throw new Error('Product image is required');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      validateForm();

      const endpoint = isEditing 
        ? `http://localhost:8080/products/${editId}`
        : "http://localhost:8080/products";

      const method = isEditing ? "PUT" : "POST";

      const productData = isEditing 
        ? formData 
        : { 
            ...formData, 
            productId: Math.floor(1000 + Math.random() * 9000) 
          };

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${isEditing ? 'update' : 'add'} product`);
      }

      const message = `Product ${isEditing ? 'updated' : 'added'} successfully!`;
      setSuccessMessage(message);
      resetForm();
      await fetchProducts();
    } catch (err) {
      console.error('Submit error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (productId) => {
    const productToEdit = products.find(p => p.productId === productId);
    if (productToEdit) {
      setFormData(productToEdit);
      setEditId(productId);
      setIsEditing(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setEditId('');
    setIsEditing(false);
    setError(null);
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file?.type.startsWith('image/')) {
      setError('Please drop a valid image file');
      return;
    }

    try {
      setIsLoading(true);
      const imageUrl = await uploadToCloudinary(file);
      setFormData(prev => ({ ...prev, image: imageUrl }));
    } catch (err) {
      console.error('Image upload error:', err);
      setError('Error uploading image: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
      { method: 'POST', body: formData }
    );

    if (!response.ok) {
      throw new Error('Image upload failed');
    }

    const data = await response.json();
    return data.secure_url;
  };

  const deleteProduct = async () => {
    if (!deleteId) {
      setError('Please enter a product ID to delete');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:8080/products/delete/${deleteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setSuccessMessage('Product deleted successfully!');
      setDeleteId('');
      await fetchProducts();
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const carouselImages = [
    'https://res.cloudinary.com/dasm9k1z9/image/upload/v1746800849/j7qtlpnrknyzzox1zl2n.jpg',
    'https://res.cloudinary.com/dasm9k1z9/image/upload/v1746800882/cg1rvwi60oca8wkrnavq.jpg',
    'https://res.cloudinary.com/dasm9k1z9/image/upload/v1746800921/i92l1m7eapw084iabg94.jpg',
    'https://res.cloudinary.com/dasm9k1z9/image/upload/v1746800954/fbehyii2orsxmrqz8zzn.jpg'
  ];

  return (
    <div className="home-container">
      {/* Carousel Section */}
      <div id="groceryCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {carouselImages.map((_, index) => (
            <button 
              key={index}
              type="button" 
              data-bs-target="#groceryCarousel" 
              data-bs-slide-to={index} 
              className={index === 0 ? 'active' : ''} 
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="carousel-inner">
          {carouselImages.map((img, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <img
                src={img}
                className="d-block w-100"
                alt={`Grocery Store ${index + 1}`}
              />
            </div>
          ))}
        </div>
        
        <button className="carousel-control-prev" type="button" data-bs-target="#groceryCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#groceryCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Admin Section */}
      <div className="admin-container">
        {/* Product Form */}
        <div className="form-container">
          <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
          
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          
          <form onSubmit={handleSubmit}>
            {isEditing && (
              <div className="form-group">
                <label>Product ID:</label>
                <input
                  type="text"
                  value={formData.productId}
                  readOnly
                  className="read-only"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="productName">Product Name*</label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="subTitle">Description*</label>
              <textarea
                id="subTitle"
                name="subTitle"
                value={formData.subTitle}
                onChange={handleChange}
                required
                disabled={isLoading}
                rows="3"
              />
            </div>

            <div className="price-group">
              <div className="form-group">
                <label htmlFor="originalPrice">Original Price*</label>
                <input
                  type="number"
                  id="originalPrice"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="discountedPrice">Discounted Price*</label>
                <input
                  type="number"
                  id="discountedPrice"
                  name="discountedPrice"
                  value={formData.discountedPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="offerPercentage">Offer %*</label>
                <input
                  type="number"
                  id="offerPercentage"
                  name="offerPercentage"
                  value={formData.offerPercentage}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="productType">Product Type*</label>
              <select
                id="productType"
                name="productType"
                value={formData.productType}
                onChange={handleChange}
                required
                disabled={isLoading}
              >
                <option value="">Select a type</option>
                {productTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Image Upload*</label>
              <div
                className={`drop-area ${isDragging ? 'hover' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input').click()}
              >
                {formData.image ? (
                  <>
                    <img src={formData.image} alt="Preview" className="image-preview" />
                    <p className="upload-hint">Click or drop to replace</p>
                  </>
                ) : (
                  <>
                    <div className="upload-icon">📁</div>
                    <p>Drag and drop image here</p>
                    <p className="upload-hint">or click to select</p>
                  </>
                )}
              </div>
              <input
                type="file"
                id="file-input"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    try {
                      setIsLoading(true);
                      const url = await uploadToCloudinary(file);
                      setFormData(prev => ({ ...prev, image: url }));
                    } catch (err) {
                      setError('Error uploading image: ' + err.message);
                    } finally {
                      setIsLoading(false);
                    }
                  }
                }}
              />
              <input
                type="url"
                placeholder="Or paste image URL"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                disabled={isLoading}
              />
            </div>

            <div className="form-actions">
              <button type="submit" disabled={isLoading} className="btn-primary">
                {isLoading ? 'Processing...' : (isEditing ? 'Update Product' : 'Add Product')}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-secondary"
                  disabled={isLoading}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Delete Product Section */}
        <div className="delete-container">
          <h3>Delete Product</h3>
          <div className="delete-controls">
            <input 
              type="number" 
              placeholder="Enter Product ID" 
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
              disabled={isLoading}
            />
            <button 
              onClick={deleteProduct} 
              disabled={isLoading || !deleteId}
              className="btn-danger"
            >
              Delete Product
            </button>
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;