import { Switch, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useAppDispatch } from '../../../app/saga/hooks'
import { IBanner } from '../../../models/BannerModels'
import { ErrorMessage } from '../../../shared/ErrorMesage/ErrorMessage'
import { bannerActions } from '../../../store/banner/bannerSlice'
import ImageSection from './Part/ImageSection'
import bannerSchema from './Validate'

interface IProps {
  banner: IBanner
}

const UpdateBanner = ({banner}: IProps) => {
  const item: any = localStorage.getItem('itemUpdate')
  const _banner = JSON.parse(item)
  const initialValues = {
    _id: banner?._id ? banner?._id : _banner?._id,
    name: banner?.name ? banner?.name : _banner?.name,
    title: banner?.title ? banner?.title : _banner?.title,
    description: banner?.description ? banner?.description : _banner?.description,
    images: banner?.images ? banner?.images : [],
    isActive: banner?.isActive ? banner?.isActive : _banner?.isActive,
  }

  const dispatch = useAppDispatch()

  const onSubmit = (values: any) => {
    const payload = {
      ...values,
      images: values.images,
    }
    try {
      dispatch(bannerActions.onUpdateBanner(payload))
    } catch (error) {}
  }

  const label = {inputProps: {'aria-label': 'Switch status'}}

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Banners update</h3>
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
                      // value={values?.name}
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
                      // value={values?.title}
                      onChange={handleChange}
                      margin='normal'
                      fullWidth
                    />
                    <ErrorMessage name='title' />
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
                      // value={values?.description}
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

export default UpdateBanner
