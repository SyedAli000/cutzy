// services/apiclient/apiClient.js
import { Platform } from 'react-native';
import ApiClient from './client';
// Prefer env when provided; otherwise use emulator-safe localhost
const DEFAULT_LOCAL_BASE = Platform.select({
  ios: 'http://localhost:3000/',
  android: 'http://10.0.2.2:3000/'
})

const BASE_API_URL = (process.env.EXPO_PUBLIC_HOST_URL || DEFAULT_LOCAL_BASE)
  // ensure trailing slash
  .replace(/(?<!\/)$/, '/')

console.log('API Base URL:', BASE_API_URL);
console.log('Platform:', Platform.OS);
console.log('Environment URL:', process.env.EXPO_PUBLIC_HOST_URL);

const apiClient = new ApiClient(BASE_API_URL)

export default apiClient
