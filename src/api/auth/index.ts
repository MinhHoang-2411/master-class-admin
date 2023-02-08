import {LoginPayload} from '../../models'
import axiosClient from '../axiosClient'

const authApi = {
  login(params: LoginPayload) {
    const url = '/login'
    return axiosClient.post(url, {params})
  },
}

export default authApi
