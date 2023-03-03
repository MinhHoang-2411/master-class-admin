import {Button} from '@mui/material'
import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../app/saga/hooks'
import {IUser} from '../../models/User'
import history from '../../routes/history'
import {usersActions} from '../../store/users/usersSlice'

const UserDetail = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.users.loadingGetUserDetail)
  const userDetail: IUser = useAppSelector((state) => state.users.userDetail)
  const {id}: any = useParams()

  useEffect(() => {
    dispatch(usersActions.getDataDetailStart(id))
  }, [dispatch, id])

  return (
    <>
      {!isLoading ? (
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer d-flex align-items-center'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>User detail</h3>
            </div>
            <div className='d-flex'>
              <div className='pe-4'>
                <Button
                  color='warning'
                  size='small'
                  variant='contained'
                  onClick={() => dispatch(usersActions.handleBlockUser(userDetail))}
                >
                  {`${userDetail?.isActive  ? 'Block' : 'Unblock'}`}
                </Button>
              </div>

              <div className=''>
                <Button
                  variant='contained'
                  size='small'
                  color='primary'
                  onClick={() => history.replace(`/crafted/pages/users/update/${userDetail?._id}`)}
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
          <div className='card-body p-9'>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Name</label>
              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>{`${userDetail?.firstName} ${userDetail?.lastName}`}</span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Email</label>
              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>{`${userDetail?.email}`}</span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Role</label>
              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>{`${userDetail?.roleName}`}</span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Active status</label>

              <div className='col-lg-8 fv-row'>
                <span className='fw-bold fs-6'>
                  {userDetail?.isActive ? (
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

export default UserDetail
