import {TextField} from '@mui/material'
import {Field, Form, Formik} from 'formik'
import {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../../app/saga/hooks'
import {IBanner} from '../../../models/BannerModels'
import DropzoneCustom from '../../../shared/dropzone/DropzoneCustom'
import {ErrorMessage} from '../../../shared/ErrorMesage/ErrorMessage'
import ListMedia from '../../../shared/ListMedia'
import {bannerActions} from '../../../store/banner/bannerSlice'
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
  }

  const dispatch = useAppDispatch()
  const images = useAppSelector((state) => state.banner.images)

  const [listImages, setListImages] = useState<any>(banner?.images || [])

  const onSubmit = (values: any) => {
    const payload = {
      ...values,
      images: listImages,
    }
    try {
      dispatch(bannerActions.onUpdateBanner(payload))
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

                <div className='row mb-9'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                    List Image
                  </label>
                  <div className='col-lg-8'>
                    <div className='col-lg-2'>
                      <DropzoneCustom
                        maxFile={15 - images?.length}
                        setFieldValue={setFieldValue}
                        name={'images'}
                      />
                    </div>
                    <div className='col-lg-10 mt-6'>
                      <ListMedia images={listImages} setFiles={setListImages} />
                    </div>
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

export default UpdateBanner