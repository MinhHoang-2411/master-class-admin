import { Form, Formik } from 'formik'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../../app/saga/hooks'
import { IUser } from '../../../models/User'
import { usersActions } from '../../../store/users/usersSlice'
import HeadSection from './Part/HeadSection'
import categorySchema from './Validate'

const UpdateUser = () => {
  const dispatch = useAppDispatch()
  const {id}: any = useParams()
  const ls: any = localStorage.getItem('userDetail')
  const userDetail: IUser = JSON.parse(ls)

  const initialValues = {
    _id: userDetail?._id ? userDetail?._id : '',
    firstName: userDetail?.firstName ? userDetail?.firstName : '',
    lastName: userDetail?.lastName ? userDetail?.lastName : '',
    isActive: userDetail?.isActive ? userDetail?.isActive : false,
  }

  const onSubmit = (values: any) => {
    try {
        dispatch(usersActions.handleUpdateUser(values))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    dispatch(usersActions.getDataDetailStart(id))
  }, [])

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Update User</h3>
          </div>
        </div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={categorySchema}>
          {({values, handleChange, setFieldValue}) => (
            <Form>
              <HeadSection
                values={values}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default UpdateUser
