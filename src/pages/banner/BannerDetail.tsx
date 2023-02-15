import {Button, Card, CardMedia, Grid} from '@mui/material'
import {useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../app/saga/hooks'
import history from '../../routes/history'
import {bannerActions} from '../../store/banner/bannerSlice'

const BannerDetail = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.banner.loadingGetDataDetail)
  const banner = useAppSelector((state) => state.banner.bannerDetail)
  const {id}: any = useParams()
  
  useEffect(() => {
    dispatch(bannerActions.getDataDetail(id))
  }, [])

  return (
    <>
      {!isLoading ? (
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer d-flex align-items-center'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Banners detail</h3>
            </div>
            <div className='d-flex'>
              <div className='pe-4'>
                <Button
                  color='warning'
                  size='small'
                  variant='contained'
                  onClick={() => dispatch(bannerActions.onDeleteBanner(id))}
                >
                  Delete
                </Button>
              </div>

              <div className=''>
                <Button
                  variant='contained'
                  size='small'
                  color='primary'
                  onClick={() => history.replace(`/crafted/pages/banner/update`)}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
          <div className='card-body p-9'>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Name</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>{banner?.name}</span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Title</label>

              <div className='col-lg-8 fv-row'>
                <span className='fw-bold fs-6'>{banner?.title}</span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Description</label>

              <div className='col-lg-8 fv-row'>
                <span className='fw-bold fs-6'>{banner?.description}</span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Active status</label>

              <div className='col-lg-8 fv-row'>
                <span className='fw-bold fs-6'>
                  {banner?.isActive ? (
                    <span className='badge badge-success'>active</span>
                  ) : (
                    <span className='badge badge-light'>inactive</span>
                  )}
                </span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>List images</label>

              <div className='col-lg-8 fv-row'>
                <Grid container spacing={3}>
                  {banner?.images?.map((image: any, index: number) => (
                    <Grid item xs={12} sm={6} md={4} key={image}>
                      <Card sx={{maxWidth: 345, position: 'relative'}}>
                        <CardMedia
                          sx={{height: 0, paddingTop: '56.25%'}}
                          image={image}
                          title={image}
                        />
                      </Card>
                    </Grid>
                  ))}
                </Grid>
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

export default BannerDetail
