const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || `HTTP error! status: ${response.status}`
      };
    }

    return {
      success: true,
      data
    };
  } catch (error: any) {
    console.error('API Client fetch error:', error);
    return {
      success: false,
      error: error.message || 'Network request failed. Please check your internet connection.'
    };
  }
}
