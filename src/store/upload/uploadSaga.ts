import {PayloadAction} from '@reduxjs/toolkit'
import {all, call, fork, put, takeEvery} from 'redux-saga/effects'
import bannerApi from '../../api/banner'
import coursesApi from '../../api/courses'
import {ErrorModel} from '../../models'
import {ResponseBanner} from '../../models/BannerModels'
import {ICategory, ResponseCategory} from '../../models/CategoryModels'
import {alertActions} from '../alert/alertSlice'
import {bannerActions} from '../banner/bannerSlice'
import {uploadActions} from './uploadSlice'

function* onUploadThumbail(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseCategory<ICategory> = yield call(coursesApi.uploadThumbnail, payload)
    yield put(uploadActions.uploadThumbailSuccess(response.data))
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(uploadActions.uploadThumbailFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* onUploadLessonImage(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseCategory<ICategory> = yield call(coursesApi.uploadThumbnail, payload)
    yield put(uploadActions.uploadLessonImageSuccess(response.data))
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(uploadActions.uploadLessonImageFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* onUploadPreviewImage(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseCategory<ICategory> = yield call(coursesApi.uploadThumbnail, payload)
    yield put(uploadActions.uploadPreviewImageSuccess(response.data))
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(uploadActions.uploadPreviewImageFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* onUploadOverviewImage(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseCategory<ICategory> = yield call(coursesApi.uploadThumbnail, payload)
    yield put(uploadActions.uploadOverviewImageSuccess(response.data))
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(uploadActions.uploadOverviewImageFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* onUploadLessonVideo(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseCategory<ICategory> = yield call(coursesApi.uploadVideo, payload)
    yield put(uploadActions.uploadLessonVideoSuccess(response.data))
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(uploadActions.uploadLessonVideoFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}
function* onUploadPreviewVideo(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseCategory<ICategory> = yield call(coursesApi.uploadVideo, payload)
    yield put(uploadActions.uploadPreviewVideoSuccess(response.data))
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(uploadActions.uploadPreviewVideoFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* onClearStoreUpload(action: PayloadAction<any>) {
  try {
    yield put(uploadActions.clearStoreSuccess('clear'))
  } catch (error: ErrorModel | any) {
    console.error(error)
  }
}

function* uploadFlow() {
  yield all([
    takeEvery(uploadActions.uploadThumbail.type, onUploadThumbail),
    takeEvery(uploadActions.uploadLessonVideo.type, onUploadLessonVideo),
    takeEvery(uploadActions.uploadLessonImage.type, onUploadLessonImage),
    takeEvery(uploadActions.uploadPreviewVideo.type, onUploadPreviewVideo),
    takeEvery(uploadActions.uploadPreviewImage.type, onUploadPreviewImage),
    takeEvery(uploadActions.uploadOverviewImage.type, onUploadOverviewImage),
    takeEvery(uploadActions.clearStore.type, onClearStoreUpload),
  ])
}

export function* uploadSaga() {
  yield fork(uploadFlow)
}
