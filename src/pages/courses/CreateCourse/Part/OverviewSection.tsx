import {Box, Button, TextField} from '@mui/material'
import {Field} from 'formik'
import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import {isMappable} from '../../../../app/helpers/isMapple'
import {useAppDispatch, useAppSelector} from '../../../../app/saga/hooks'
import DropzoneCustom from '../../../../shared/dropzone/DropzoneCustom'
import {ErrorMessage} from '../../../../shared/ErrorMesage/ErrorMessage'
import ListMedia from '../../../../shared/ListMedia'
import {uploadActions} from '../../../../store/upload/uploadSlice'
import CloseIcon from '@mui/icons-material/Close'
import {IconButton} from '@mui/material'

interface Props {
  values?: any
  setFieldValue?: any
  tabLanguage?: number
}
const OverviewSection = ({values, setFieldValue, tabLanguage}: Props) => {
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

  const handleAddSkill = () => {
    const skill = {
      imageUrl: [],
      title: {
        vi: '',
        en: '',
      },
    }
    let newArr: any[] = []
    newArr = [...values.overview.skills, skill]
    setFieldValue(`overview.skills`, newArr)
    toast.success('Add skill success')
  }

  const handleRemoveSkill = (index: number) => {
    const skills = values?.overview.skills?.filter((_: never, idx: number) => idx !== index)
    setFieldValue(`overview.skills`, skills)
    toast.info('Remove skill success')
  }

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
            {tabLanguage === 0 ? (
              <div className='row mb-6 py-2'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Slogan</label>
                <div className='col-lg-8 fv-row'>
                  <Field
                    as={TextField}
                    name='overview.slogan.en'
                    label='Slogan English'
                    variant='outlined'
                    margin='normal'
                    fullWidth
                  />
                  <ErrorMessage name='overview.slogan.en' />
                </div>
              </div>
            ) : (
              <div className='row mb-6 py-2'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>Slogan</label>
                <div className='col-lg-8 fv-row'>
                  <Field
                    as={TextField}
                    name='overview.slogan.vi'
                    label='Slogan Vietnamese'
                    variant='outlined'
                    margin='normal'
                    fullWidth
                  />
                </div>
              </div>
            )}

            {tabLanguage === 0 ? (
              <div className='row mb-6 py-2'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Description</label>
                <div className='col-lg-8 fv-row'>
                  <Field
                    as={TextField}
                    name='overview.description.en'
                    label='Description English'
                    variant='outlined'
                    margin='normal'
                    inputProps={{maxLength: 257}}
                    fullWidth
                  />
                  <ErrorMessage name='overview.description.en' />
                </div>
              </div>
            ) : (
              <div className='row mb-6 py-2'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>Description</label>
                <div className='col-lg-8 fv-row'>
                  <Field
                    as={TextField}
                    name='overview.description.vi'
                    label='Description Vietnamese'
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    inputProps={{maxLength: 256}}
                  />
                </div>
              </div>
            )}

            <div className='row mb-6'>
              <div className='row'>
                <label className='col-lg-4 col-form-label fw-bold fs-4'>What you'll learn</label>
                <div className='col-lg-8 fv-row d-flex justify-content-end align-items-center'>
                  <div className=''>
                    <Button
                      variant='contained'
                      size='small'
                      color='primary'
                      onClick={handleAddSkill}
                    >
                      Add skill
                    </Button>
                  </div>
                </div>
              </div>

              {isMappable(values.overview.skills) ? (
                values.overview.skills.map((skill: any, index: number) => (
                  <div className='px-6 border position-relative'>
                    {index >= 1 && (
                      <IconButton
                        color='primary'
                        component='label'
                        sx={{position: 'absolute', top: 3, right: 3}}
                        onClick={() => handleRemoveSkill(index)}
                      >
                        <CloseIcon sx={{backgroundColor: '#f1f1f1', borderRadius: '50%'}} />
                      </IconButton>
                    )}

                    <label className='col-lg-4 col-form-label fw-bold fs-6'>
                      {`Skill ${index + 1}`}
                    </label>
                    <div className='px-4'>
                      <div className='row mb-6 py-3'>
                        <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                          Image
                        </label>
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
                      {tabLanguage === 0 ? (
                        <div className='row mb-6'>
                          <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                            Title
                          </label>
                          <div className='col-lg-8 fv-row'>
                            <Field
                              as={TextField}
                              name={`overview.skills.${index}.title.en`}
                              label='Title English'
                              variant='outlined'
                              margin='normal'
                              fullWidth
                            />
                            <ErrorMessage name={`overview.skills.${index}.title.en`} />
                          </div>
                        </div>
                      ) : (
                        <div className='row mb-6'>
                          <label className='col-lg-4 col-form-label fw-bold fs-6'>Title</label>
                          <div className='col-lg-8 fv-row'>
                            <Field
                              as={TextField}
                              name={`overview.skills.${index}.title.vi`}
                              label='Title Vietnamese'
                              variant='outlined'
                              margin='normal'
                              fullWidth
                            />
                          </div>
                        </div>
                      )}
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
