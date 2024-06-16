// src/services/api.js

const BASE_URL = 'http://172.16.165.17:8000/api';

const fetchOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
};

export const fetchMenuItems = async () => {
  try {
    const response = await fetch(`${BASE_URL}/menu`, fetchOptions);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error; // Rethrow the error to propagate it further
  }
};


