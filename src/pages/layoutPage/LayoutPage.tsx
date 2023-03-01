/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {Route, Routes} from 'react-router-dom'
import CreateLayoutPage from '../../components/layoutPage/CreateLayoutPage'
import ItemLayoutPageDetail from '../../components/layoutPage/ItemDetail'
import OverviewLayoutPage from '../../components/layoutPage/Overview'
import UpdateLayoutPage from '../../components/layoutPage/UpdateLayoutPage'
import {PageLink, PageTitle} from '../../layout/core'

const categoriesBreadCrumbs: Array<PageLink> = [
  {
    title: 'Layout page',
    path: '/crafted/pages/layout/overview',
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

const LayoutPage: FC = () => {
  return (
    <Routes>
      <Route>
        <Route
          path='overview'
          element={
            <>
              <PageTitle breadcrumbs={categoriesBreadCrumbs}>Overview</PageTitle>
              <OverviewLayoutPage />
            </>
          }
        />
        <Route
          path='create'
          element={
            <>
              <PageTitle breadcrumbs={categoriesBreadCrumbs}>Create</PageTitle>
              <CreateLayoutPage />
            </>
          }
        />
        <Route
          path='detail/:id'
          element={
            <>
              <PageTitle breadcrumbs={categoriesBreadCrumbs}>Detail</PageTitle>
              <ItemLayoutPageDetail />
            </>
          }
        />
        <Route
          path='update/:id'
          element={
            <>
              <PageTitle breadcrumbs={categoriesBreadCrumbs}>Update</PageTitle>
              <UpdateLayoutPage />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default LayoutPage
