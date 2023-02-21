/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../layout/core'
import CoursesDetail from './CoursesDetail'
import CreateCourse from './CreateCourse'
import CoursesOverview from './Overview'

const coursesBreadCrumbs: Array<PageLink> = [
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

const CoursesPage: FC = () => {
  return (
    <Routes>
      <Route>
        <Route
          path='overview'
          element={
            <>
              <PageTitle breadcrumbs={coursesBreadCrumbs}>Overview</PageTitle>
              <CoursesOverview />
            </>
          }
        />
        <Route
          path='create'
          element={
            <>
              <PageTitle breadcrumbs={coursesBreadCrumbs}>Create</PageTitle>
              <CreateCourse />
            </>
          }
        />
        <Route
          path='update/:id'
          element={
            <>
              <PageTitle breadcrumbs={coursesBreadCrumbs}>Update</PageTitle>
              <CreateCourse />
            </>
          }
        />
        <Route
          path='detail/:id'
          element={
            <>
              <PageTitle breadcrumbs={coursesBreadCrumbs}>Detail</PageTitle>
              <CoursesDetail />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default CoursesPage
