import apiClient from "../utils/apiClient";

// User authentication functions
export function createAccount(data) {
  return apiClient.post('api/v1/users/signup', data)
}

export function loginAccount(data) {
  console.log("loginAccount", data);
  return apiClient.post('api/v1/users/signin', data)
}

// Barber authentication functions
export function createBarberAccount(data) {
  return apiClient.post('api/v1/barbers/signup', data)
}

export function loginBarberAccount(data) {
  console.log("loginBarberAccount", data);
  return apiClient.post('api/v1/barbers/signin', data)
}