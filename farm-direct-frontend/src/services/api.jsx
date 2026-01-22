import axios from 'axios';

// Create axios instance for API calls
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5 second timeout
});

// Product API functions
export const productAPI = {
  // Get all products
  getProducts: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products from API:', error.message);
      // Return sample data if API fails
      return {
        success: true,
        products: getSampleProducts()
      };
    }
  },

  // Get single product by ID
  getProduct: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Create new product (for farmers)
  createProduct: async (productData) => {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update product
  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
};

// Contact API functions
export const contactAPI = {
  // Submit contact form
  submitContact: async (formData) => {
    try {
      const response = await api.post('/contact', formData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form:', error.message);
      // Return success message even if API fails (for demo)
      return {
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      };
    }
  },

  // Get contact inquiries (for admin)
  getInquiries: async () => {
    try {
      const response = await api.get('/contact/inquiries');
      return response.data;
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      throw error;
    }
  }
};

// Auth API functions (optional - for login/register)
export const authAPI = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error.message);
      // Demo response for testing
      return {
        success: true,
        token: 'demo-token-' + Date.now(),
        user: {
          id: 1,
          name: email.split('@')[0],
          email: email,
          role: email.includes('farmer') ? 'farmer' : 'customer'
        }
      };
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Error registering:', error.message);
      // Demo response for testing
      return {
        success: true,
        token: 'demo-token-' + Date.now(),
        user: {
          id: 2,
          ...userData,
          role: 'customer'
        }
      };
    }
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Order API functions (optional)
export const orderAPI = {
  // Create order
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Get user orders
  getUserOrders: async () => {
    try {
      const response = await api.get('/orders/my-orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }
};

// Sample products data for fallback
const getSampleProducts = () => [
  {
    id: 1,
    name: 'Organic Tomatoes',
    category: 'vegetables',
    price: 80,
    unit: 'kg',
    farmer: 'Kumar Farm',
    rating: 4.5,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Fresh organic tomatoes grown without any pesticides or chemicals. Harvested daily from our sustainable farms.'
  },
  {
    id: 2,
    name: 'Fresh Milk',
    category: 'dairy',
    price: 60,
    unit: 'liter',
    farmer: 'Dairy Valley',
    rating: 4.8,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Pure, unprocessed milk from grass-fed cows. No additives or preservatives.'
  },
  {
    id: 3,
    name: 'Brown Eggs',
    category: 'poultry',
    price: 120,
    unit: 'dozen',
    farmer: 'Happy Hens Farm',
    rating: 4.7,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Free-range brown eggs from happy, healthy chickens. Raised in natural environments.'
  },
  {
    id: 4,
    name: 'Organic Rice',
    category: 'grains',
    price: 90,
    unit: 'kg',
    farmer: 'Green Fields',
    rating: 4.6,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Premium quality organic rice grown in fertile fields without chemical fertilizers.'
  },
  {
    id: 5,
    name: 'Fresh Carrots',
    category: 'vegetables',
    price: 50,
    unit: 'kg',
    farmer: 'Kumar Farm',
    rating: 4.4,
    stock: 60,
    image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Sweet and crunchy carrots grown in mineral-rich soil. Packed with beta-carotene.'
  },
  {
    id: 6,
    name: 'Pure Honey',
    category: 'others',
    price: 300,
    unit: 'kg',
    farmer: 'Bee Happy Farm',
    rating: 4.9,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Pure, raw honey from local wildflowers. No processing or heating involved.'
  },
  {
    id: 7,
    name: 'Fresh Apples',
    category: 'fruits',
    price: 70,
    unit: 'kg',
    farmer: 'Orchard Fresh',
    rating: 4.5,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Crisp, juicy apples from our mountain orchards. Grown using sustainable farming.'
  },
  {
    id: 8,
    name: 'Artisanal Cheese',
    category: 'dairy',
    price: 200,
    unit: 'kg',
    farmer: 'Dairy Valley',
    rating: 4.7,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Handcrafted cheese made from fresh cow milk. Aged to perfection for rich flavor.'
  }
];

// Cart functions (local storage - no API needed)
export const cartAPI = {
  getCart: () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  },

  addToCart: (product, quantity = 1) => {
    const cart = cartAPI.getCart();
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          unit: product.unit,
          farmer: product.farmer
        },
        quantity
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  },

  removeFromCart: (productId) => {
    const cart = cartAPI.getCart();
    const newCart = cart.filter(item => item.product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(newCart));
    return newCart;
  },

  clearCart: () => {
    localStorage.removeItem('cart');
    return [];
  },

  getCartTotal: () => {
    const cart = cartAPI.getCart();
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  },

  getCartCount: () => {
    const cart = cartAPI.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }
};

// Default export
export default api;