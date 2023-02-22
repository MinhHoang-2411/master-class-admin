import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material'
import {Field, Form, Formik} from 'formik'
import {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../../app/saga/hooks'
import {ICategory} from '../../../models/CategoryModels'
import DropzoneCustom from '../../../shared/dropzone/DropzoneCustom'
import {ErrorMessage} from '../../../shared/ErrorMesage/ErrorMessage'
import ListMedia from '../../../shared/ListMedia'
import {categoriesActions} from '../../../store/categories/categoriesSlice'
import {coursesActions} from '../../../store/courses/coursesSlice'
import LessonSection from './LessonSection'
import courseSchema from './Validate'

interface IValues {
  name: string
  title: string
  thumbnail: string[]
  authorName: string
  categories: string[]
  lessons: [
    {
      index: number
      title: string
      description: string
      videoUrl: string
    }
  ]
  videoPreview: string
}

const initialValues: IValues = {
  name: '',
  title: '',
  thumbnail: [],
  authorName: '',
  categories: [],
  lessons: [
    {
      index: 1,
      title: '',
      description: '',
      videoUrl: '',
    },
  ],
  videoPreview: '',
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 224,
      width: 250,
    },
  },
}

const CreateCourse = () => {
  const dispatch = useAppDispatch()
  const listCategory = useAppSelector((state) => state.categories.data)
  const thumbnail = useAppSelector((state) => state.courses.thumbnail)
  const [listImages, setListImages] = useState<string[]>(thumbnail)

  useEffect(() => {
    dispatch(categoriesActions.getDataStart())
  }, [])

  useEffect(() => {
    if (thumbnail.urlThumbnail) {
      setListImages([thumbnail.urlThumbnail])
    }
  }, [thumbnail])

  const onUploadThumbail = (formData: any) => {
    dispatch(coursesActions.onUploadThumbail(formData))
  }

  const onSubmit = (values: any) => {
    const _categoriesId = listCategory
      ?.filter((cate: any) => values?.categories?.includes(cate?.name))
      .map((cate: any) => cate?._id)
    const params = {
      ...values,
      categories: _categoriesId,
      thumbnail: listImages[0],
    }
    dispatch(coursesActions.onCreateCourse(params))
  }

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Create Course</h3>
          </div>
        </div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={courseSchema}>
          {({values, setFieldValue}) => {
            const handleChange = (event: any) => {
              const {
                target: {value},
              } = event
              setFieldValue('categories', typeof value === 'string' ? value.split(',') : value)
            }
            return (
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
                        margin='normal'
                        fullWidth
                      />
                      <ErrorMessage name='name' />
                    </div>
                  </div>
                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                      Category
                    </label>
                    <div className='col-lg-8 fv-row'>
                      <FormControl fullWidth>
                        <InputLabel id='multiple-chip-label'>Category</InputLabel>
                        <Field
                          as={Select}
                          sx={{width: '100%'}}
                          labelId='multiple-chip-label'
                          label={'Category'}
                          id='multiple-chip'
                          multiple
                          value={values.categories}
                          onChange={handleChange}
                          input={<OutlinedInput id='select-multiple-chip' label='Category' />}
                          renderValue={(selected: any) => (
                            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                              {selected.map((value: any) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {listCategory?.map((category: ICategory) => (
                            <MenuItem key={category._id} value={category.name}>
                              {category.name}
                            </MenuItem>
                          ))}
                        </Field>
                        <ErrorMessage name='categories' />
                      </FormControl>
                    </div>
                  </div>

                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>Title</label>
                    <div className='col-lg-8 fv-row'>
                      <Field
                        as={TextField}
                        name='title'
                        label='Title'
                        variant='outlined'
                        value={values.title}
                        margin='normal'
                        fullWidth
                      />
                      <ErrorMessage name='title' />
                    </div>
                  </div>
                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                      Author Name
                    </label>
                    <div className='col-lg-8 fv-row'>
                      <Field
                        as={TextField}
                        name='authorName'
                        label='Author Name'
                        variant='outlined'
                        value={values.authorName}
                        margin='normal'
                        fullWidth
                      />
                      <ErrorMessage name='authorName' />
                    </div>
                  </div>
                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                      Thumbnail
                    </label>
                    <div className='col-lg-8'>
                      <div className='col-lg-2'>
                        <DropzoneCustom
                          maxFile={1 - thumbnail?.length}
                          onUploadImage={onUploadThumbail}
                          typeAppend={'image'}
                        />
                      </div>
                      <div className='col-lg-10 mt-6'>
                        <ListMedia images={listImages} setFiles={setListImages} />
                      </div>
                    </div>
                  </div>

                  <LessonSection setFieldValue={setFieldValue} values={values} />

                  <div className='card-footer d-flex justify-content-end'>
                    <button type='submit' className='btn btn-primary'>
                      Create
                    </button>
                  </div>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </>
  )
}

export default CreateCourse
