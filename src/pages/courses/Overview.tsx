import DeleteIcon from '@mui/icons-material/Delete'
import PreviewIcon from '@mui/icons-material/Preview'
import {IconButton, Pagination} from '@mui/material'
import {FC, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {isMappable} from '../../app/helpers/isMapple'
import {useAppDispatch, useAppSelector} from '../../app/saga/hooks'
import {ICourse} from '../../models/Courses'
import history from '../../routes/history'
import SearchInput from '../../shared/Search'
import {coursesActions} from '../../store/courses/coursesSlice'
import {uploadActions} from '../../store/upload/uploadSlice'
import {format} from 'date-fns'

const CoursesOverview: FC = () => {
  const dispatch = useAppDispatch()
  const courses = useAppSelector((state) => state.courses.data)
  const paginate = useAppSelector((state) => state.courses.paginate)
  const loading = useAppSelector((state) => state.courses.loadingGetData)
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    const payload: any = {
      limit: 10,
      page: paginate?.page || 1,
    }
    dispatch(coursesActions.getDataStart(payload))
  }, [])

  useEffect(() => {
    dispatch(uploadActions.clearStore())
  })

  const onChangePaginate = (page: number) => {
    const payload: any = {
      limit: 10,
      page,
      search: searchTerm,
    }
    dispatch(coursesActions.getDataStart(payload))
  }

  const onRedirectCourseDetail = (courseId: string) => {
    history.replace(`/crafted/pages/courses/detail/${courseId}`)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const onSearch = () => {
    const payload: any = {
      page: 1,
      limit: paginate.limit,
      search: searchTerm,
    }
    dispatch(coursesActions.getDataStart(payload))
  }

  console.log('courses', courses)

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
        <div className='d-flex justify-content-end p-6 pb-0'>
          <SearchInput
            size='small'
            color='secondary'
            onChange={handleSearchChange}
            onSearch={onSearch}
          />
        </div>
        <div className='card-body p-6'>
          <table className='table align-middle'>
            <thead className={'text-uppercase text-dark thead-pito border-bottom text-uppercase'}>
              <tr>
                <th className='py-2 text-center'>No</th>
                <th className='py-2'>Course Name</th>
                <th className='py-2'>Author Name</th>
                <th className='py-2'>Title</th>
                <th className='py-2'>Thumbnail</th>
                <th className='py-2 text-center'>Date deleted</th>
                <th className='py-2 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody className='category-list'>
              {isMappable(courses) ? (
                !loading ? (
                  courses?.map((course: ICourse, idx: number) => (
                    <tr key={course._id}>
                      <td className='text-center'>{idx + 1 + (paginate.page - 1) * 10}</td>
                      <td className=''>{course.name}</td>
                      <td className=''>{course.authorName}</td>
                      <td className='' style={{width: '500px'}}>
                        {course.title}
                      </td>
                      <td className=''>
                        <img
                          src={course.thumbnail}
                          alt='thumbnail'
                          width={70}
                          height={70}
                          style={{objectFit: 'cover'}}
                        />
                      </td>
                      <td className='text-center' style={{width: '100px'}}>
                        {course?.deletedAt ? (
                          <span>{format(new Date(course?.deletedAt), 'yyyy-MM-dd')}</span>
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                      <td className='text-center'>
                        <IconButton onClick={() => onRedirectCourseDetail(course._id)}>
                          <PreviewIcon color='info' />
                        </IconButton>
                        <IconButton
                          onClick={() => dispatch(coursesActions.onDeleteCourse(course._id))}
                        >
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
                      <div
                        className='text-center mt-9 p-6 spinner-border text-primary'
                        role='status'
                      >
                        <span className='visually-hidden'>Loading...</span>
                      </div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                )
              ) : (
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <label className='fw-bold text-muted mt-4'>There are no course</label>
                  </td>
                  <td></td>
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
            defaultPage={paginate?.page || 1}
            color='primary'
            onChange={(e: any, page: number) => onChangePaginate(page)}
          />
        </div>
      </div>
    </>
  )
}

export default CoursesOverview
