import {Box, TextField} from '@mui/material'
import {Field} from 'formik'
import {useEffect, useState} from 'react'
import {isMappable} from '../../../../app/helpers/isMapple'
import {useAppDispatch, useAppSelector} from '../../../../app/saga/hooks'
import DropzoneCustom from '../../../../shared/dropzone/DropzoneCustom'
import {ErrorMessage} from '../../../../shared/ErrorMesage/ErrorMessage'
import ListMedia from '../../../../shared/ListMedia'
import {coursesActions} from '../../../../store/courses/coursesSlice'
import {uploadActions} from '../../../../store/upload/uploadSlice'

interface Props {
  values?: any
  setFieldValue?: any
}
const OverviewSection = ({values, setFieldValue}: Props) => {
  const [indexState, setIndexState] = useState(0)
  const dispatch = useAppDispatch()
  const image: any = useAppSelector((state) => state.upload.overviewImage)

  const onUploadImage = (formData: any) => {
    dispatch(uploadActions.uploadOverviewImage(formData))
  }
  useEffect(() => {
    if (image.urlThumbnail) {
      setFieldValue(`overview.skills.${indexState}.imageUrl`, [image.urlThumbnail])
    }
  }, [image])
  return (
    <div>
      <div className='row'>
        {/* <label className='col-lg-4 col-form-label fw-bold fs-4'>Overview</label> */}
        <div>
          <Box
            sx={{
              backgroundColor: '#f8f9fa',
              mt: 1.5,
              px: 2.5,
              borderRadius: 2,
              position: 'relative',
            }}
          >
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Slogan</label>
              <div className='col-lg-8 fv-row'>
                <Field
                  as={TextField}
                  name='overview.slogan'
                  label='Slogan'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                />
                <ErrorMessage name='overview.slogan' />
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Description</label>
              <div className='col-lg-8 fv-row'>
                <Field
                  as={TextField}
                  name='overview.description'
                  label='Description'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                />
                <ErrorMessage name='overview.description' />
              </div>
            </div>
            <div className='row mb-6'>
              {isMappable(values.overview.skills) ? (
                values.overview.skills.map((skill: any, index: number) => (
                  <div className='px-3'>
                    <div className='row mb-6 py-3'>
                      <label className='col-lg-4 col-form-label required fw-bold fs-6'>Image</label>
                      <div className='col-lg-8'>
                        <div className='col-lg-2'>
                          <DropzoneCustom
                            maxFile={1}
                            onUploadImage={onUploadImage}
                            typeAppend={'image'}
                            setIndex={setIndexState}
                            index={index}
                          />
                        </div>
                        <div className='col-lg-10 mt-6'>
                          <ListMedia
                            images={skill.imageUrl}
                            setFieldValue={setFieldValue}
                            nameValue={`overview.skills.${index}.imageUrl`}
                          />
                        </div>
                        <div className='py-3'>
                          <ErrorMessage name={`overview.skills.${index}.imageUrl`} />
                        </div>
                      </div>
                    </div>
                    <div className='row mb-6'>
                      <label className='col-lg-4 col-form-label required fw-bold fs-6'>Title</label>
                      <div className='col-lg-8 fv-row'>
                        <Field
                          as={TextField}
                          name={`overview.skills.${index}.title`}
                          label='Title'
                          variant='outlined'
                          margin='normal'
                          fullWidth
                        />
                        <ErrorMessage name={`overview.skills.${index}.title`} />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default OverviewSection
