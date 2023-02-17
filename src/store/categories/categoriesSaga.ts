import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import categoryApi from '../../api/category'
import { ErrorModel, ResponseBanner } from '../../models'
import history from '../../routes/history'
import { alertActions } from '../alert/alertSlice'
import { categoriesActions } from './categoriesSlice'

function* fetchCategories() {
  try {
    const payload = {
      limit: 20,
      page: 1,
    }
    const response: ResponseBanner = yield call(categoryApi.getListCategory, payload)
    yield put(categoriesActions.getDataSuccess(response.data))
  } catch (error: ErrorModel | any) {
    console.error(error)
  }
}

function* fetchCategoryDetail(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseBanner = yield call(categoryApi.getCategoryDetail, payload)
    localStorage.setItem('categoryDetail', JSON.stringify(response.data))
    yield put(categoriesActions.getDetailCategorySuccess(response.data))
  } catch (error: ErrorModel | any) {
    console.error(error)
  }
}
function* onCreateCategory(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseBanner = yield call(categoryApi.createCategory, payload)
    yield put(categoriesActions.onCreateCategorySuccess(response.data))
    yield put(
      alertActions.showAlert({
        text: 'Create category successful',
        type: 'success',
      })
    )
    history.replace('/crafted/pages/categories/overview')
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(categoriesActions.onCreateCategoryFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* onUpdateCategory(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseBanner = yield call(categoryApi.updateCategory, payload)
    yield put(categoriesActions.onUpdateCategorySuccess(response.data))
    yield put(
      alertActions.showAlert({
        text: 'Update category successful',
        type: 'success',
      })
    )
    history.replace('/crafted/pages/categories/overview')
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(categoriesActions.onUpdateCategoryFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* onDeleteCategory(action: PayloadAction<any>) {
  const payload = action.payload
  try {
    const response: ResponseBanner = yield call(categoryApi.deleteCategory, payload)
    yield put(categoriesActions.onDeleteCategorySuccess(response.data))
    yield put(
      alertActions.showAlert({
        text: 'Delete category successful',
        type: 'success',
      })
    )
    history.replace('/')
    setTimeout(() => {
      history.replace('/crafted/pages/categories/overview')
    }, 10)
  } catch (error: ErrorModel | any) {
    console.error(error)
    yield put(categoriesActions.onDeleteCategoryFailure(error as string))
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.message || 'An error occurred, please try again',
        type: 'error',
      })
    )
  }
}

function* categoriesFlow() {
  yield all([
    takeEvery(categoriesActions.getDataStart.type, fetchCategories),
    takeEvery(categoriesActions.getDetailCategory.type, fetchCategoryDetail),
    takeEvery(categoriesActions.onCreateCategory.type, onCreateCategory),
    takeEvery(categoriesActions.onUpdateCategory.type, onUpdateCategory),
    takeEvery(categoriesActions.onDeleteCategory.type, onDeleteCategory),
  ])
}

export function* categoriesSaga() {
  yield fork(categoriesFlow)
}
