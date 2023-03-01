import {PayloadAction} from '@reduxjs/toolkit'
import {all, call, fork, put, takeEvery} from 'redux-saga/effects'
import coursesApi from '../../api/courses'
import layoutPageApi from '../../api/layoutPage'
import {ErrorModel, ResponseUploadImages} from '../../models'
import {ICategory, ResponseCategory} from '../../models/CategoryModels'
import history from '../../routes/history'
import {alertActions} from '../alert/alertSlice'
import {layoutPageActions} from './layoutPageSlice'

function* fetchListLayout(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseCategory<ICategory> = yield call(
      layoutPageApi.getListLayoutPage,
      payload
    )
    yield put(layoutPageActions.getDataSuccess(response.data))
    localStorage.removeItem('layoutUpdate')
  } catch (error: ErrorModel | any) {
    console.error(error)
  }
}

function* fetchLayoutDetail(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseCategory<ICategory> = yield call(
      layoutPageApi.getLayoutPageDetail,
      payload
    )
    yield put(layoutPageActions.getDataDetailSuccess(response.data))
    localStorage.setItem('layoutUpdate', JSON.stringify(response.data))
  } catch (error: ErrorModel | any) {
    console.error(error)
  }
}

function* handleCreateLayout(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseCategory<ICategory> = yield call(
      layoutPageApi.createLayoutPage,
      payload
    )
    yield put(layoutPageActions.handleCreateLayoutSuccess(response.data))
    yield put(
      alertActions.showAlert({
        text: 'Create layout successful',
        type: 'success',
      })
    )
    history.replace('/crafted/pages/layout/overview')
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(layoutPageActions.handleCreateLayoutFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* handleUpdateLayout(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseCategory<ICategory> = yield call(
      layoutPageApi.updateLayoutPage,
      payload
    )
    yield put(layoutPageActions.handleUpdateLayoutSuccess(response.data))
    yield put(
      alertActions.showAlert({
        text: 'Update layout successful',
        type: 'success',
      })
    )
    history.replace('/crafted/pages/layout/overview')
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(layoutPageActions.handleUpdateLayoutFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* handleDeleteLayout(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseCategory<ICategory> = yield call(
      layoutPageApi.deleteLayoutPage,
      payload
    )
    yield put(layoutPageActions.handleDeleteLayoutSuccess(response.data))
    yield put(
      alertActions.showAlert({
        text: 'Delete layout successful',
        type: 'success',
      })
    )
    history.replace('/')
    setTimeout(() => {
      history.replace('/crafted/pages/layout/overview')
    }, 10)
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(layoutPageActions.handleDeleteLayoutFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* uploadTrailerUrl(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseCategory<ICategory> = yield call(coursesApi.uploadVideo, payload)
    yield put(layoutPageActions.uploadTrailerUrlSuccess(response.data))
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(layoutPageActions.uploadTrailerUrlFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* uploadTrailerThumbnail(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseCategory<ICategory> = yield call(coursesApi.uploadThumbnail, payload)
    yield put(layoutPageActions.uploadTrailerThumbnailSuccess(response.data))
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(layoutPageActions.uploadTrailerThumbnailFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* uploadWelcomeUrl(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseCategory<ICategory> = yield call(coursesApi.uploadVideo, payload)
    yield put(layoutPageActions.uploadWelcomeUrlSuccess(response.data))
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(layoutPageActions.uploadWelcomeUrlFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* uploadWelcomeThumbnail(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseCategory<ICategory> = yield call(coursesApi.uploadThumbnail, payload)
    yield put(layoutPageActions.uploadWelcomeThumbnailSuccess(response.data))
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(layoutPageActions.uploadWelcomeThumbnailFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* uploadMessagesTeamThumbnail(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseCategory<ICategory> = yield call(coursesApi.uploadThumbnail, payload)
    yield put(layoutPageActions.uploadMessagesTeamThumbnailSuccess(response.data))
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(layoutPageActions.uploadMessagesTeamThumbnailFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* uploadMessagesTeamUrl(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseCategory<ICategory> = yield call(coursesApi.uploadVideo, payload)
    yield put(layoutPageActions.uploadMessagesTeamUrlSuccess(response.data))
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(layoutPageActions.uploadMessagesTeamUrlFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* handleDeleteVideo(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseUploadImages = yield call(coursesApi.deletePublicFile, payload)
    yield put(layoutPageActions.handleDeleteVideoSuccess(response.data.images))
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(layoutPageActions.handleDeleteVideoFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* layoutPageFlow() {
  yield all([
    takeEvery(layoutPageActions.getDataStart.type, fetchListLayout),
    takeEvery(layoutPageActions.getDataDetail.type, fetchLayoutDetail),

    takeEvery(layoutPageActions.handleCreateLayout.type, handleCreateLayout),
    takeEvery(layoutPageActions.handleUpdateLayout.type, handleUpdateLayout),
    takeEvery(layoutPageActions.handleDeleteLayout.type, handleDeleteLayout),

    takeEvery(layoutPageActions.uploadTrailerUrlStart.type, uploadTrailerUrl),
    takeEvery(layoutPageActions.uploadTrailerThumbnailStart.type, uploadTrailerThumbnail),

    takeEvery(layoutPageActions.uploadWelcomeUrlStart.type, uploadWelcomeUrl),
    takeEvery(layoutPageActions.uploadWelcomeThumbnailStart.type, uploadWelcomeThumbnail),

    takeEvery(layoutPageActions.uploadMessagesTeamUrlStart.type, uploadMessagesTeamUrl),
    takeEvery(layoutPageActions.uploadMessagesTeamThumbnailStart.type, uploadMessagesTeamThumbnail),

    takeEvery(layoutPageActions.handleDeleteVideoStart.type, handleDeleteVideo),
  ])
}

export function* layoutPageSaga() {
  yield fork(layoutPageFlow)
}
