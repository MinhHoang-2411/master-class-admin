import {PayloadAction} from '@reduxjs/toolkit'
// import { push } from 'connected-react-router';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects'
import authApi from '../../api/auth'
import {
  ErrorModel,
  LoginPayload,
  LogoutPayload,
  RegisterPayload,
  ResponseAuth,
  UserModel,
} from '../../models'
import {logout, setAuth} from '../../utils/auth'
import {alertActions} from '../alert/alertSlice'
import {authActions} from './authSlice'

function* handleLogin(action: PayloadAction<LoginPayload>) {
  const payload = action.payload
  try {
    const response: ResponseAuth<UserModel> = yield call(authApi.login, payload)

    setAuth({
      api_token: response?.data?.token || '',
      user: response?.data?.user,
    })

    yield put(authActions.loginSuccess(response.data as UserModel))
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(
      authActions.loginFailed(
        error?.response?.data?.message ||
          'The username or password you entered did not match our records. Please try again'
      )
    )
    yield put(
      alertActions.showAlert({
        text:
          error?.response?.data?.message ||
          'The username or password you entered did not match our records. Please try again',
        type: 'error',
      })
    )
  }
}

function* handleLogout(action: PayloadAction<LogoutPayload>) {
  yield call(logout)
}

function* handleRegister(action: PayloadAction<RegisterPayload>) {
  const payload = action.payload
  try {
    const response: ResponseAuth<UserModel> = yield call(authApi.register, payload)

    setAuth({
      api_token: response?.data?.token || '',
      user: response?.data?.user,
    })

    yield put(authActions.registerSuccess(response.data as UserModel))
  } catch (error: ErrorModel | any) {
    console.error(error)

    yield put(authActions.registerFailed(error as string))
    yield put(
      alertActions.showAlert({
        text:
          error?.response?.data?.message ||
          'The username or password you entered did not match our records. Please try again',
        type: 'error',
      })
    )
  }
}

function* watchLoginFlow() {
  yield all([
    takeLatest(authActions.login.type, handleLogin),
    takeLatest(authActions.logout.type, handleLogout),
    takeLatest(authActions.register.type, handleRegister),
  ])
}

export function* authSaga() {
  yield fork(watchLoginFlow)
}
