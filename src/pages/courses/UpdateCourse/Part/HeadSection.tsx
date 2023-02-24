import CloseIcon from '@mui/icons-material/Close'
import {Chip, TextField} from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import {Field} from 'formik'
import {useEffect, useState} from 'react'
import {isMappable} from '../../../../app/helpers/isMapple'
import {useAppDispatch, useAppSelector} from '../../../../app/saga/hooks'
import DropzoneCustom from '../../../../shared/dropzone/DropzoneCustom'
import {ErrorMessage} from '../../../../shared/ErrorMesage/ErrorMessage'
import ListMedia from '../../../../shared/ListMedia'
import {uploadActions} from '../../../../store/upload/uploadSlice'

interface Props {
  values: any
  setFieldValue: any
  listCategory: any
  course: any
}

const HeadSection = ({values, setFieldValue, listCategory, course}: Props) => {
  const [index, setIndex] = useState(0)
  const dispatch = useAppDispatch()
  const image: any = useAppSelector((state) => state.upload.thumbnail)

  useEffect(() => {
    setFieldValue(
      'categories',
      listCategory?.filter((item: any) => course?.categories?.includes(item?._id))
    )
  }, [listCategory])

  useEffect(() => {
    if (image.urlThumbnail) {
      setFieldValue('thumbnail', [image.urlThumbnail])
    }
  }, [image])

  const onUploadThumbail = (formData: any) => {
    dispatch(uploadActions.uploadThumbail(formData))
  }

  const handleSelectChange = (event: any, items: any) => {
    setFieldValue('categories', items)
  }

  return (
    <div>
      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Name</label>
        <div className='col-lg-8 fv-row'>
          <Field
            as={TextField}
            name='name'
            label='Name'
            variant='outlined'
            value={values?.name}
            margin='normal'
            fullWidth
          />
          <ErrorMessage name='name' />
        </div>
      </div>
      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Category</label>
        <div className='col-lg-8 fv-row'>
          {isMappable(values?.categories) ? (
            <Autocomplete
              multiple
              id='tags-filled'
              options={listCategory || []}
              value={values?.categories}
              onChange={handleSelectChange}
              getOptionLabel={(option) => option.name}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    {...getTagProps({index})}
                    key={option._id}
                    label={option.name}
                    deleteIcon={<CloseIcon />}
                    onDelete={() => {
                      const newSelectedItems = [...values.categories]
                      newSelectedItems.splice(index, 1)
                      setFieldValue('categories', newSelectedItems)
                    }}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} variant='outlined' label='Category' />
              )}
            />
          ) : (
            <></>
          )}
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
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Author Name</label>
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
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Thumbnail</label>
        <div className='col-lg-8'>
          <div className='col-lg-2'>
            <DropzoneCustom
              maxFile={1 - values.thumbnail?.length}
              onUploadImage={onUploadThumbail}
              typeAppend={'image'}
              setIndex={setIndex}
              index={index}
            />
          </div>
          <div className='col-lg-10 mt-6'>
            <ListMedia
              images={values.thumbnail}
              setFieldValue={setFieldValue}
              nameValue={'thumbnail'}
            />
          </div>
          <div className='py-3'>
            <ErrorMessage name='thumbnail' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeadSection
