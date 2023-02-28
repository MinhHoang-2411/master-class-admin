import { IUser } from '../../models/User'
import axiosClient from '../axiosClient'

const userApi = {
  getListUser(params: any) {
    const url = 'users'
    return axiosClient.get(url, { params })
  },
  
  getDetailUser(params: any) {
    const url = `users/${params}`
    return axiosClient.get(url, params)
  },
  
  updateUser(params: IUser) {
    const url = `users/${params._id}`
    return axiosClient.put(url, params)
  },
  
  blockUser(params: IUser) {
    const url = `users/block-user/${params._id}`
    return axiosClient.put(url)
  },
}


export default userApi
