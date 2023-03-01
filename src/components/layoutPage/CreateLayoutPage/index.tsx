import {Form, Formik} from 'formik'
import {useAppDispatch} from '../../../app/saga/hooks'
import {layoutPageActions} from '../../../store/layoutPage/layoutPageSlice'
import MessageTeam from './Part/MessageTeam'
import TrailerSection from './Part/TrailerSection'
import WelcomeSection from './Part/WelcomeSection'
import layoutSchema from './Validate'

interface InitialValues {
  trailer: {
    thumbnail: string[]

    url: string
    description: string
  }
  welcome: {
    thumbnail: string[]

    url: string
    description: string
  }
  messagesTeam: [
    {
      thumbnail: string[]

      url: string
    },
    {
      thumbnail: string[]

      url: string
    },
    {
      thumbnail: string[]

      url: string
    }
  ]
}

const initialValues: InitialValues = {
  trailer: {
    thumbnail: [],
    url: '',
    description: '',
  },
  welcome: {
    thumbnail: [],
    url: '',
    description: '',
  },
  messagesTeam: [
    {
      thumbnail: [],
      url: '',
    },
    {
      thumbnail: [],
      url: '',
    },
    {
      thumbnail: [],
      url: '',
    },
  ],
}

const CreateLayoutPage = () => {
  const dispatch = useAppDispatch()

  const onSubmit = (values: any) => {
    const params = {
      ...values,
      messagesTeam: values.messagesTeam.map((less: any) => ({
        ...less,
        thumbnail: less.thumbnail[0],
      })),
      welcome: {
        description: values.welcome.description,
        url: values.welcome.url,
        thumbnail: values.welcome.thumbnail[0],
      },
      trailer: {
        description: values.trailer.description,
        url: values.trailer.url,
        thumbnail: values.trailer.thumbnail[0],
      },
    }

    try {
      dispatch(layoutPageActions.handleCreateLayout(params))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Create layout video</h3>
          </div>
        </div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={layoutSchema}>
          {({values, setFieldValue}) => {
            return (
              <Form>
                <div className='card-body border-top p-9'>
                  <TrailerSection values={values} setFieldValue={setFieldValue} />
                  <WelcomeSection values={values} setFieldValue={setFieldValue} />
                  <MessageTeam values={values} setFieldValue={setFieldValue} />

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

export default CreateLayoutPage
