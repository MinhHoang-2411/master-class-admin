import {all} from 'redux-saga/effects'
import {alertSaga} from '../../store/alert/alertSaga'
import {authSaga} from '../../store/auth/authSaga'
import {bannerSaga} from '../../store/banner/bannerSaga'
import {categoriesSaga} from '../../store/categories/categoriesSaga'
import { coursesSaga } from '../../store/courses/coursesSaga'

export default function* rootSaga() {
  yield all([authSaga(), alertSaga(), bannerSaga(), categoriesSaga(), coursesSaga()])
}
