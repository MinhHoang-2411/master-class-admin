import {PayloadAction} from '@reduxjs/toolkit'
import {all, call, fork, put, takeEvery} from 'redux-saga/effects'
import bannerApi from '../../api/banner'
import {ErrorModel, ResponseUploadImages} from '../../models'
import {alertActions} from '../alert/alertSlice'
import {bannerActions} from './bannerSlice'
import history from '../../routes/history'
import { ResponseBanner } from '../../models/BannerModels'

function* fetchBanner() {
  try {
    const payload = {
      limit: 20,
      page: 1,
    }
    const response: ResponseBanner = yield call(bannerApi.getListBanner, payload)

    yield put(bannerActions.getDataSuccess(response.data))
  } catch (error: ErrorModel | any) {
    console.error(error)
  }
}

function* fetchBannerDetail(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseBanner = yield call(bannerApi.getBannerDetail, payload)
    yield put(bannerActions.getDataDetailSuccess(response.data))
    localStorage.setItem('itemUpdate', JSON.stringify(response.data))
  } catch (error: ErrorModel | any) {
    console.error(error)
  }
}

function* onUploadImages(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseUploadImages = yield call(bannerApi.uploadImage, payload)
    yield put(bannerActions.onUploadImagesSuccess(response.data.images))
    yield put(
      alertActions.showAlert({
        text: 'Upload image successful',
        type: 'success',
      })
    )
  } catch (error: ErrorModel | any) {
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* onCreateBanner(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseUploadImages = yield call(bannerApi.createBanner, payload)
    yield put(bannerActions.onCreateBannerSuccess(response.data))
    yield put(
      alertActions.showAlert({
        text: 'Create banner successful',
        type: 'success',
      })
    )
    history.replace('/crafted/pages/banner/overview')
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(bannerActions.onCreateBannerFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* onUpdateBanner(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseUploadImages = yield call(bannerApi.updateBanner, payload)
    yield put(bannerActions.onUpdateBannerSuccess(response.data))
    yield put(
      alertActions.showAlert({
        text: 'Update banner successful',
        type: 'success',
      })
    )
    history.replace('/crafted/pages/banner/overview')
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(bannerActions.onUpdateBannerFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* onDeleteBanner(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseUploadImages = yield call(bannerApi.deleteBanner, payload)
    yield put(bannerActions.onDeleteBannerSuccess(response.data))
    yield put(
      alertActions.showAlert({
        text: 'Delete banner successful',
        type: 'success',
      })
    )
    history.replace('/')
    setTimeout(() => {
      history.replace('/crafted/pages/banner/overview')
    }, 10)
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(bannerActions.onDeleteBannerFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* onDeleteImage(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseUploadImages = yield call(bannerApi.deleteImage, payload)
    yield put(bannerActions.onUploadImagesSuccess(response.data.images))
  } catch (error: ErrorModel | any) {
    console.error(error)
  }
}

function* onDeletePublicFile(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseUploadImages = yield call(bannerApi.deletePublicFile, payload)
    yield put(bannerActions.onDeletePublicFileSuccess(response.data.images))
  } catch (error: ErrorModel | any) {
    console.error(error)
  }
}

function* bannerFlow() {
  yield all([
    takeEvery(bannerActions.getDataStart.type, fetchBanner),
    takeEvery(bannerActions.getDataDetail.type, fetchBannerDetail),
    takeEvery(bannerActions.onCreateBanner.type, onCreateBanner),
    takeEvery(bannerActions.onUploadImages.type, onUploadImages),
    takeEvery(bannerActions.onUpdateBanner.type, onUpdateBanner),
    takeEvery(bannerActions.onDeleteImage.type, onDeleteImage),
    takeEvery(bannerActions.onDeleteBanner.type, onDeleteBanner),
    takeEvery(bannerActions.onDeletePublicFile.type, onDeletePublicFile),
  ])
}

export function* bannerSaga() {
  yield fork(bannerFlow)
}
