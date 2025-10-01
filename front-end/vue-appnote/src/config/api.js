const API_BASE_URL = 'http://localhost:3002/api'; // Đổi từ 3000 sang 3002

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      ...options.headers
    },
    ...options,
    credentials: 'include'
  };

  // Chỉ thêm Content-Type cho JSON, FormData sẽ tự động set Content-Type
  if (!(options.body instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }

  try {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log('[API] Request:', {
      url,
      method: options.method || 'GET',
      headers: config.headers
    });

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

export default API_BASE_URL;
