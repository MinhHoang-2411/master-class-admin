import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import {getAuth} from '../utils/auth'

const URL_API = process.env.REACT_APP_API_URL

const axiosClient = axios.create({
  baseURL: URL_API,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosClient

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    const auth = getAuth()
    if (auth) {
      config.headers = {
        Authorization: `Bearer ${auth}`,
      }
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)
