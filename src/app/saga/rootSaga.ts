import {all} from 'redux-saga/effects'
import {alertSaga} from '../../store/alert/alertSaga'
import {authSaga} from '../../store/auth/authSaga'

export default function* rootSaga() {
  yield all([authSaga(), alertSaga()])
}
