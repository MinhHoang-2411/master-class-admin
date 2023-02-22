import CloseIcon from '@mui/icons-material/Close'
import {Box, Button, IconButton, TextField} from '@mui/material'
import {Field} from 'formik'
import {useEffect, useState} from 'react'
import ReactPlayer from 'react-player'
import { toast } from 'react-toastify'
import {isMappable} from '../../../app/helpers/isMapple'
import {useAppDispatch, useAppSelector} from '../../../app/saga/hooks'
import DropzoneVideo from '../../../shared/dropzone/DropzoneVideo'
import {coursesActions} from '../../../store/courses/coursesSlice'

interface IProps {
  setFieldValue?: any
  values?: any
}

interface VideoPlayerProps {
  url: string
  onDeleteVideo: any
  index: number
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({url, onDeleteVideo, index}) => {
  return (
    <div className='position-relative'>
      <ReactPlayer
        className='react-player'
        url={url}
        controls={true}
        width='200px'
        height='200px'
      />
      <IconButton
        color='secondary'
        component='label'
        sx={{position: 'absolute', top: '0', left: '0'}}
        onClick={() => onDeleteVideo(url, index)}
      >
        <CloseIcon sx={{backgroundColor: '#fff', borderRadius: '50%'}} />
      </IconButton>
    </div>
  )
}

const LessonSection = ({setFieldValue, values}: IProps) => {
  const dispatch = useAppDispatch()
  const video = useAppSelector((state) => state.courses.video)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (video.urlFile) {
      setFieldValue(`lessons.${index}.videoUrl`, video.urlFile)
    }
  }, [video])

  const handleAddSection = () => {
    const lesson = {
      index: values.lessons.length + 1,
      title: '',
      description: '',
      videoUrl: '',
    }
    let newArr: any[] = []
    newArr = [...values.lessons, lesson]
    setFieldValue(`lessons`, newArr)
    toast.success('Add lesson success')
  }

  const onUploadVideo = (formdata: any) => {
    dispatch(coursesActions.onUploadVideo(formdata))
  }

  const onDeleteVideo = (url: string, index: number) => {
    const payload: any = {
      urlFile: url,
      uploadType: 'video',
    }
    dispatch(coursesActions.onDeleteVideo(payload))
    setFieldValue(`lessons.${index}.videoUrl`, '')
  }

  const handleRemoveSection = (index: number) => {
    const _lessons = values?.lessons
      ?.filter((_: never, idx: number) => idx !== index)
      .map((ls: any, idxx: number) => {
        const params = {
          description: ls.description,
          index: idxx + 1,
          title: ls.title,
          videoUrl: ls.videoUrl,
        }
        return params
      })
    setFieldValue(`lessons`, _lessons)
    toast.info('Remove lesson success')
  }

  return (
    <>
      <div className='row border-top'>
        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Lessons</label>
        <div className='col-lg-8 fv-row d-flex justify-content-end align-items-center'>
          <div className=''>
            <Button
              variant='contained'
              size='small'
              color='primary'
              onClick={() => {
                handleAddSection()
              }}
            >
              Add section lesson
            </Button>
          </div>
        </div>
      </div>

      {isMappable(values.lessons) ? (
        values.lessons.map((lesson: any, index: number) => (
          <Box
            sx={{
              backgroundColor: '#f8f9fa',
              mt: 1.5,
              px: 2.5,
              borderRadius: 2,
              position: 'relative',
            }}
            key={lesson.index}
          >
            {lesson.index > 1 && (
              <IconButton
                color='primary'
                component='label'
                sx={{position: 'absolute', top: '0', right: '0'}}
                onClick={() => handleRemoveSection(index)}
              >
                <CloseIcon sx={{backgroundColor: '#f1f1f1', borderRadius: '50%'}} />
              </IconButton>
            )}
            <div className='row'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                Lesson {index + 1}
              </label>
            </div>
            <div className='px-3'>
              <div className='row'>
                <div className='row mb-6 px-4'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>Title</label>
                  <div className='col-lg-8 fv-row'>
                    <Field
                      as={TextField}
                      name={`lessons.${index}.title`}
                      value={lesson.title}
                      label='Title'
                      variant='outlined'
                      margin='normal'
                      fullWidth
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='row mb-6 px-4'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                    Description
                  </label>
                  <div className='col-lg-8 fv-row'>
                    <Field
                      as={TextField}
                      name={`lessons.${index}.description`}
                      value={lesson.description}
                      label='Description'
                      variant='outlined'
                      margin='normal'
                      fullWidth
                    />
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Video</label>
                <div className='col-lg-8'>
                  <div className='col-lg-2'>
                    <DropzoneVideo
                      maxFile={1}
                      onUploadImage={onUploadVideo}
                      typeAppend={'file'}
                      setIndex={setIndex}
                      idx={index}
                    />
                  </div>
                  <div className='col-lg-10 mt-6'>
                    {lesson.videoUrl ? (
                      <VideoPlayer
                        url={lesson.videoUrl}
                        onDeleteVideo={onDeleteVideo}
                        index={index}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Box>
        ))
      ) : (
        <>There are no lesson</>
      )}
    </>
  )
}

export default LessonSection
