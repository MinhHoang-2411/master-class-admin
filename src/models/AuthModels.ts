import {UserModel} from './UserModels'

export interface AuthModel {
  api_token: string
  refreshToken?: string
  user?: UserModel
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
  currentUser?: UserModel
}
