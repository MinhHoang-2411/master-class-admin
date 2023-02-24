import {Form, Formik} from 'formik'
import {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../../app/saga/hooks'
import {InititalValuesCreateCourse} from '../../../models/Courses'
import {categoriesActions} from '../../../store/categories/categoriesSlice'
import {coursesActions} from '../../../store/courses/coursesSlice'
import HeadSection from './Part/HeadSection'
import LessonSection from './Part/LessonSection'
import OverviewSection from './Part/OverviewSection'
import PreviewSection from './Part/PreviewSection'
import courseSchema from './Validate'

const initialValues: InititalValuesCreateCourse = {
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
      thumbnail: [],
      duration: 0,
    },
  ],
  videoPreview: {
    url: '',
    thumbnail: [],
    duration: 0,
  },
  overview: {
    slogan: '',
    description: '',
    skills: [
      {
        imageUrl: [],
        title: '',
      },
    ],
  },
  webName: '',
}

const NormalizeWebName = (webName: string) => {
  const str = webName.replace(/\s+/g, ' ')
  const lowerCase = str.toLocaleLowerCase()
  const diacritics = lowerCase.normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
  const prepareString = diacritics.replaceAll(" ", "-")
  return prepareString
}

const CreateCourse = () => {
  const dispatch = useAppDispatch();

  const onSubmit = (values: any) => {
    try {
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
        lessons: values.lessons.map((less: any) => ({
          ...less,
          thumbnail: less.thumbnail[0],
        })),
        videoPreview: {
          url: values.videoPreview.url,
          duration: values.videoPreview.duration,
          thumbnail: values.videoPreview.thumbnail[0],
        },
        webName: NormalizeWebName(values.authorName.trim() + ' ' + values.name.trim()),
      }
      dispatch(coursesActions.onCreateCourse(params))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Create Course</h3>
          </div>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={courseSchema}
        >
          {({values, setFieldValue}) => {
            return (
              <Form>
                <div className='card-body border-top p-9'>
                  <HeadSection values={values} setFieldValue={setFieldValue} />

                  <PreviewSection values={values} setFieldValue={setFieldValue} />

                  <OverviewSection values={values} setFieldValue={setFieldValue} />

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
