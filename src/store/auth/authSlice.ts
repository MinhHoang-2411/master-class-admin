import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../app/saga/store'
import {TOKEN_FORGOT_PASS} from '../../constants/auth'
import {
  AuthState,
  LoginPayload,
  LogoutPayload,
  RegisterPayload,
  ResetPasswordModel,
  UserModel,
  VerifyCodeModel,
} from '../../models'
import {getAuth, getSessionStorage} from '../../utils/auth'

const api_token = getAuth()?.api_token
const token_forgot_pass = getSessionStorage(TOKEN_FORGOT_PASS)?.someOtherSessionData?.token

const initialState: AuthState = {
  isLoggedIn: api_token ? true : false, // logged
  logging: false, // loading
  loadingRegister: false,
  loadingForgotPass: false,
  loadingVerify: false,
  loadingResetPass: false,
  currentUser: undefined, // info user if login success
  tokenForgotPass: token_forgot_pass || undefined,
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

    forgotPass(state, action: PayloadAction<string>) {
      state.loadingForgotPass = true
    },
    forgotPassSuccess(state, action: PayloadAction<string>) {
      state.loadingForgotPass = false
      state.tokenForgotPass = action.payload
    },
    forgotFailed(state, action: PayloadAction<string>) {
      state.loadingForgotPass = false
    },

    verifyCode(state, action: PayloadAction<VerifyCodeModel>) {
      state.loadingVerify = true
    },
    verifyCodeSuccess(state, action: PayloadAction<string>) {
      state.loadingVerify = false
      // state.tokenverifyCode = action.payload
    },
    verifyCodeFailed(state, action: PayloadAction<string>) {
      state.loadingVerify = false
    },

    resetPassword(state, action: PayloadAction<ResetPasswordModel>) {
      state.loadingResetPass = true
    },
    resetPasswordSuccess(state, action: PayloadAction<string>) {
      state.loadingResetPass = false
      // state.tokenresetPassword = action.payload
    },
    resetPasswordFailed(state, action: PayloadAction<string>) {
      state.loadingResetPass = false
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
