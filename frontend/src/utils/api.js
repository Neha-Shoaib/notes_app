const BASE_URL = "notesapp-production-4e00.up.railway.app";

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  const config = {
    method: options.method || 'GET',
    headers,
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const fullUrl = `${BASE_URL}${cleanEndpoint}`;

  // 🚀 Let's execute the fetch securely
  const response = await fetch(fullUrl, config);
  
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong across network layers.');
  }

  return data;
};