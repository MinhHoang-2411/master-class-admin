/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../layout/core'
import CategoryDetail from './CategoriesDetail'
import CreateCategory from './CreateCategory'
import CreateBanner from './CreateCategory'
import CategoriesOverview from './Overview'
import UpdateCategory from './UpdateCategory'

const categoriesBreadCrumbs: Array<PageLink> = [
  {
    title: 'Category',
    path: '/crafted/pages/categories/overview',
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

const CategoriesPage: FC = () => {
  return (
    <Routes>
      <Route>
        <Route
          path='overview'
          element={
            <>
              <PageTitle breadcrumbs={categoriesBreadCrumbs}>Overview</PageTitle>
              <CategoriesOverview />
            </>
          }
        />
        <Route
          path='create'
          element={
            <>
              <PageTitle breadcrumbs={categoriesBreadCrumbs}>Create</PageTitle>
              <CreateCategory />
            </>
          }
        />
        <Route
          path='update/:id'
          element={
            <>
              <PageTitle breadcrumbs={categoriesBreadCrumbs}>Update</PageTitle>
              <UpdateCategory />
            </>
          }
        />
        <Route
          path='detail/:id'
          element={
            <>
              <PageTitle breadcrumbs={categoriesBreadCrumbs}>Detail</PageTitle>
              <CategoryDetail />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default CategoriesPage
