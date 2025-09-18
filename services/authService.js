import apiClient from "../utils/apiClient";

export function createAccount(data) {
  return apiClient.post('api/v1/users/signup', data)
}