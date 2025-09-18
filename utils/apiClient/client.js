import axios from 'axios'
import withQuery from 'with-query'

import Toast, { showErrors } from '../toast'
import { setRequest, setResponse } from './interceptors'
 
import { getToken, removeToken } from '../storage'

const successStatuses = [200, 201]
const publicRoutes = ['cutzy/login']

export default class ApiClient {
  constructor (apiUrl) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }

    this.config = config
    this.apiUrl = apiUrl
    this.isExternal = apiUrl !== process.env.EXPO_PUBLIC_HOST_URL
    this.client = axios.create({
      baseURL: apiUrl,
      headers: config.headers,
      responseType: 'json',
      maxContentLength: 2000,
      maxBodyLength: 2000
    })
    this.client = setRequest(this.client)
    this.client = setResponse(this.client)
  }

  async getConfigurations (path, formData = false) {
    const token = publicRoutes.includes(path) ? null : await getToken()
    const { headers } = this.config
    const internalHeaders = (formData)
      ? { ...headers, 'Content-Type': 'multipart/form-data', Authorization: token }
      : { ...headers, Authorization: token }

    const configuration = token
      ? { ...this.config, headers: internalHeaders }
      : this.config
    return configuration
  }

  async get (path, data) {
    const url = withQuery(this.apiUrl + path, data)
    try {
      return await this.checkStatus(
        await this.client.get(url, await this.getConfigurations(path))
      )
    } catch (error) {
      return await this.handleError(error, path)
    }
  }

  async post(path, data) {
    try {
      const config = await this.getConfigurations(path)
      console.log("CONFIG:", config);
      const response = await this.client.post(this.apiUrl + path, data, config)
      return await this.checkStatus(response)
    } catch (error) {
      console.log("ERROR:", error.message, error.config?.url, error.response?.status);
      return await this.handleError(error, path)
    }
  }
  

  async put (path, data, callback) {
    try {
      return await this.checkStatus(
        await this.client.put(this.apiUrl + path, data, await this.getConfigurations(path)),
        callback
      )
    } catch (error) {
      return await this.handleError(error, path)
    }
  }

  async putFormData (path, data, callback) {
    try {
      return await this.checkStatus(
        await this.client.put(this.apiUrl + path, data, await this.getConfigurations(path, true)),
        callback
      )
    } catch (error) {
      return await this.handleError(error, path)
    }
  }

  async delete (path, data) {
    const url = withQuery(this.apiUrl + path, data)
    try {
      return await this.checkStatus(
        await this.client.delete(url, await this.getConfigurations(path))
      )
    } catch (error) {
      return await this.handleError(error, path)
    }
  }

  async checkStatus (response, callbackFunc = () => {}) {
    await callbackFunc(response)

    if (response.status === 503) {
      throw new Error('SERVER_MAINTENANCE')
    }

    if (successStatuses.includes(response.status)) {
      if (response.data.message) {
        Toast.showWithGravity(
          response.data.message,
          Toast.LONG,
          Toast.BOTTOM
        )
      }

      return this.isExternal ? response.data : response.data.data
    } else {
      const error = new Error(response.status)
      error.response = response
      return Promise.reject(error)
    }
  }

  async handleError (error, path) {
    let data
    if (error.response) {
      data = error.response.data
      console.error(`Error in ${path}:`, error.response.status)
      if (error.response.status === 401) {
        await removeToken()
        // await removeFingerPrintToken();
        Toast.show('Session expired. Please log in again.', Toast.LONG)
      }

      if (error.response.status === 403) {
        // Router.push("/secure/dashboard");
        Toast.show('Access denied.', Toast.LONG)
      }

      if (error.response.status === 500) {
        // Router.push("/secure/dashboard");
        data = { message: 'Something went wrong. Please try again later.' }
        Toast.show(data.message, Toast.LONG)
      }
    } else {
      data = error
      Toast.show('Network error. Please check your connection.', Toast.LONG)
    }

    showErrors(data)
    return Promise.reject(error)
  }
}
