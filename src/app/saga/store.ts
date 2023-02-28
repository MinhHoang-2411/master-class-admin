import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit'
import authReducer from '../../store/auth/authSlice'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import alertReducer from '../../store/alert/alertSlice'
import bannerReducer from '../../store/banner/bannerSlice'
import categoriesReducer from '../../store/categories/categoriesSlice'
import coursesReducer from '../../store/courses/coursesSlice'
import uploadReducer from '../../store/upload/uploadSlice'
import usersReducer from '../../store/users/usersSlice'

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    banner: bannerReducer,
    categories: categoriesReducer,
    courses: coursesReducer,
    upload: uploadReducer,
    users: usersReducer,
  },
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
