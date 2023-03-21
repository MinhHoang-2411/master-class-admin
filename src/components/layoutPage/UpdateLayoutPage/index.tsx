import {Switch} from '@mui/material'
import {Form, Formik} from 'formik'
import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../../app/saga/hooks'
import {layoutPageActions} from '../../../store/layoutPage/layoutPageSlice'
import MessageTeam from './Part/MessageTeam'
import TrailerSection from './Part/TrailerSection'
import WelcomeSection from './Part/WelcomeSection'
import layoutSchema from './Validate'

interface InitialValues {
  _id: string
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
  isActive: boolean
}

const UpdateLayoutPage = () => {
  const dispatch = useAppDispatch()
  const {id}: any = useParams()
  const dataDetail = useAppSelector((state) => state.layoutPage.dataDetail)
  const item: any = localStorage.getItem('layoutUpdate')
  const _dataDetail = JSON.parse(item)

  const initialValues: InitialValues = {
    _id: dataDetail?._id ? dataDetail?._id : _dataDetail?._id,
    trailer: dataDetail?.trailer
      ? {
          ...dataDetail?.trailer,
          thumbnail: [dataDetail?.trailer?.thumbnail],
        }
      : {
          ..._dataDetail?.trailer,
          thumbnail: [_dataDetail?.trailer?.thumbnail],
        },
    welcome: dataDetail?.welcome
      ? {
          ...dataDetail?.welcome,
          thumbnail: [dataDetail?.welcome?.thumbnail],
        }
      : {
          ..._dataDetail?.welcome,
          thumbnail: [_dataDetail?.welcome?.thumbnail],
        },
    messagesTeam: dataDetail?.messagesTeam
      ? dataDetail?.messagesTeam?.map((item: any) => ({
          ...item,
          thumbnail: [item?.thumbnail],
        }))
      : _dataDetail?.messagesTeam?.map((item: any) => ({
          ...item,
          thumbnail: [item?.thumbnail],
        })),
    isActive: dataDetail?.isActive ? dataDetail?.isActive : _dataDetail?.isActive,
  }
  useEffect(() => {
    dispatch(layoutPageActions.getDataDetail(id))
  }, [id])

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
      dispatch(layoutPageActions.handleUpdateLayout(params))
    } catch (error) {
      console.log(error)
    }
  }
  const label = {inputProps: {'aria-label': 'Switch status'}}

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Update layout video</h3>
          </div>
        </div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={layoutSchema}>
          {({values, setFieldValue}) => {
            console.log('values', values)
            return (
              <Form>
                <div className='card-body border-top p-9'>
                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                      Active status
                    </label>
                    <div className='col-lg-8 fv-row'>
                      <Switch
                        {...label}
                        color='secondary'
                        checked={values.isActive}
                        value={values.isActive}
                        onChange={(e) => setFieldValue('isActive', e.target.checked)}
                      />
                    </div>
                  </div>
                  <TrailerSection values={values} setFieldValue={setFieldValue} />
                  <WelcomeSection values={values} setFieldValue={setFieldValue} />
                  <MessageTeam values={values} setFieldValue={setFieldValue} />

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

export default UpdateLayoutPage
