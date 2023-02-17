import {Button, Card, CardMedia, Grid} from '@mui/material'
import {useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../app/saga/hooks'
import history from '../../routes/history'
import {bannerActions} from '../../store/banner/bannerSlice'
import {format} from 'date-fns'
import {categoriesActions} from '../../store/categories/categoriesSlice'

const CategoryDetail = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.categories.loadingGetDetail)
  const category = useAppSelector((state) => state.categories.dataDetail)
  const {id}: any = useParams()

  useEffect(() => {
    dispatch(categoriesActions.getDetailCategory(id))
  }, [])

  return (
    <>
      {!isLoading ? (
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer d-flex align-items-center'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Category detail</h3>
            </div>
            <div className='d-flex'>
              <div className='pe-4'>
                <Button
                  color='warning'
                  size='small'
                  variant='contained'
                  onClick={() => dispatch(categoriesActions.onDeleteCategory(category?._id))}
                >
                  Delete
                </Button>
              </div>

              <div className=''>
                <Button
                  variant='contained'
                  size='small'
                  color='primary'
                  onClick={() => history.replace(`/crafted/pages/categories/update/${category?._id}`)}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
          <div className='card-body p-9'>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Name</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>{category?.name}</span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Priority</label>

              <div className='col-lg-8 fv-row'>
                <span className='fw-bold fs-6'>{category?.priority}</span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Date created</label>

              <div className='col-lg-8 fv-row'>
                {category?.createdAt ? (
                  <span className='fw-bold fs-6'>
                    {format(new Date(category?.createdAt), 'yyyy-MM-dd')}
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Date updated</label>

              <div className='col-lg-8 fv-row'>
                {category?.updatedAt ? (
                  <span className='fw-bold fs-6'>
                    {format(new Date(category?.updatedAt), 'yyyy-MM-dd')}
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Active status</label>

              <div className='col-lg-8 fv-row'>
                <span className='fw-bold fs-6'>
                  {category?.isActive ? (
                    <span className='badge badge-success'>active</span>
                  ) : (
                    <span className='badge badge-light'>inactive</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>Loading...</>
      )}
    </>
  )
}

export default CategoryDetail
