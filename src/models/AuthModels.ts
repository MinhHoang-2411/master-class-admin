import {UserModel} from './UserModels'

export interface AuthModel {
  api_token: string
  refreshToken?: string
  user?: UserModel
  token?: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms?: boolean
}

export interface LogoutPayload {}

export interface AuthState {
  isLoggedIn: boolean
  logging: boolean
  loadingRegister: boolean
  loadingForgotPass: boolean
  loadingVerify: boolean
  loadingResetPass: boolean
  currentUser?: UserModel
  tokenForgotPass?: string
  tokenVerifyCode?: string
}

export interface VerifyCodeModel {
  code: string
  token: string
}

export interface ResetPasswordModel {
  token: string
  password: string
}

export interface ResponseForgotPass {
  data: {
    token: string
  }
}
