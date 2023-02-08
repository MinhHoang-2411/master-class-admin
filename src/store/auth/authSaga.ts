import {PayloadAction} from '@reduxjs/toolkit'
// import { push } from 'connected-react-router';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects'
import authApi from '../../api/auth'
import {logout, setAuth} from '../../utils/auth'
import {authActions, LoginPayload, LogoutPayload} from './authSlice'
import {ListResponse, ResponseOrigin, UserModel} from '../../models'

function* handleLogin(action: PayloadAction<LoginPayload>) {
  const payload = action.payload
  try {
    // const response: ResponseOrigin<UserModel> = yield call(authApi.login, payload)
    setAuth({
      api_token: '123',
      user: {},
    })

    yield put(authActions.loginSuccess({}))
  } catch (error) {
    console.error(error)
    yield put(authActions.loginFailed(error as string))
  }
}

function* handleLogout(action: PayloadAction<LogoutPayload>) {
  yield call(logout)
}

function* watchLoginFlow() {
  yield all([
    takeLatest(authActions.login.type, handleLogin),
    takeLatest(authActions.logout.type, handleLogout),
  ])
}

export function* authSaga() {
  yield fork(watchLoginFlow)
}
