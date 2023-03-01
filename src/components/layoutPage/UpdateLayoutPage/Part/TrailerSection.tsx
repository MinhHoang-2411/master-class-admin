import {TextareaAutosize, TextField} from '@mui/material'
import {Field} from 'formik'
import {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../../../app/saga/hooks'
import VideoPlayer from '../../../../pages/courses/CreateCourse/Part/VideoPlayer'
import DropzoneCustom from '../../../../shared/dropzone/DropzoneCustom'
import DropzoneVideo from '../../../../shared/dropzone/DropzoneVideo'
import {ErrorMessage} from '../../../../shared/ErrorMesage/ErrorMessage'
import ListMedia from '../../../../shared/ListMedia'
import {layoutPageActions} from '../../../../store/layoutPage/layoutPageSlice'

interface IProps {
  values?: any
  setFieldValue?: any
}

const TrailerSection = ({values, setFieldValue}: IProps) => {
  const dispatch = useAppDispatch()
  const [index, setIndex] = useState(0)

  const image: any = useAppSelector((state) => state.layoutPage.trailerThumbnail)
  const video: any = useAppSelector((state) => state.layoutPage.trailerUrl)

  useEffect(() => {
    if (image.urlThumbnail) {
      setFieldValue(`trailer.thumbnail`, [image.urlThumbnail])
    }
  }, [image])
  
  useEffect(() => {
    if (video.urlFile) {
      setFieldValue(`trailer.url`, video.urlFile)
    }
  }, [video])


 
  const onUploadImage = (formData: any) => {
    dispatch(layoutPageActions.uploadTrailerThumbnailStart(formData))
  }

  const onUploadVideo = (formdata: any) => {
    dispatch(layoutPageActions.uploadTrailerUrlStart(formdata))
  }

  const onDeleteVideo = (url: string, index: number) => {
    const payload: any = {
      urlFile: url,
      uploadType: 'video',
    }
    dispatch(layoutPageActions.handleDeleteVideoStart(payload))
    setFieldValue(`trailer.url`, '')
  }

  return (
    <div>
      <label className='col-lg-4 col-form-label fw-bold fs-4'>Trailer</label>
      <div className='px-4'>
        <div className='row'>
          <div className='row mb-6 px-4'>
            <label className='col-lg-4 col-form-label required fw-bold fs-6'>Description</label>
            <div className='col-lg-8 fv-row'>
              <Field
                as={TextField}
                name={`trailer.description`}
                label='Description'
                variant='outlined'
                margin='normal'
                fullWidth
              />
              <ErrorMessage name={`trailer.description`} />
            </div>
          </div>
        </div>
        <div className='row'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>Video</label>
          <div className='col-lg-8'>
            <div className='col-lg-2'>
              <DropzoneVideo
                maxFile={1}
                onUploadVideo={onUploadVideo}
                typeAppend={'file'}
                setIndex={setIndex}
                idx={index}
                setFieldValue={setFieldValue}
                nameValue={`trailer.url`}
              />
            </div>
            <div className='py-3'>
              <ErrorMessage name={`trailer.url`} />
            </div>

            <div className='col-lg-10 mt-6'>
              {values.trailer?.url ? (
                <VideoPlayer url={values.trailer.url} onDeleteVideo={onDeleteVideo} index={index} />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className='row mb-6 py-3'>
          <label className='col-lg-4 col-form-label required fw-bold fs-6'>Thumbnail</label>
          <div className='col-lg-8'>
            <div className='col-lg-2'>
              <DropzoneCustom
                maxFile={1}
                onUploadImage={onUploadImage}
                typeAppend={'image'}
                setIndex={setIndex}
                index={index}
              />
            </div>
            <div className='col-lg-10 mt-6'>
              <ListMedia
                images={values.trailer.thumbnail}
                setFieldValue={setFieldValue}
                nameValue={`trailer.thumbnail`}
              />
            </div>
            <div className='py-3'>
              <ErrorMessage name={`trailer.thumbnail`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrailerSection
