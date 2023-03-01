import {Form, Formik} from 'formik'
import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../../app/saga/hooks'
import {categoriesActions} from '../../../store/categories/categoriesSlice'
import {coursesActions} from '../../../store/courses/coursesSlice'
import HeadSection from './Part/HeadSection'
import LessonSection from './Part/LessonSection'
import OverviewSection from './Part/OverviewSection'
import PreviewSection from './Part/PreviewSection'
import courseSchema from './Validate'

interface IValues {
  _id: string
  name: string
  title: string
  thumbnail: string[]
  authorName: string
  categories: string[]
  lessons: any
  videoPreview: any
  overview: any
  webName: string
}

const UpdateCourse = () => {
  const dispatch = useAppDispatch()
  const listCategory = useAppSelector((state) => state.categories.data)
  const course = useAppSelector((state) => state.courses.dataDetail)

  const {id}: any = useParams()

  const initialValues: IValues = {
    _id: course?._id ? course?._id : '',
    name: course?.name ? course?.name : '',
    title: course?.title ? course?.title : '',
    thumbnail: course?.thumbnail ? [course?.thumbnail] : [],
    authorName: course?.authorName ? course?.authorName : '',
    categories: course?.categories ? course?.categories : [],
    lessons: course?.lessons
      ? course?.lessons?.map((lesson: any) => ({
          ...lesson,
          thumbnail: [lesson?.thumbnail],
          isDelete: false,
        }))
      : [
          {
            courseId: '',
            index: 1,
            title: '',
            description: '',
            videoUrl: '',
            thumbnail: [],
            duration: 0,
            _id: '',
          },
        ],
    videoPreview: course?.videoPreview
      ? {
          url: course?.videoPreview?.url,
          thumbnail: [course?.videoPreview?.thumbnail],
          duration: course?.videoPreview?.duration,
        }
      : {
          url: '',
          thumbnail: [],
          duration: 0,
        },
    overview: course?.overview
      ? {
          slogan: course?.overview?.slogan,
          description: course?.overview?.description,
          skills: course?.overview?.skills?.map((skill: any) => ({
            ...skill,
            imageUrl: [skill?.imageUrl],
          })),
        }
      : {
          slogan: '',
          description: '',
          skills: [
            {
              imageUrl: [],
              title: '',
            },
          ],
        },
    webName: course?.webName ? course?.webName : '',
  }

  useEffect(() => {
    dispatch(categoriesActions.getDataStart())
    dispatch(coursesActions.getDetailStart(id))
  }, [])

  const NormalizeWebName = (webName: string) => {
    const str = webName.replace(/\s+/g, ' ')
    const lowerCase = str.toLocaleLowerCase()
    const diacritics = lowerCase.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const prepareString = diacritics.replaceAll(' ', '-')
    return prepareString
  }

  const CheckDeletedLessons = (Lessons: any) => {
    const ElementDeleted = course?.lessons
      ?.filter((item: any) => !Lessons.some((other: any) => item?._id === other?._id))
      .map((less: any, idx: number) => ({...less, isDelete: true}))
    const _Lesson = [...ElementDeleted, ...Lessons]
    const PrepareParams = _Lesson.map((less: any, index: number) => ({
      ...less,
      thumbnail: typeof less.thumbnail === 'string' ? less.thumbnail : less.thumbnail[0],
    }))
    return PrepareParams
  }

  const onSubmit = (values: any) => {
    const params = {
      ...values,
      categories: values.categories.map((category: any) => category._id),
      thumbnail: values.thumbnail[0],
      overview: {
        ...values.overview,
        skills: values.overview.skills.map((skill: any) => ({
          ...skill,
          imageUrl: skill.imageUrl[0],
        })),
      },
      lessons: CheckDeletedLessons(values.lessons),
      videoPreview: {
        url: values.videoPreview.url,
        duration: values.videoPreview.duration,
        thumbnail: values.videoPreview.thumbnail[0],
      },
      webName: NormalizeWebName(values.authorName.trim() + ' ' + values.name.trim()),
    }
    dispatch(coursesActions.onUpdateCourse(params))
  }

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Update Course</h3>
          </div>
        </div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={courseSchema}>
          {({values, setFieldValue}) => {
            return (
              <Form>
                <div className='card-body border-top p-9'>
                  <HeadSection
                    values={values}
                    setFieldValue={setFieldValue}
                    listCategory={listCategory}
                    course={course}
                  />
                  <PreviewSection values={values} setFieldValue={setFieldValue} />
                  <OverviewSection values={values} setFieldValue={setFieldValue} />
                  <LessonSection setFieldValue={setFieldValue} values={values} />
                  <div className='card-footer d-flex justify-content-end'>
                    <button type='submit' className='btn btn-primary'>
                      Update
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

export default UpdateCourse
