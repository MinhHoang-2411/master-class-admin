import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useAppDispatch } from '../../../app/saga/hooks'
import { ErrorMessage } from '../../../shared/ErrorMesage/ErrorMessage'
import { bannerActions } from '../../../store/banner/bannerSlice'
import ImageSection from './Part/ImageSection'
import bannerSchema from './Validate'

const initialValues = {
  name: '',
  title: '',
  description: '',
  images: [],
}

const CreateBanner = () => {
  const dispatch = useAppDispatch()

  const onSubmit = (values: any) => {
    const payload = {
      ...values,
      images: values.images,
    }
    try {
      dispatch(bannerActions.onCreateBanner(payload))
    } catch (error) {}
  }

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Banners</h3>
          </div>
        </div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={bannerSchema}>
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
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>Title</label>
                  <div className='col-lg-8 fv-row'>
                    <Field
                      name='title'
                      as={TextField}
                      label='Title'
                      variant='outlined'
                      value={values.title}
                      onChange={handleChange}
                      margin='normal'
                      fullWidth
                    />
                    <ErrorMessage name='title' />
                  </div>
                </div>
                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                    Description
                  </label>
                  <div className='col-lg-8 fv-row'>
                    <Field
                      name='description'
                      as={TextField}
                      label='Description'
                      variant='outlined'
                      value={values.description}
                      onChange={handleChange}
                      multiline
                      rows={4}
                      margin='normal'
                      fullWidth
                    />
                    <ErrorMessage name='description' />
                  </div>
                </div>

                <ImageSection values={values} setFieldValue={setFieldValue} />

                <div className='card-footer d-flex justify-content-end py-6 px-9'>
                  <button type='submit' className='btn btn-primary'>
                    Create banner
                    {/* {!loading && 'Save Changes'}
                    {loading && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )} */}
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

export default CreateBanner
