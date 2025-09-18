// API Connection Test Utility
import apiClient from './apiClient';

export const testApiConnection = async () => {
  console.log('=== API Connection Test ===');
  
  try {
    // Test basic connectivity
    console.log('Testing API connectivity...');
    
    // You can replace this with a simple health check endpoint
    // For now, we'll test with the signup endpoint
    const testData = {
      email: 'test@example.com',
      password: 'testpassword123'
    };
    
    console.log('Sending test request to:', apiClient.apiUrl + 'api/sign-up');
    console.log('Test data:', testData);
    
    const response = await apiClient.post('api/sign-up', testData);
    console.log('✅ API connection successful!');
    console.log('Response:', response);
    
    return { success: true, response };
  } catch (error) {
    console.log('❌ API connection failed!');
    console.log('Error details:', {
      message: error.message,
      code: error.code,
      config: error.config,
      response: error.response?.data,
      status: error.response?.status
    });
    
    // Provide specific error guidance
    if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
      console.log('🔧 Troubleshooting suggestions:');
      console.log('1. Check if your backend server is running');
      console.log('2. Verify the API URL is correct');
      console.log('3. Check your internet connection');
      console.log('4. For Android emulator, ensure using 10.0.2.2 instead of localhost');
      console.log('5. For iOS simulator, ensure using localhost');
    }
    
    return { success: false, error };
  }
};

export const checkApiConfiguration = () => {
  console.log('=== API Configuration Check ===');
  console.log('Base URL:', apiClient.apiUrl);
  console.log('Platform:', require('react-native').Platform.OS);
  console.log('Environment variables:', {
    EXPO_PUBLIC_HOST_URL: process.env.EXPO_PUBLIC_HOST_URL
  });
  
  return {
    baseUrl: apiClient.apiUrl,
    platform: require('react-native').Platform.OS,
    environmentUrl: process.env.EXPO_PUBLIC_HOST_URL
  };
};
