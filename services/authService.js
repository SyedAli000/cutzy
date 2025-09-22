import apiClient from "../utils/apiClient";

// User authentication functions
export function createAccount(data) {
  return apiClient.post('/users/signup', data)
}

export function loginAccount(data) {
  console.log("loginAccount", data);
  return apiClient.post('/users/login', data)
}

// Barber authentication functions
export function createBarberAccount(data) {
  console.log("createBarberAccount", data);
  return apiClient.post('/barbers/signup', data)
}

export function loginBarberAccount(data) {
  console.log("loginBarberAccount", data);
  return apiClient.post('/barbers/login', data)
}