/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {Route, Routes} from 'react-router-dom'
import OverviewUser from '../../components/users/Overview'
import UpdateUser from '../../components/users/UpdateUser'
import UserDetail from '../../components/users/UserDetail'
import {PageLink, PageTitle} from '../../layout/core'

const categoriesBreadCrumbs: Array<PageLink> = [
  {
    title: 'Users',
    path: '/crafted/pages/users/overview',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const UsersPage: FC = () => {
  return (
    <Routes>
      <Route>
        <Route
          path='overview'
          element={
            <>
              <PageTitle breadcrumbs={categoriesBreadCrumbs}>Overview</PageTitle>
              <OverviewUser />
            </>
          }
        />
        <Route
          path='detail/:id'
          element={
            <>
              <PageTitle breadcrumbs={categoriesBreadCrumbs}>Detail</PageTitle>
              <UserDetail />
            </>
          }
        />
        <Route
          path='update/:id'
          element={
            <>
              <PageTitle breadcrumbs={categoriesBreadCrumbs}>Update</PageTitle>
              <UpdateUser />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default UsersPage
