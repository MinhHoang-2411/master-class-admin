import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from '@mui/material'
import { Field } from 'formik'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/saga/hooks'
import { ICategory } from '../../../../models/CategoryModels'
import DropzoneCustom from '../../../../shared/dropzone/DropzoneCustom'
import { ErrorMessage } from '../../../../shared/ErrorMesage/ErrorMessage'
import ListMedia from '../../../../shared/ListMedia'
import { uploadActions } from '../../../../store/upload/uploadSlice'

interface Props {
  values: any
  setFieldValue: any
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 224,
      width: 250,
    },
  },
}

const HeadSection = ({values, setFieldValue}: Props) => {
  const [index, setIndex] = useState(0)
  const dispatch = useAppDispatch()
  const listCategory = useAppSelector((state) => state.categories.data)
  const image: any = useAppSelector((state) => state.upload.thumbnail)

  useEffect(() => {
    if (image.urlThumbnail) {
      setFieldValue('thumbnail', [image.urlThumbnail])
    }
  }, [image]) 

  const onUploadThumbail = (formData: any) => {
    dispatch(uploadActions.uploadThumbail(formData))
  }

  const handleChange = (event: any) => {
    const {
      target: {value},
    } = event
    setFieldValue('categories', typeof value === 'string' ? value.split(',') : value)
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
            value={values.name}
            margin='normal'
            fullWidth
          />
          <ErrorMessage name='name' />
        </div>
      </div>
      <div className='row mb-6'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Category</label>
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
