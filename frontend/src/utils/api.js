
export const API_BASE_URL = 
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiRequest = async (endpoint, options = {}) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  // Determine if body is FormData (used for voice/audio recording uploads)
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;

  // Set default headers; omit Content-Type for FormData so browser sets boundary automatically
  const headers = {
    ...(!isFormData && { 'Content-Type': 'application/json' }),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  // Build config
  const config = {
    ...options,
    method: options.method || 'GET',
    headers,
  };

  // Stringify JSON body if it's an object and not FormData
  if (options.body && typeof options.body === 'object' && !isFormData) {
    config.body = JSON.stringify(options.body);
  }

  // Ensure leading slash on endpoint
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const fullUrl = `${API_BASE_URL}${cleanEndpoint}`;

  const response = await fetch(fullUrl, config);

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.error || 'Something went wrong across network layers.');
  }

  return data;
};

export default apiRequest;