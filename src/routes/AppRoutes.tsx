/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {useAppSelector} from '../app/saga/hooks'
import {Layout} from '../layout/App'
import {AuthPage} from '../pages/auth/AuthPage'
import {ErrorsPage} from '../pages/errors/ErrorsPage'
import {getAuth} from '../utils/auth'
import {PrivateRoutes} from './PrivateRoutes'

const AppRoutes: FC = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const currentUser = getAuth()

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='error/*' element={<ErrorsPage />} />
        {currentUser?.api_token && isLoggedIn === true ? (
          <>
            <Route path='/*' element={<PrivateRoutes />} />
            <Route index element={<Navigate to='/dashboard' />} />
          </>
        ) : (
          <>
            <Route path='auth/*' element={<AuthPage />} />
            <Route path='*' element={<Navigate to='/auth' />} />
          </>
        )}
      </Route>
    </Routes>
  )
}

export {AppRoutes}
