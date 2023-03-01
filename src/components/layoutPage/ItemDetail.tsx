import {Button} from '@mui/material'
import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {isMappable} from '../../app/helpers/isMapple'
import {useAppDispatch, useAppSelector} from '../../app/saga/hooks'
import VideoPlayer from '../../pages/courses/Lessons/VideoPlayer'
import history from '../../routes/history'
import {bannerActions} from '../../store/banner/bannerSlice'
import {layoutPageActions} from '../../store/layoutPage/layoutPageSlice'

const ItemLayoutDetailPage = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.layoutPage.loadingGetDataDetail)
  const data = useAppSelector((state) => state.layoutPage.dataDetail)
  const {id}: any = useParams()

  useEffect(() => {
    dispatch(layoutPageActions.getDataDetail(id))
  }, [])

  console.log('data', data)
  return (
    <>
      {!isLoading ? (
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer d-flex align-items-center'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Layout page detail</h3>
            </div>
            <div className='d-flex'>
              <div className='pe-4'>
                <Button
                  color='warning'
                  size='small'
                  variant='contained'
                  onClick={() => dispatch(layoutPageActions.handleDeleteLayout(id))}
                >
                  Delete
                </Button>
              </div>

              <div className=''>
                <Button
                  variant='contained'
                  size='small'
                  color='primary'
                  onClick={() => history.replace(`/crafted/pages/layout/update/${id}`)}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
          <div className='card-body p-9'>
            <div>
              <label className='col-lg-4 col-form-label fw-bold fs-4'>Trailer Section</label>
              <div className='px-3 mt-2'>
                <div className='row mb-7'>
                  <label className='col-lg-4 fw-bold text-muted'>Description</label>

                  <div className='col-lg-8'>
                    <span className='fw-bolder fs-6 text-dark'>{data?.trailer?.description}</span>
                  </div>
                </div>
                <div className='row mb-7'>
                  <label className='col-lg-4 fw-bold text-muted'>Video</label>

                  <div className='col-lg-8'>
                    <VideoPlayer url={data?.trailer?.url} />
                  </div>
                </div>
                <div className='row mb-7'>
                  <label className='col-lg-4 fw-bold text-muted'>Thumbnail</label>
                  <div className='col-lg-8'>
                    <div className='col-lg-8 fv-row'>
                      <img
                        src={data?.trailer?.thumbnail}
                        width={140}
                        height={140}
                        alt='thumbnail'
                        style={{objectFit: 'cover'}}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className='col-lg-4 col-form-label fw-bold fs-4'>Welcome Section</label>
              <div className='px-3 mt-2'>
                <div className='row mb-7'>
                  <label className='col-lg-4 fw-bold text-muted'>Description</label>

                  <div className='col-lg-8'>
                    <span className='fw-bolder fs-6 text-dark'>{data?.welcome?.description}</span>
                  </div>
                </div>
                <div className='row mb-7'>
                  <label className='col-lg-4 fw-bold text-muted'>Video</label>

                  <div className='col-lg-8'>
                    <VideoPlayer url={data?.welcome?.url} />
                  </div>
                </div>
                <div className='row mb-7'>
                  <label className='col-lg-4 fw-bold text-muted'>Thumbnail</label>
                  <div className='col-lg-8'>
                    <div className='col-lg-8 fv-row'>
                      <img
                        src={data?.welcome?.thumbnail}
                        width={140}
                        height={140}
                        alt='thumbnail'
                        style={{objectFit: 'cover'}}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className='col-lg-12 col-form-label fw-bold fs-4'>
                Messages From The Team Section
              </label>
              <div className='px-3 mt-2'>
                {isMappable(data?.messagesTeam) ? (
                  data?.messagesTeam?.map((item: any, index: number) => (
                    <>
                      <div className='px-3 mt-2'>
                        <label className='col-lg-12 col-form-label fw-bold fs-4'>
                          {`Video Section ${index + 1}`}
                        </label>
                        <div className='row mb-7 mt-3'>
                          <label className='col-lg-4 fw-bold text-muted'>Video</label>
                          <div className='col-lg-8'>
                            <VideoPlayer url={item?.url} />
                          </div>
                        </div>
                        <div className='row mb-7'>
                          <label className='col-lg-4 fw-bold text-muted'>Thumbnail</label>
                          <div className='col-lg-8'>
                            <div className='col-lg-8 fv-row'>
                              <img
                                src={item?.thumbnail}
                                width={140}
                                height={140}
                                alt='thumbnail'
                                style={{objectFit: 'cover'}}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>Loading...</>
      )}
    </>
  )
}

export default ItemLayoutDetailPage
