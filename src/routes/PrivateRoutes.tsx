import { FC, lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'
import { getCSSVariableValue } from '../app/assets/ts/_utils'
import { WithChildren } from '../app/helpers'
import { MasterLayout } from '../layout/MasterLayout'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../pages/profile/ProfilePage'))
  const AccountPage = lazy(() => import('../pages/accounts/AccountPage'))
  const BannerPage = lazy(() => import('../pages/banner/BannerPage'))
  const CategoriesPage = lazy(() => import('../pages/categories/CategoriesPage'))
  const CoursesPage = lazy(() => import('../pages/courses/CoursesPage'))
  const UsersPage = lazy(() => import('../pages/users/UsersPage'))
  const LayoutPage = lazy(() => import('../pages/layoutPage/LayoutPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/banner/*'
          element={
            <SuspensedView>
              <BannerPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/categories/*'
          element={
            <SuspensedView>
              <CategoriesPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/courses/*'
          element={
            <SuspensedView>
              <CoursesPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/users/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />

        <Route
          path='crafted/pages/layout/*'
          element={
            <SuspensedView>
              <LayoutPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }

