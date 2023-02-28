import {PayloadAction} from '@reduxjs/toolkit'
import {all, call, fork, put, takeEvery} from 'redux-saga/effects'
import userApi from '../../api/user'
import {ErrorModel} from '../../models'
import {ResponseUser} from '../../models/User'
import history from '../../routes/history'
import {alertActions} from '../alert/alertSlice'
import {usersActions} from './usersSlice'

function* fetchUser(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseUser = yield call(userApi.getListUser, payload)
    yield put(usersActions.getDataSuccess(response))
  } catch (error: ErrorModel | any) {
    console.error(error)
  }
}

function* fetchUserDetail(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseUser = yield call(userApi.getDetailUser, payload)
    localStorage.setItem('userDetail', JSON.stringify(response.data))
    yield put(usersActions.getDataDetailSuccess(response.data))
  } catch (error: ErrorModel | any) {
    console.error(error)
  }
}

function* handleBlockUser(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseUser = yield call(userApi.blockUser, payload)
    yield put(usersActions.handleBlockUserSuccess(response.data))
    yield put(
      alertActions.showAlert({
        text: 'Block user successful',
        type: 'success',
      })
    )
    history.replace('/')
    setTimeout(() => {
      history.replace('/crafted/pages/users/overview')
    }, 10)
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(usersActions.handleBlockUserFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* handleUpdateUser(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseUser = yield call(userApi.updateUser, payload)
    yield put(usersActions.handleUpdateUserSuccess(response.data))
    yield put(
      alertActions.showAlert({
        text: 'Update user successful',
        type: 'success',
      })
    )
    history.replace('/crafted/pages/users/overview')
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(usersActions.handleUpdateUserFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* userFlow() {
  yield all([
    takeEvery(usersActions.getDataStart.type, fetchUser),
    takeEvery(usersActions.getDataDetailStart.type, fetchUserDetail),
    takeEvery(usersActions.handleBlockUser.type, handleBlockUser),
    takeEvery(usersActions.handleUpdateUser.type, handleUpdateUser),
  ])
}

export function* userSaga() {
  yield fork(userFlow)
}
