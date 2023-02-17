import {Switch, TextField} from '@mui/material'
import {Field, Form, Formik} from 'formik'
import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../../app/saga/hooks'
import {ErrorMessage} from '../../../shared/ErrorMesage/ErrorMessage'
import {categoriesActions} from '../../../store/categories/categoriesSlice'
import categorySchema from './Validate'

const UpdateCategory = () => {
  const dispatch = useAppDispatch()
  const {id}: any = useParams()
  const ls: any = localStorage.getItem('categoryDetail')
  const category = JSON.parse(ls)

  const initialValues = {
    id: category?._id ? category?._id : '',
    name: category?.name ? category?.name : '',
    isActive: category?.isActive,
  }

  const onSubmit = (values: any) => {
    try {
      dispatch(categoriesActions.onUpdateCategory(values))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    dispatch(categoriesActions.getDetailCategory(id))
  }, [])

  const label = {inputProps: {'aria-label': 'Switch status'}}
  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Update Category</h3>
          </div>
        </div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={categorySchema}>
          {({values, handleChange, setFieldValue}) => (
            <Form>
              <div className='card-body border-top p-9'>
                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>Name</label>
                  <div className='col-lg-8 fv-row'>
                    <Field
                      as={TextField}
                      name='name'
                      label='Name'
                      variant='outlined'
                      value={values.name}
                      onChange={handleChange}
                      margin='normal'
                      fullWidth
                    />
                    <ErrorMessage name='name' />
                  </div>
                </div>
                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                    Active status
                  </label>
                  <div className='col-lg-8 fv-row'>
                    <Switch
                      {...label}
                      color='secondary'
                      checked={values.isActive}
                      value={values.isActive}
                      onChange={(e) => setFieldValue('isActive', e.target.checked)}
                    />
                    <ErrorMessage name='isActive' />
                  </div>
                </div>
                <div className='card-footer d-flex justify-content-end py-6 px-9'>
                  <button type='submit' className='btn btn-primary'>
                    Update banner
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default UpdateCategory
