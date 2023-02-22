import {PayloadAction} from '@reduxjs/toolkit'
import {all, call, fork, put, takeEvery} from 'redux-saga/effects'
import coursesApi from '../../api/courses'
import {ErrorModel, ResponseUploadImages} from '../../models'
import {ICategory, ResponseCategory} from '../../models/CategoryModels'
import history from '../../routes/history'
import {alertActions} from '../alert/alertSlice'
import {coursesActions} from './coursesSlice'

function* fetchCourses(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseCategory<ICategory> = yield call(coursesApi.getListCourse, payload)
    yield put(coursesActions.getDataSuccess(response))
  } catch (error: ErrorModel | any) {
    console.error(error)
  }
}

function* fetchDetailCourses(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseCategory<ICategory> = yield call(coursesApi.getCourseDetail, payload)
    yield put(coursesActions.getDetailSuccess(response.data))
  } catch (error: ErrorModel | any) {
    console.error(error)
  }
}

function* onCreateCourse(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseUploadImages = yield call(coursesApi.createCourse, payload)
    yield put(coursesActions.onCreateCourseSuccess(response.data))
    yield put(
      alertActions.showAlert({
        text: 'Create banner successful',
        type: 'success',
      })
    )
    history.replace('/crafted/pages/courses/overview')
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(coursesActions.onCreateCourseFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* onUpdateCourse(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseUploadImages = yield call(coursesApi.updateCourse, payload)
    yield put(coursesActions.onUpdateCourseSuccess(response.data))
    yield put(
      alertActions.showAlert({
        text: 'Create banner successful',
        type: 'success',
      })
    )
    history.replace('/crafted/pages/courses/overview')
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(coursesActions.onUpdateCourseFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* onDeleteCourse(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseUploadImages = yield call(coursesApi.deleteCourse, payload)
    yield put(coursesActions.onDeleteCourseSuccess(response.data))
    yield put(
      alertActions.showAlert({
        text: 'Create banner successful',
        type: 'success',
      })
    )
    history.replace('/crafted/pages/courses/overview')
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(coursesActions.onDeleteCourseFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* onUploadThumbail(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseCategory<ICategory> = yield call(coursesApi.uploadThumbnail, payload)
    yield put(coursesActions.onUploadThumbailSuccess(response.data))
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(coursesActions.onUploadThumbailFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* onUploadVideo(action: PayloadAction<any>) {
  const payload = action.payload
  console.log('payload', payload)
  try {
    const response: ResponseCategory<ICategory> = yield call(coursesApi.uploadVideo, payload)
    yield put(coursesActions.onUploadVideoSuccess(response.data))
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(coursesActions.onUploadVideoFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* onDeleteVideo(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseUploadImages = yield call(coursesApi.deletePublicFile, payload)
    yield put(coursesActions.onDeleteCourseSuccess(response.data.images))
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(coursesActions.onUploadVideoFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* coursesFlow() {
  yield all([
    takeEvery(coursesActions.getDataStart.type, fetchCourses),
    takeEvery(coursesActions.getDetailStart.type, fetchDetailCourses),
    takeEvery(coursesActions.onCreateCourse.type, onCreateCourse),
    takeEvery(coursesActions.onUpdateCourse.type, onUpdateCourse),
    takeEvery(coursesActions.onDeleteCourse.type, onDeleteCourse),
    takeEvery(coursesActions.onUploadThumbail.type, onUploadThumbail),
    takeEvery(coursesActions.onUploadVideo.type, onUploadVideo),
    takeEvery(coursesActions.onDeleteVideo.type, onDeleteVideo),
  ])
}

export function* coursesSaga() {
  yield fork(coursesFlow)
}
