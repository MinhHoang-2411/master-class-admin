import {LoginPayload, RegisterPayload} from '../../models'
import axiosClient from '../axiosClient'

const authApi = {
  login(params: LoginPayload) {
    const url = 'auth/login'
    return axiosClient.post(url, params)
  },
  register(params: RegisterPayload) {
    const url = 'auth/register'
    return axiosClient.post(url, params)
  },
}

export default authApi
