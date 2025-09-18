import AsyncStorage from '@react-native-async-storage/async-storage'
// eslint-disable-next-line camelcase
import { STORAGE_AUTH_KEY, STORAGE_USER_KEY, STORAGE_FINGERPRINT_KEY, STORAGE_LANGUAGE_KEY } from './urls'

export const getItem = (key) => {
  return AsyncStorage.getItem(key)
}

export const setItem = (key, data) => {
  return AsyncStorage.setItem(key, data)
}

export const removeItem = (key) => {
  return AsyncStorage.removeItem(key)
}

export const getToken = () => {
  return AsyncStorage.getItem(STORAGE_AUTH_KEY)
}

export const setToken = (data) => {
  return AsyncStorage.setItem(STORAGE_AUTH_KEY, data)
}

export const removeToken = (key) => {
  return AsyncStorage.removeItem(STORAGE_AUTH_KEY)
}

export const getFingerPrintToken = () => {
  return AsyncStorage.getItem(STORAGE_FINGERPRINT_KEY)
}

export const setFingerPrintToken = (data) => {
  return AsyncStorage.setItem(STORAGE_FINGERPRINT_KEY, data)
}

export const removeFingerprintToken = (key) => {
  return AsyncStorage.removeItem(STORAGE_FINGERPRINT_KEY)
}
export const getUser = () => {
  return AsyncStorage.getItem(STORAGE_USER_KEY)
}

export const setUser = (data) => {
  return AsyncStorage.setItem(STORAGE_USER_KEY, data)
}

export const removeUser = (key) => {
  return AsyncStorage.removeItem(STORAGE_USER_KEY)
}

export const getLanguage = () => {
  return AsyncStorage.getItem(STORAGE_LANGUAGE_KEY)
}

export const setLanguage = (language) => {
  return AsyncStorage.setItem(STORAGE_LANGUAGE_KEY, language)
}
