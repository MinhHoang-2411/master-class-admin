import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/saga/store'
import {AuthState, LoginPayload, LogoutPayload, RegisterPayload, UserModel} from '../../models'
import {getAuth} from '../../utils/auth'

const api_token = getAuth()?.api_token

const initialState: AuthState = {
  isLoggedIn: api_token ? true : false, // logged
  logging: false, // loading
  loadingRegister: false,
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

    register(state, action: PayloadAction<RegisterPayload>) {
      state.loadingRegister = true
    },
    registerSuccess(state, action: PayloadAction<UserModel>) {
      state.isLoggedIn = true
      state.loadingRegister = false
      state.currentUser = action.payload
    },
    registerFailed(state, action: PayloadAction<string>) {
      state.loadingRegister = false
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
