import {Form, Formik} from 'formik'
import * as React from 'react'
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
//Mui
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import ErrorIcon from '@mui/icons-material/Error'
import {uploadActions} from '../../../store/upload/uploadSlice'
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const styledTab = {fontSize: '16px', fontWeight: '600'}

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{p: 3}}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const initialValues: InititalValuesCreateCourse = {
  name: {
    vi: '',
    en: '',
  },
  title: {
    vi: '',
    en: '',
  },
  thumbnail: [],
  authorName: '',
  categories: [],
  lessons: [
    {
      index: 1,
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
    },
  ],
  videoPreview: {
    url: '',
    thumbnail: [],
    duration: 0,
  },
  overview: {
    slogan: {
      vi: '',
      en: '',
    },
    description: {
      vi: '',
      en: '',
    },
    skills: [
      {
        imageUrl: [],
        title: {
          vi: '',
          en: '',
        },
      },
    ],
  },
  webName: '',
}

const NormalizeWebName = (webName: string) => {
  const str = webName.replace(/\s+/g, ' ')
  const lowerCase = str.toLocaleLowerCase()
  const diacritics = lowerCase.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const prepareString = diacritics.replaceAll(' ', '-')
  return prepareString
}

const CreateCourse = () => {
  //Tab
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const [tabLanguage, setTabLanguage] = useState(0)

  const handleChangeLanguage = (event: React.SyntheticEvent, newValue: number) => {
    setTabLanguage(newValue)
  }
  const dispatch = useAppDispatch()

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
        webName: NormalizeWebName(values.authorName.trim() + ' ' + values.name.en.trim()),
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
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={courseSchema}>
          {({values, setFieldValue, errors, submitCount, dirty, touched}) => {
            return (
              <>
                <Form>
                  <div className='card-body border-top py-3 px-9'>
                    <Box
                      className='mb-3'
                      sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Tabs
                        value={tabLanguage}
                        onChange={handleChangeLanguage}
                        aria-label='basic tabs example'
                      >
                        <Tab label='English' {...a11yProps(0)} sx={styledTab} />
                        <Tab
                          sx={styledTab}
                          label='Vietnamese'
                          {...a11yProps(1)}
                          disabled={
                            Object.keys(errors).length > 0 && Object.keys(touched).length > 0
                              ? true
                              : false
                          }
                        />
                      </Tabs>
                    </Box>
                    <Tabs
                      textColor='primary'
                      value={value}
                      onChange={handleChange}
                      aria-label='basic tabs example'
                    >
                      <Tab
                        sx={styledTab}
                        label='Intro'
                        {...a11yProps(0)}
                        icon={
                          ['name', 'categories', 'title', 'thumbnail', 'authorName'].some(
                            (value) => {
                              return Object.keys(errors).includes(value)
                            }
                          ) && submitCount > 0 ? (
                            <ErrorIcon sx={{color: '#ff3366'}} />
                          ) : (
                            ''
                          )
                        }
                        iconPosition='end'
                      />

                      <Tab
                        sx={styledTab}
                        label='Preview'
                        {...a11yProps(1)}
                        icon={
                          errors?.videoPreview && submitCount > 0 ? (
                            <ErrorIcon sx={{color: '#ff3366'}} />
                          ) : (
                            ''
                          )
                        }
                        iconPosition='end'
                      />

                      <Tab
                        sx={styledTab}
                        label='Overview'
                        {...a11yProps(2)}
                        icon={
                          errors?.overview && submitCount > 0 ? (
                            <ErrorIcon sx={{color: '#ff3366'}} />
                          ) : (
                            ''
                          )
                        }
                        iconPosition='end'
                      />
                      <Tab
                        sx={styledTab}
                        label='Lessons'
                        {...a11yProps(3)}
                        icon={
                          errors?.lessons && submitCount > 0 ? (
                            <ErrorIcon sx={{color: '#ff3366'}} />
                          ) : (
                            ''
                          )
                        }
                        iconPosition='end'
                      />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                      <HeadSection
                        values={values}
                        setFieldValue={setFieldValue}
                        tabLanguage={tabLanguage}
                      />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <PreviewSection values={values} setFieldValue={setFieldValue} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      <OverviewSection
                        values={values}
                        setFieldValue={setFieldValue}
                        tabLanguage={tabLanguage}
                      />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                      <LessonSection
                        setFieldValue={setFieldValue}
                        values={values}
                        tabLanguage={tabLanguage}
                      />
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <button
                          onClick={() => {
                            setValue(value - 1)
                            dispatch(uploadActions.clearStore())
                          }}
                          className='btn btn-secondary'
                          disabled={value === 0}
                        >
                          Back
                        </button>
                        <button
                          type='submit'
                          className='btn btn-primary'
                          onClick={() => {
                            window.scrollTo({
                              top: 0,
                              left: 0,
                              behavior: 'smooth',
                            })
                            dispatch(uploadActions.clearStore())
                          }}
                        >
                          Create
                        </button>
                      </div>
                    </TabPanel>
                  </div>
                </Form>
                <div
                  style={{
                    display: value < 3 ? 'flex' : 'none',
                    justifyContent: value === 0 ? 'flex-end' : 'space-between',
                    padding: '0 54px',
                    transform: 'translateY(-34px)',
                  }}
                >
                  <button
                    onClick={() => {
                      setValue(value - 1)
                      dispatch(uploadActions.clearStore())
                    }}
                    className='btn btn-secondary'
                    style={{display: value === 0 ? 'none' : 'block'}}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      setValue(value + 1)
                      dispatch(uploadActions.clearStore())
                    }}
                    className='btn btn-primary'
                  >
                    Next
                  </button>
                </div>
              </>
            )
          }}
        </Formik>
      </div>
    </>
  )
}

export default CreateCourse
