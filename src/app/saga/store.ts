import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit'
import authReducer from '../../store/auth/authSlice'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import alertReducer from '../../store/alert/alertSlice'
import bannerReducer from '../../store/banner/bannerSlice'

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {auth: authReducer, alert: alertReducer, banner: bannerReducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
