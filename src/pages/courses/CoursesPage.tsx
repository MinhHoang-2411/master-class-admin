/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../layout/core'
import {uploadActions} from '../../store/upload/uploadSlice'
import CoursesDetail from './CoursesDetail'
import CreateCourse from './CreateCourse'
import Lessons from './Lessons'
import CoursesOverview from './Overview'
import UpdateCourse from './UpdateCourse'

const coursesBreadCrumbs: Array<PageLink> = [
  {
    title: 'Courses',
    path: '/crafted/pages/courses/overview',
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
              <UpdateCourse />
            </>
          }
        />
        <Route
          path='detail/:id'
          element={
            <>
              <PageTitle breadcrumbs={coursesBreadCrumbs}>Detail</PageTitle>
              <CoursesDetail />
              <Lessons />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default CoursesPage
