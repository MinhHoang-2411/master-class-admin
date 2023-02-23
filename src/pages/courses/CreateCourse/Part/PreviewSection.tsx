import {Box} from '@mui/material'
import {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../../../app/saga/hooks'
import DropzoneCustom from '../../../../shared/dropzone/DropzoneCustom'
import DropzoneVideo from '../../../../shared/dropzone/DropzoneVideo'
import {ErrorMessage} from '../../../../shared/ErrorMesage/ErrorMessage'
import ListMedia from '../../../../shared/ListMedia'
import {coursesActions} from '../../../../store/courses/coursesSlice'
import {uploadActions} from '../../../../store/upload/uploadSlice'
import VideoPlayer from './VideoPlayer'

interface Props {
  values: any
  setFieldValue: any
}

const PreviewSection = ({values, setFieldValue}: Props) => {
  const dispatch = useAppDispatch()
  const video: any = useAppSelector((state) => state.upload.previewVideo)
  const image: any = useAppSelector((state) => state.upload.previewImage)

  const [index, setIndex] = useState(0)

  const onUploadImage = (formData: any) => {
    dispatch(uploadActions.uploadPreviewImage(formData))
  }

  const onUploadVideo = (formData: any) => {
    dispatch(uploadActions.uploadPreviewVideo(formData))
  }

  const onDeleteVideo = (url: string, index: number) => {
    const payload: any = {
      urlFile: url,
      uploadType: 'video',
    }
    dispatch(coursesActions.onDeleteVideo(payload))
    setFieldValue(`videoPreview.url`, '')
  }

  useEffect(() => {
    if (image.urlThumbnail) {
      setFieldValue('videoPreview.thumbnail', [image.urlThumbnail])
    }
  }, [image])

  useEffect(() => {
    if (video.urlFile) {
      setFieldValue('videoPreview.url', video.urlFile)
    }
  }, [video])

  return (
    <div>
      <div className='row border-top'>
        <label className='col-lg-4 col-form-label fw-bold fs-4'>Preview</label>
        <div className='px-2'>
          <Box
            sx={{
              backgroundColor: '#f8f9fa',
              mt: 1.5,
              px: 2.5,
              borderRadius: 2,
              position: 'relative',
            }}
          >
            <div className='row mb-6 py-3'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Video preview</label>
              <div className='col-lg-8'>
                <div className='col-lg-2'>
                  <DropzoneVideo
                    maxFile={1}
                    onUploadVideo={onUploadVideo}
                    typeAppend={'file'}
                    setIndex={setIndex}
                    idx={index}
                    setFieldValue={setFieldValue}
                    nameValue={'videoPreview.duration'}
                  />
                </div>
                <div className='py-3'>
                  <ErrorMessage name='videoPreview.url' />
                </div>
                <div className='col-lg-10 mt-6'>
                  {values.videoPreview.url ? (
                    <VideoPlayer
                      url={values.videoPreview.url}
                      onDeleteVideo={onDeleteVideo}
                      index={index}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>

            <div className='row mb-6 py-3'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                Thumbnail preview
              </label>
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
                    images={values.videoPreview.thumbnail}
                    setFieldValue={setFieldValue}
                    nameValue={'videoPreview.thumbnail'}
                  />
                </div>
                <div className='py-3'>
                  <ErrorMessage name='videoPreview.thumbnail' />
                </div>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default PreviewSection
