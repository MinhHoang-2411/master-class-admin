import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit'
// import { connectRouter, routerMiddleware } from 'connected-react-router';
import authReducer from '../../store/auth/authSlice'
import createSagaMiddleware from 'redux-saga'
// import { history } from 'utils';
import rootSaga from './rootSaga'

// const rootReducer = combineReducers({
//   router: connectRouter(history),
//   counter: counterReducer,
//   auth: authReducer,
// });

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {auth: authReducer},
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
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
