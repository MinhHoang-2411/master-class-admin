import {UserModel} from './UserModels'

export interface AuthModel {
  api_token: string
  refreshToken?: string
  user?: UserModel
}

export interface LoginPayload {
  username: string
  password: string
}

export interface AuthState {
  isLoggedIn: boolean
  logging?: boolean
}
