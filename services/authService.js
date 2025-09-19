import apiClient from "../utils/apiClient";

export function createAccount(data) {
  return apiClient.post('api/v1/users/signup', data)
}
export function loginAccount(data) {
  console.log("loginAccount", data);
  return apiClient.post('api/v1/users/signin', data)
}