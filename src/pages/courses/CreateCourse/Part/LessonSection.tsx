import CloseIcon from '@mui/icons-material/Close'
import {Box, Button, IconButton, TextField} from '@mui/material'
import {Field} from 'formik'
import {useEffect, useState} from 'react'
import ReactPlayer from 'react-player'
import {toast} from 'react-toastify'
import {isMappable} from '../../../../app/helpers/isMapple'
import {useAppDispatch, useAppSelector} from '../../../../app/saga/hooks'
import DropzoneCustom from '../../../../shared/dropzone/DropzoneCustom'
import DropzoneVideo from '../../../../shared/dropzone/DropzoneVideo'
import {ErrorMessage} from '../../../../shared/ErrorMesage/ErrorMessage'
import ListMedia from '../../../../shared/ListMedia'
import {coursesActions} from '../../../../store/courses/coursesSlice'
import {uploadActions} from '../../../../store/upload/uploadSlice'
import VideoPlayer from './VideoPlayer'

interface IProps {
  setFieldValue?: any
  values?: any
  tabLanguage?: number
}

const LessonSection = ({setFieldValue, values, tabLanguage}: IProps) => {
  const dispatch = useAppDispatch()
  const video: any = useAppSelector((state) => state.upload.lessonVideo)
  const image: any = useAppSelector((state) => state.upload.lessonImage)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (image.urlThumbnail) {
      setFieldValue(`lessons.${index}.thumbnail`, [image.urlThumbnail])
    }
  }, [image])

  useEffect(() => {
    if (video.urlFile) {
      setFieldValue(`lessons.${index}.videoUrl`, video.urlFile)
    }
  }, [video])

  const handleAddSection = () => {
    const lesson = {
      index: values.lessons.length + 1,
      title: {
        vi: '',
        en: '',
      },
      description: {
        vi: '',
        en: '',
      },
      videoUrl: '',
      thumbnail: [],
      duration: 0,
    }
    let newArr: any[] = []
    newArr = [...values.lessons, lesson]
    setFieldValue(`lessons`, newArr)
    toast.success('Add lesson success')
  }

  const onUploadImage = (formData: any) => {
    dispatch(uploadActions.uploadLessonImage(formData))
  }

  const onUploadVideo = (formdata: any) => {
    dispatch(uploadActions.uploadLessonVideo(formdata))
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
          description: {
            vi: ls.description.vi,
            en: ls.description.en,
          },
          index: idxx + 1,
          title: {
            vi: ls.title.vi,
            en: ls.title.en,
          },
          videoUrl: ls.videoUrl,
          thumbnail: ls.thumbnail,
          duration: ls.duration,
        }
        return params
      })
    setFieldValue(`lessons`, _lessons)
    toast.info('Remove lesson success')
  }

  return (
    <>
      <div className='row'>
        {/* <label className='col-lg-4 col-form-label fw-bold fs-4'>Lessons</label> */}
        <div className='col-lg-12 fv-row d-flex justify-content-end align-items-center'>
          <div className=''>
            <Button
              variant='contained'
              size='small'
              color='primary'
              onClick={() => {
                handleAddSection()
              }}
            >
              Add lesson
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
                {tabLanguage === 0 ? (
                  <div className='row mb-6 px-4'>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>Title</label>
                    <div className='col-lg-8 fv-row'>
                      <Field
                        as={TextField}
                        name={`lessons.${index}.title.en`}
                        value={lesson.title.en}
                        label='English title'
                        variant='outlined'
                        margin='normal'
                        fullWidth
                      />
                      <ErrorMessage name={`lessons[${index}].title.en`} />
                    </div>
                  </div>
                ) : (
                  <div className='row mb-6 px-4'>
                    <label className='col-lg-4 col-form-label fw-bold fs-6'>Title</label>
                    <div className='col-lg-8 fv-row'>
                      <Field
                        as={TextField}
                        name={`lessons.${index}.title.vi`}
                        value={lesson.title.vi}
                        label='Vietnamese title'
                        variant='outlined'
                        margin='normal'
                        fullWidth
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className='row'>
                {tabLanguage === 0 ? (
                  <div className='row mb-6 px-4'>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                      Description
                    </label>
                    <div className='col-lg-8 fv-row'>
                      <Field
                        as={TextField}
                        name={`lessons.${index}.description.en`}
                        value={lesson.description.en}
                        label='English description'
                        variant='outlined'
                        margin='normal'
                        fullWidth
                      />
                      <ErrorMessage name={`lessons[${index}].description.en`} />
                    </div>
                  </div>
                ) : (
                  <div className='row mb-6 px-4'>
                    <label className='col-lg-4 col-form-label fw-bold fs-6'>Description</label>
                    <div className='col-lg-8 fv-row'>
                      <Field
                        as={TextField}
                        name={`lessons.${index}.description.vi`}
                        value={lesson.description.vi}
                        label='Vietnamese description'
                        variant='outlined'
                        margin='normal'
                        fullWidth
                      />
                    </div>
                  </div>
                )}
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
                      nameValue={`lessons[${index}].duration`}
                    />
                  </div>
                  <div className='py-3'>
                    <ErrorMessage name={`lessons[${index}].videoUrl`} />
                  </div>

                  <div className='col-lg-10 mt-6'>
                    {lesson?.videoUrl ? (
                      <VideoPlayer
                        url={lesson?.videoUrl}
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
                      images={lesson?.thumbnail}
                      setFieldValue={setFieldValue}
                      nameValue={`lessons[${index}].thumbnail`}
                    />
                  </div>
                  <div className='py-3'>
                    <ErrorMessage name={`lessons[${index}].thumbnail`} />
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
