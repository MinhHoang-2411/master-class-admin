import {RootState} from '../../app/saga/store'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {UserModel} from '../../models'
import {getAuth, setAuth} from '../../utils/auth'

export interface LoginPayload {
  email: string
  password: string
}

export interface LogoutPayload {}

export interface AuthState {
  isLoggedIn: boolean
  logging: boolean
  currentUser?: UserModel
}

const api_token = getAuth()?.api_token

const initialState: AuthState = {
  isLoggedIn: api_token ? true : false, // logged
  logging: false, // loading
  currentUser: undefined, // info user if login success
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true
    },
    loginSuccess(state, action: PayloadAction<UserModel>) {
      state.isLoggedIn = true
      state.logging = false
      state.currentUser = action.payload
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false
    },

    logout(state, action: PayloadAction<LogoutPayload>) {
      state.isLoggedIn = false
      state.currentUser = undefined
    },
  },
})

// Actions
export const authActions = authSlice.actions

// Selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
export const selectIsLogging = (state: RootState) => state.auth.logging

// Reducer
const authReducer = authSlice.reducer
export default authReducer
