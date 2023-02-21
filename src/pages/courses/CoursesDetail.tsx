import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../app/saga/hooks'
import {coursesActions} from '../../store/courses/coursesSlice'
import {Button} from '@mui/material'
import {format} from 'date-fns'
import history from '../../routes/history'
import {ICourse} from '../../models/Courses'

const CoursesDetail = () => {
  const dispatch = useAppDispatch()
  const loading = useAppSelector((state) => state.categories.loadingGetDetail)
  const course: ICourse = useAppSelector((state) => state.courses.dataDetail)
  const {id}: any = useParams()

  useEffect(() => {
    dispatch(coursesActions.getDetailStart(id))
  }, [])

  return (
    <>
      {!loading ? (
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer d-flex align-items-center'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Course detail</h3>
            </div>
            <div className='d-flex'>
              <div className='pe-4'>
                <Button
                  color='warning'
                  size='small'
                  variant='contained'
                  onClick={() => dispatch(coursesActions.onDeleteCourse(id))}
                >
                  Delete
                </Button>
              </div>

              <div className=''>
                <Button
                  variant='contained'
                  size='small'
                  color='primary'
                  onClick={() => history.replace(`/crafted/pages/categories/update/${course?._id}`)}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
          <div className='card-body p-9'>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Course Name</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>{course?.name}</span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Author Name</label>

              <div className='col-lg-8 fv-row'>
                <span className='fw-bold fs-6'>{course?.authorName}</span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Title</label>

              <div className='col-lg-8 fv-row'>
                <span className='fw-bold fs-6'>{course?.title}</span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Thumbnail</label>

              <div className='col-lg-8 fv-row'>
                <img src={course?.thumbnail} width={120} height={120} alt='thumbnail' style={{ objectFit: 'cover'}} />
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Date created</label>

              <div className='col-lg-8 fv-row'>
                {course?.createdAt ? (
                  <span className='fw-bold fs-6'>
                    {format(new Date(course?.createdAt), 'yyyy-MM-dd')}
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default CoursesDetail
