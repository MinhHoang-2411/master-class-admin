import {Box} from '@mui/material'
import {useEffect, useState} from 'react'
import {isMappable} from '../../../../app/helpers/isMapple'
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

const MessageTeam = ({values, setFieldValue}: IProps) => {
  const dispatch = useAppDispatch()
  const video: any = useAppSelector((state) => state.layoutPage.messagesTeamUrl)
  const image: any = useAppSelector((state) => state.layoutPage.messagesTeamThumbnail)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (image.urlThumbnail) {
      setFieldValue(`messagesTeam.${index}.thumbnail`, [image.urlThumbnail])
    }
  }, [image])

  useEffect(() => {
    if (video.urlFile) {
      setFieldValue(`messagesTeam.${index}.url`, video.urlFile)
    }
  }, [video])

  const onUploadImage = (formData: any) => {
    dispatch(layoutPageActions.uploadMessagesTeamThumbnailStart(formData))
  }

  const onUploadVideo = (formdata: any) => {
    dispatch(layoutPageActions.uploadMessagesTeamUrlStart(formdata))
  }

  const onDeleteVideo = (url: string, index: number) => {
    const payload: any = {
      urlFile: url,
      uploadType: 'video',
    }
    dispatch(layoutPageActions.handleDeleteVideoStart(payload))
    setFieldValue(`messagesTeam.${index}.url`, '')
  }

  return (
    <div>
      <label className='col-lg-4 col-form-label fw-bold fs-4'>Message from the team</label>
      {isMappable(values.messagesTeam) ? (
        values.messagesTeam.map((item: any, index: number) => (
          <Box
            sx={{
              backgroundColor: '#f8f9fa',
              mt: 1.5,
              px: 2.5,
              borderRadius: 2,
              position: 'relative',
            }}
            key={index}
          >
            <div className='row'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                Video {index + 1}
              </label>
            </div>
            <div className='px-3'>
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
                      nameValue={`messagesTeam[${index}].url`}
                    />
                  </div>
                  <div className='py-3'>
                    <ErrorMessage name={`messagesTeam[${index}].url`} />
                  </div>

                  <div className='col-lg-10 mt-6'>
                    {item?.url ? (
                      <VideoPlayer url={item?.url} onDeleteVideo={onDeleteVideo} index={index} />
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
                      images={item?.thumbnail}
                      setFieldValue={setFieldValue}
                      nameValue={`messagesTeam[${index}].thumbnail`}
                    />
                  </div>
                  <div className='py-3'>
                    <ErrorMessage name={`messagesTeam[${index}].thumbnail`} />
                  </div>
                </div>
              </div>
            </div>
          </Box>
        ))
      ) : (
        <></>
      )}
    </div>
  )
}

export default MessageTeam
