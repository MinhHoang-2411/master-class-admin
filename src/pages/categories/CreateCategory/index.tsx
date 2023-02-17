import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useAppDispatch } from '../../../app/saga/hooks'
import { ErrorMessage } from '../../../shared/ErrorMesage/ErrorMessage'
import { categoriesActions } from '../../../store/categories/categoriesSlice'
import categorySchema from './Validate'

const initialValues = {
  name: '',
}

const CreateCategory = () => {
  const dispatch = useAppDispatch();

  const onSubmit = (values: any) => {
    try {
      dispatch(categoriesActions.onCreateCategory(values))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Category</h3>
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
                <div className='card-footer d-flex justify-content-end py-6 px-9'>
                  <button type='submit' className='btn btn-primary'>
                    Create banner
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

export default CreateCategory
