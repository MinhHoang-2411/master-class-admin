import DeleteIcon from '@mui/icons-material/Delete'
import PreviewIcon from '@mui/icons-material/Preview'
import {IconButton, Pagination} from '@mui/material'
import {FC, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {isMappable} from '../../app/helpers/isMapple'
import {useAppDispatch, useAppSelector} from '../../app/saga/hooks'
import {ICourse} from '../../models/Courses'
import history from '../../routes/history'
import {coursesActions} from '../../store/courses/coursesSlice'

const CoursesOverview: FC = () => {
  const courses = useAppSelector((state) => state.courses.data)
  const paginate = useAppSelector((state) => state.courses.paginate)

  const loading = useAppSelector((state) => state.courses.loadingGetData)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const payload: any = {
      limit: 10,
      page: 1,
    }
    dispatch(coursesActions.getDataStart(payload))
  }, [])

  const onChangePaginate = (page: number) => {
    const payload: any = {
      limit: 10,
      page,
    }
    dispatch(coursesActions.getDataStart(payload))
  }

  const onRedirectCourseDetail = (courseId: string) => {
    // dispatch(categoriesActions.getDetailCategory(category._id))
    history.replace(`/crafted/pages/courses/detail/${courseId}`)
  }

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Courses</h3>
          </div>
          <Link to='/crafted/pages/courses/create' className='btn btn-primary align-self-center'>
            Create Course
          </Link>
        </div>
        <div className='card-body p-9'>
          <table className='table align-middle'>
            <thead className={'text-uppercase text-dark thead-pito border-bottom text-uppercase'}>
              <tr>
                <th className='py-2 pl-4 pr-2 '>No</th>
                <th className='py-2'>Course Name</th>
                <th className='py-2 text-center'>Author Name</th>
                <th className='py-2 text-center'>Title</th>
                <th className='py-2 text-center'>Thumbnail</th>
                <th className='py-2 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody className='category-list'>
              {!loading && isMappable(courses) ? (
                courses?.map((course: ICourse, idx: number) => (
                  <tr key={course._id}>
                    <td>{idx + 1}</td>
                    <td>{course.name}</td>
                    <td className='text-center'>{course.authorName}</td>
                    <td>{course.title}</td>
                    <td>
                      <img
                        src={course.thumbnail}
                        alt='thumbnail'
                        width={70}
                        height={70}
                        style={{objectFit: 'cover'}}
                      />
                    </td>
                    <td className='text-center'>
                      <IconButton onClick={() => onRedirectCourseDetail(course._id)}>
                        <PreviewIcon color='info' />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon color='secondary' />
                      </IconButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <div className='text-center mt-9 p-6 spinner-border text-primary' role='status'>
                      <span className='visually-hidden'>Loading...</span>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className='d-flex justify-content-end p-6'>
          <Pagination
            count={paginate?.total_page}
            color='primary'
            onChange={(e: any, page: number) => onChangePaginate(page)}
          />
        </div>
      </div>
    </>
  )
}

export default CoursesOverview
