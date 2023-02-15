import {TextField} from '@mui/material'
import console from 'console'
import {Field, Form, Formik} from 'formik'
import {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../../app/saga/hooks'
import DropzoneCustom from '../../../shared/dropzone/DropzoneCustom'
import {ErrorMessage} from '../../../shared/ErrorMesage/ErrorMessage'
import ListMedia from '../../../shared/ListMedia'
import {bannerActions} from '../../../store/banner/bannerSlice'
import bannerSchema from './Validate'

const initialValues = {
  name: '',
  title: '',
  description: '',
  images: [],
}

const CreateBanner = () => {
  const dispatch = useAppDispatch()
  const images = useAppSelector((state) => state.banner.images)

  const [listImages, setListImages] = useState<any>([])

  const onSubmit = (values: any) => {
    const payload = {
      ...values,
      images: listImages,
    }
    try {
      dispatch(bannerActions.onCreateBanner(payload))
    } catch (error) {}
  }

  useEffect(() => {
    setListImages([...listImages, ...images])
  }, [images])

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

                <div className='row mb-9'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                    List Image
                  </label>
                  <div className='col-lg-8'>
                    <div className='col-lg-2'>
                      <DropzoneCustom
                        maxFile={15 - images.length}
                        setFieldValue={setFieldValue}
                        name={values.images}
                      />
                    </div>
                    <div className='col-lg-10 mt-6'>
                      <ListMedia images={listImages} setFiles={setListImages} />
                    </div>
                  </div>
                </div>

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
