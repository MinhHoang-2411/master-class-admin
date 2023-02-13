import {LoginPayload, RegisterPayload, ResetPasswordModel, VerifyCodeModel} from '../../models'
import axiosClient from '../axiosClient'

const URL_FORGOT_PASS = process.env.REACT_APP_API_URL_ADMIN

const authApi = {
  login(params: LoginPayload) {
    const url = 'auth/login'
    return axiosClient.post(url, params)
  },
  register(params: RegisterPayload) {
    const url = 'auth/register'
    return axiosClient.post(url, params)
  },
  forgotPassword(email: string) {
    const url = 'auth/forgot-password'
    return axiosClient.post(`${URL_FORGOT_PASS}/auth/forgot-password`, {email})
  },
  verifyCode(params: VerifyCodeModel) {
    const url = 'auth/verify-forgot-password'
    return axiosClient.post(`${URL_FORGOT_PASS}/auth/verify-forgot-password`, params)
  },
  resetPassword(params: ResetPasswordModel) {
    const url = 'auth/reset-password'
    return axiosClient.post(`${URL_FORGOT_PASS}/auth/reset-password`, params)
  },
}

export default authApi
